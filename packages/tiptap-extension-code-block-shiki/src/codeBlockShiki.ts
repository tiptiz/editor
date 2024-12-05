import type { CodeBlockOptions } from "@tiptap/extension-code-block"
import type { BundledLanguage, BundledTheme } from "shiki"

import { proseMirrorPluginShiki } from "./proseMirrorPluginShiki"

import CodeBlock from "@tiptap/extension-code-block"

export interface CodeBlockShikiOptions extends CodeBlockOptions {
    defaultLanguage: BundledLanguage | null | undefined
    defaultTheme: BundledTheme
}
// TODO 1. support dual themes, 2. support builtin pre, code styles, 3. add commands
export const CodeBlockShiki = CodeBlock.extend<CodeBlockShikiOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            defaultLanguage: null,
            defaultTheme: "vitesse-light"
        }
    },

    addProseMirrorPlugins() {
        return [
            ...(this.parent?.() || []),
            proseMirrorPluginShiki({
                name: this.name,
                defaultLanguage: this.options.defaultLanguage,
                defaultTheme: this.options.defaultTheme
            })
        ]
    }
})
