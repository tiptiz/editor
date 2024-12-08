import type { PluginView } from "@tiptap/pm/state"
import type { EditorView } from "prosemirror-view"
import type { BundledLanguage, BundledTheme } from "shiki"

import { initHighlighter, loadLanguage, loadTheme } from "./highlighter"

import { findChildren } from "@tiptap/core"

export interface PluginShikiOptions {
    name: string
    defaultLanguage: BundledLanguage | null | undefined
    defaultTheme: BundledTheme
}

class ShikiPluginView implements PluginView {
    constructor(
        private view: EditorView,
        private options: PluginShikiOptions
    ) {
        this.initDecorations()
    }

    update() {
        this.checkUndecoratedBlocks()
    }

    destroy() {
    }

    // Initialize shiki async, and then highlight initial document
    async initDecorations() {
        const doc = this.view.state.doc
        const { name, defaultLanguage, defaultTheme } = this.options

        await initHighlighter({ doc, name, defaultLanguage, defaultTheme })
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
