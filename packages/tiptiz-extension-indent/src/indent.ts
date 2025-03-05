import type { Dispatch } from "@tiptap/core"
import type { EditorState, Transaction } from "@tiptap/pm/state"

import { Extension } from "@tiptap/core"
import { AllSelection, TextSelection } from "@tiptap/pm/state"

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        indent: {
            indent: () => ReturnType
        }
        outdent: {
            outdent: () => ReturnType
        }
    }
}

interface IndentOptions {
    types: string[]
    range: [minLevel: number, maxLevel: number]
}

export const Indent = Extension.create<IndentOptions>({
    name: "indent",
    addOptions() {
        return {
            types: ["heading", "listItem", "taskItem", "paragraph"],
            range: [0, 5]
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    indent: {
                        default: null,
                        parseHTML: (element) => {
                            const [minLevel, maxLevel] = this.options.range
                            const indent = element.style.textIndent

                            return indent ? Math.max(minLevel, Math.min(maxLevel, parseInt(indent, 10))) : null
                        },
                        renderHTML: (attributes) => {
                            if (!attributes.indent) return {}
                            return {
                                style: `text-indent: ${attributes.indent}em`
                            }
                        }
                    }
                }
            }
        ]
    },
    addCommands() {
        const updateNodeIndentMarkup = (tr: Transaction, pos: number, delta: number) => {
            const node = tr.doc.nodeAt(pos)
            if (!node) return tr

            const [minLevel, maxLevel] = this.options.range

            let level = (node.attrs.indent || 0) + delta
            level = Math.max(minLevel, Math.min(maxLevel, parseInt(level, 10)))

            if (level === node.attrs.indent) return tr

            return tr.setNodeMarkup(pos, node.type, { ...node.attrs, indent: level }, node.marks)
        }
        const updateIndentLevel = (tr: Transaction, delta: number) => {
            if (tr.selection instanceof TextSelection || tr.selection instanceof AllSelection) {
                const { from, to } = tr.selection
                tr.doc.nodesBetween(from, to, (node, pos) => {
                    if (this.options.types.includes(node.type.name)) {
                        tr = updateNodeIndentMarkup(tr, pos, delta)
                        return false
                    }
                    return true
                })
            }
            return tr
        }
        type CommanderArgs = {
            tr: Transaction
            state: EditorState
            dispatch: Dispatch
        }
        const commanderFactory = (direction: number) =>
            () => function chainHandler({ tr, state, dispatch }: CommanderArgs) {
                const { selection } = state
                tr.setSelection(selection)
                tr = updateIndentLevel(tr, direction)
                if (tr.docChanged) {
                    if (dispatch instanceof Function) dispatch(tr)
                    return true
                }
                return false
            }
        return {
            indent: commanderFactory(1),
            outdent: commanderFactory(-1)
        }
    },
    addKeyboardShortcuts() {
        return {
            "Mod-]": () => this.editor.commands.indent(),
            "Mod-[": () => this.editor.commands.outdent()
        }
    }
})
