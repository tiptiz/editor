import type { NodeView, ViewMutationRecord } from "@tiptap/pm/view"
import type { BundledLanguage, BundledTheme } from "shiki"

import { toolbarsState } from "./components/Toolbars.state.svelte"
import Toolbars from "./components/Toolbars.svelte"
import { initHighlighter, loadLanguage, loadTheme } from "./highlighter"

import { findChildren, type NodeViewRendererProps } from "@tiptap/core"
import { mount, unmount } from "svelte"

export interface ShiKiViewOptions {
    name: string
    language: BundledLanguage | "plaintext" | null
    theme: BundledTheme
    showLineNumbers: boolean
}

class ShikiPluginView implements NodeView {
    view: NodeViewRendererProps["view"]
    node: NodeViewRendererProps["node"]

    dom: HTMLElement = document.createElement("pre")
    contentDOM: HTMLElement = document.createElement("code")

    svelteRoot = mount(Toolbars, {
        target: this.dom,
        props: {
            copyContent: this.handleCopyContent.bind(this)
        }
    })

    private get options() {
        return {
            name: this.node.type.name,
            showLineNumbers: this.node.attrs.showLineNumbers,
            language: this.node.attrs.language,
            theme: this.node.attrs.theme
        } as ShiKiViewOptions
    }

    constructor({ view, node }: NodeViewRendererProps) {
        this.view = view
        this.node = node

        this.createView()
        this.handleHovering()
        this.initDecorations()
    }

    private createView() {
        this.dom.classList.add("code-block")
        this.dom.appendChild(this.contentDOM)
        this.updateView()
    }

    // TODO figure out the behavior of NodeView destroy
    private handleHovering() {
        this.dom.addEventListener("mouseover", () => {
            toolbarsState.isHovering = true
        })
        this.dom.addEventListener("mouseleave", () => {
            toolbarsState.isHovering = false
        })
    }

    private handleCopyContent() {
        navigator.clipboard.writeText(this.node.textContent).then(() => {
            console.log("Copied to clipboard")
        })
    }

    private updateView() {
        const { language, theme, showLineNumbers } = this.options
        if (theme) this.dom.setAttribute("data-theme", theme)
        else this.dom.removeAttribute("data-theme")

        if (language && language !== "plaintext") this.dom.setAttribute("data-language", language)
        else this.dom.removeAttribute("data-language")

        if (showLineNumbers) this.dom.setAttribute("data-show-line-numbers", "true")
        else this.dom.removeAttribute("data-show-line-numbers")
    }

    update(node: NodeViewRendererProps["node"]) {
        if (node.type !== this.node.type) return false
        // TODO figure out is the node really destroyed, node.textContent is new
        // it looks like has a memory leak problem
        this.node = node

        this.updateView()
        this.checkUndecoratedBlocks()
        return true
    }

    ignoreMutation(mutation: ViewMutationRecord) {
        return this.dom.querySelector(".code-block-toolbar")?.contains(mutation.target)
    }

    destroy() {
        unmount(this.svelteRoot)
    }

    // Initialize shiki async, and then highlight initial document
    async initDecorations() {
        const doc = this.view.state.doc

        await initHighlighter({ doc, ...this.options })
        const tr = this.view.state.tr.setMeta("shikiPluginForceDecoration", true)
        this.view.dispatch(tr)
    }

    // When new codeblocks were added, and they have missing themes or
    // languages, load those and then add code decorations once again.
    async checkUndecoratedBlocks() {
        const codeBlocks = findChildren(
            this.view.state.doc,
            node => node.type.name === this.options.name
        )

        // Load missing themes or languages when necessary.
        // loadStates is an array with booleans depending on if a theme/lang
        // got loaded.
        const loadStates = await Promise.all(
            codeBlocks.flatMap(block => [
                loadTheme(block.node.attrs.theme),
                loadLanguage(block.node.attrs.language)
            ])
        )
        const didLoadSomething = loadStates.includes(true)

        // The asynchronous nature of this is potentially prone to
        // race conditions. Imma just hope it's fine lol
        if (didLoadSomething) {
            const tr = this.view.state.tr.setMeta("shikiPluginForceDecoration", true)
            this.view.dispatch(tr)
        }
    }
}

export {
    ShikiPluginView
}
