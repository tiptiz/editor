import type { NodeView, ViewMutationRecord } from "@tiptap/pm/view"
import type { BundledLanguage, BundledTheme } from "shiki"

import { findChildren, type NodeViewRendererProps } from "@tiptap/core"

import { initHighlighter, loadLanguage, loadTheme } from "./highlighter"

export interface ShiKiViewOptions {
    name: string
    language: BundledLanguage | "plaintext" | null
    theme: BundledTheme
    showLineNumbers: boolean
    highlightLines: string[]
}

class ShikiPluginView implements NodeView {
    view: NodeViewRendererProps["view"]
    node: NodeViewRendererProps["node"]

    dom: HTMLElement = document.createElement("pre")
    contentDOM: HTMLElement = document.createElement("code")

    // svelteRoot = mount(Toolbars, {
    //     target: this.dom,
    //     props: {
    //         copyContent: this.handleCopyContent.bind(this)
    //     }
    // })

    private get options() {
        return {
            name: this.node.type.name,
            showLineNumbers: this.node.attrs.showLineNumbers,
            highlightLines: this.node.attrs.highlightLines,
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

    private handleCopyEvent(e: ClipboardEvent) {
        if (e.clipboardData) {
            e.clipboardData.setData("text/plain", this.node.textContent)
            e.clipboardData.setData("vscode-editor-data", JSON.stringify({
                mode: this.options.language
            }))
        }
        e.preventDefault()
    }

    // TODO figure out the behavior of NodeView destroy
    private handleHovering() {
        this.dom.addEventListener("mouseover", () => {
            // toolbarsState.isHovering = true
        })
        this.dom.addEventListener("mouseleave", () => {
            // toolbarsState.isHovering = false
        })
        this.dom.addEventListener("copy", this.handleCopyContent.bind(this))
    }

    private handleCopyContent() {
        const textArea = document.createElement("textarea")
        Object.assign(textArea.style, {
            position: "fixed",
            top: "-1000px",
            left: "-1000px",
            opacity: "0"
        })
        textArea.innerText = this.node.textContent
        document.body.appendChild(textArea)
        textArea.select()
        textArea.addEventListener("copy", this.handleCopyEvent.bind(this))
        // TODO, navigator.clipboard not working yet. But this code, it works!
        document.execCommand("copy")
        textArea.remove()
    }

    private updateView() {
        const { language, theme, showLineNumbers, highlightLines } = this.options
        if (theme) this.dom.setAttribute("data-theme", theme)
        else this.dom.removeAttribute("data-theme")

        if (language && language !== "plaintext") this.dom.setAttribute("data-language", language)
        else this.dom.removeAttribute("data-language")

        if (showLineNumbers) this.dom.setAttribute("data-show-line-numbers", "true")
        else this.dom.removeAttribute("data-show-line-numbers")

        if (highlightLines) this.dom.setAttribute("data-highlight-lines", highlightLines.join(","))
        else this.dom.removeAttribute("data-highlight-lines")
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
        // unmount(this.svelteRoot)
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
