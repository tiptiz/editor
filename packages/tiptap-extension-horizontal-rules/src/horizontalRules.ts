import { nodeInputRule } from "@tiptap/core"
import TiptapHr from "@tiptap/extension-horizontal-rule"
import { NodeSelection, TextSelection } from "@tiptap/pm/state"

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        setHr: {
            setHr: (options?: { dataType?: string, color?: string }) => ReturnType
        }
    }
}

export interface HorizontalType {
    type: string
    style: string
}

export interface HorizontalOptions {
    types?: HorizontalType[]
}

export const builtinTypes: HorizontalType[] = [
    { type: "single", style: "border-style: single; border-top-width: 1px" },
    { type: "double", style: "border-style: double" },
    { type: "dashed", style: "border-style: dashed" },
    { type: "dotted", style: "border-style: dotted" },
    { type: "solid", style: "border-style: solid" }
]

// from umo editor
// TODO current behavior is: add hr before last hr ? need fix that
export const HorizontalRules = TiptapHr.extend<HorizontalOptions>({
    addOptions() {
        return {
            types: builtinTypes
        }
    },
    parseHTML() {
        return [{ tag: "hr" }]
    },
    addAttributes() {
        return {
            "data-type": {
                parseHTML: element => element.getAttribute("data-type") ?? "single",
                renderHTML: (attributes) => {
                    const dataType = attributes["data-type"] ?? "single"
                    const opt = this.options.types
                        .find(opt => opt.type === dataType) || builtinTypes[0]
                    return {
                        style: opt.style
                    }
                }
            },
            "color": {
                parseHTML: element => element.getAttribute("data-color"),
                renderHTML: (attributes) => {
                    return {
                        "data-color": attributes.color,
                        "style": `color: ${attributes.color || "inherit"}`
                    }
                }
            }
        }
    },
    addCommands() {
        return {
            setHr: ({ dataType, color } = {}) => ({ chain, state }) => {
                const { $to: $originTo } = state.selection
                const currentChain = chain()
                if ($originTo.parentOffset === 0) {
                    currentChain.insertContentAt(Math.max($originTo.pos - 2, 0), {
                        type: this.name,
                        attrs: { "data-type": dataType, color }
                    })
                } else {
                    currentChain.insertContent({
                        type: this.name,
                        attrs: { "data-type": dataType, color }
                    })
                }
                // set cursor after horizontal rule
                return (
                    currentChain.command(({ tr, dispatch }) => {
                        if (dispatch) {
                            const { $to } = tr.selection
                            const posAfter = $to.end()
                            if ($to.nodeAfter) {
                                if ($to.nodeAfter.isTextblock) {
                                    tr.setSelection(TextSelection.create(tr.doc, $to.pos + 1))
                                } else if ($to.nodeAfter.isBlock) {
                                    tr.setSelection(NodeSelection.create(tr.doc, $to.pos))
                                } else {
                                    tr.setSelection(TextSelection.create(tr.doc, $to.pos))
                                }
                            } else {
                                // add node after horizontal rule if it’s the end of the document
                                const node = $to.parent.type.contentMatch.defaultType?.create() ?? 0
                                if (node) {
                                    tr.insert(posAfter, node)
                                    tr.setSelection(TextSelection.create(tr.doc, posAfter + 1))
                                }
                            }
                            tr.scrollIntoView()
                        }
                        return true
                    }).run()
                )
            }
        }
    },
    addInputRules() {
        return [
            nodeInputRule({
                find: /^(?:---|—-|___\s|\*\*\*\s)$/,
                type: this.type
            })
        ]
    }
})
