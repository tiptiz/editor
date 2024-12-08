import type { CodeBlockOptions } from "@tiptap/extension-code-block"
import type { PluginShikiOptions } from "./proseMirrorShikiView"

import { proseMirrorPluginShiki } from "./proseMirrorPluginShiki"

import CodeBlock from "@tiptap/extension-code-block"

export type CodeBlockShikiOptions = CodeBlockOptions & Omit<PluginShikiOptions, "name"> & {
    showLineNumbers: boolean
}

export const CodeBlockShiki = CodeBlock.extend<CodeBlockShikiOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            showLineNumbers: false,
            defaultLanguage: "javascript",
            defaultTheme: "vitesse-light"
        }
    },

    addAttributes() {
        return {
            ...this.parent?.(),
            showLineNumbers: {
                default: this.options.showLineNumbers,
                parseHTML: element => element.getAttribute("data-show-line-numbers") === "true",
                renderHTML: (attributes) => {
                    if (!attributes.showLineNumbers) return {}
                    return {
                        class: "show-line-numbers"
                    }
                }
            }
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
