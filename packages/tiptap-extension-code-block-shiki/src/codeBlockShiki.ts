import type { Command } from "@tiptap/core"
import type { CodeBlockOptions } from "@tiptap/extension-code-block"
import type { EditorState } from "@tiptap/pm/state"
import type { PluginShikiOptions } from "./proseMirrorPluginShiki"

import { ShikiPluginView } from "./codeBlockShikiView"
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
            toggleLineHighlight: () => ReturnType
        }
    }
}

export const CodeBlockShiki = CodeBlock.extend<CodeBlockShikiOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            showLineNumbers: false,
            defaultLanguage: "javascript",
            defaultTheme: "plaintext"
        }
    },

    addAttributes() {
        return {
            ...this.parent?.(),
            highlightLines: {
                default: [],
                parseHTML: element => element.getAttribute("data-highlight-lines")?.split(","),
                renderHTML: (attributes) => {
                    if (!attributes.highlightLines.length) return {}
                    return { "data-highlight-lines": attributes.highlightLines.join(",") }
                }
            },
            showLineNumbers: {
                default: this.options.showLineNumbers,
                parseHTML: element => element.getAttribute("data-show-line-numbers") === "true",
                renderHTML: (attributes) => {
                    if (!attributes.showLineNumbers) return {}
                    return { "data-show-line-numbers": "true" }
                }
            },
            language: {
                default: this.options.defaultLanguage,
                parseHTML: (element) => {
                    let language = element.getAttribute("data-language")
                    if (!language) {
                        const { languageClassPrefix } = this.options
                        const languages = Array.from(element.firstElementChild?.classList)
                            .filter(className => className.startsWith(languageClassPrefix))
                            .map(className => className.replace(languageClassPrefix, ""))
                        language = languages[0]
                    }

                    return language && null
                },
                renderHTML: (attributes) => {
                    if (attributes.language === this.options.defaultLanguage) return {}
                    return { "data-language": attributes.language }
                }
            },
            theme: {
                default: this.options.defaultTheme,
                parseHTML: element => element.getAttribute("data-theme")
            }
        }
    },

    addNodeView() {
        return (...args) => {
            return new ShikiPluginView(...args)
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
        const chainToggleLineHighlight: ChainCommandFactory = () =>
            ({ editor, tr, dispatch }) => {
                const codeBlock = getCodeBlock(editor.state)
                if (codeBlock) {
                    const highlightLines = new Set(editor.getAttributes("codeBlock").highlightLines || [])

                    let append = true
                    const lines: number[] = []

                    let line = 1
                    let index = 0
                    const selection = editor.state.selection
                    const [from, to] = [selection.from, selection.to].sort()
                    const content = codeBlock.node.textContent
                    // get the selection covered lines, append/remove based on head pos
                    while (content.at(index)) {
                        const pos = index + codeBlock.start

                        if (pos >= from && pos <= to) {
                            lines.push(line)
                            if (pos === selection.head && highlightLines.has(String(line))) {
                                append = false
                            }
                        }
                        if (pos === to && from === to) break

                        if (/\n/.test(content.at(index))) {
                            line++
                        }
                        index++
                    }

                    lines.forEach((line) => {
                        if (append) highlightLines.add(String(line))
                        else {
                            highlightLines.delete(String(line))
                        }
                    })
                    tr.setNodeAttribute(codeBlock.pos, "highlightLines", Array.from(highlightLines))
                    dispatch(tr)
                    return true
                }
                return false
            }
        return {
            ...this.parent?.(),
            selectCodes: chainCommandSelectCodes,
            toggleLineNumbers: chainCommandToggleLineNumbers,
            toggleLineHighlight: chainToggleLineHighlight
        }
    },

    addKeyboardShortcuts() {
        return {
            "Mod-a": () => this.editor.commands.selectCodes(),
            "Mod-Alt-l": () => this.editor.commands.toggleLineNumbers(),
            "Mod-alt-h": () => this.editor.commands.toggleLineHighlight()
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
