import type { Command } from "@tiptap/core"
import type { CodeBlockOptions } from "@tiptap/extension-code-block"
import type { EditorState } from "@tiptap/pm/state"
import type { PluginShikiOptions } from "./proseMirrorShikiView"

import { proseMirrorPluginShiki } from "./proseMirrorPluginShiki"

import { findParentNode } from "@tiptap/core"
import CodeBlock from "@tiptap/extension-code-block"
import { TextSelection } from "@tiptap/pm/state"

export type CodeBlockShikiOptions = CodeBlockOptions & Omit<PluginShikiOptions, "name"> & {
    showLineNumbers: boolean
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        codeBlockShiki: {
            selectCodes: () => ReturnType
            toggleLineNumbers: () => ReturnType
        }
    }
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
                        "data-show-line-numbers": "true",
                        "class": "show-line-numbers"
                    }
                }
            }
        }
    },

    addCommands() {
        const getCodeBlock = (state: EditorState) => {
            const { selection } = state
            return findParentNode(node => node.type.name === this.type.name)(selection)
        }
        type ChainCommandFactory = () => Command
        const chainCommandSelectCodes: ChainCommandFactory = () =>
            ({ state, tr, dispatch }) => {
                const codeBlock = getCodeBlock(state)
                if (codeBlock) {
                    const codesSelection = TextSelection.create(tr.doc, codeBlock.pos + 1, codeBlock.pos + codeBlock.node.nodeSize - 1)
                    tr.setSelection(codesSelection)
                    dispatch(tr)
                    return true
                }
                return false
            }

        const chainCommandToggleLineNumbers: ChainCommandFactory = () =>
            ({ editor, tr, dispatch }) => {
                const codeBlock = getCodeBlock(editor.state)
                if (codeBlock) {
                    const showLineNumbers = !editor.getAttributes("codeBlock").showLineNumbers
                    tr.setNodeAttribute(codeBlock.pos, "showLineNumbers", showLineNumbers)
                    dispatch(tr)
                    return true
                }
                return false
            }
        return {
            selectCodes: chainCommandSelectCodes,
            toggleLineNumbers: chainCommandToggleLineNumbers
        }
    },

    addKeyboardShortcuts() {
        return {
            "Mod-a": () => this.editor.commands.selectCodes(),
            "Mod-Alt-l": () => this.editor.commands.toggleLineNumbers()
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
