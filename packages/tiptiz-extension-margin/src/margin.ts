import "@tiptap/extension-text-style"

import { Extension } from "@tiptap/core"

type MarginOptions = {
    types: string[]
}
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        margin: {
            setMargin: (margin: string) => ReturnType
            unsetMargin: () => ReturnType
        }
    }
}

export const Margin = Extension.create<MarginOptions>({
    name: "margin",

    addOptions() {
        return {
            types: ["textStyle"]
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    margin: {
                        default: null,
                        parseHTML: element => element.style.margin,
                        renderHTML: (attributes) => {
                            if (!attributes.margin) {
                                return {}
                            }

                            return {
                                style: `margin: ${attributes.margin}`
                            }
                        }
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setMargin: margin => ({ chain }) => {
                return chain()
                    .setMark("textStyle", { margin })
                    .run()
            },
            unsetMargin: () => ({ chain }) => {
                return chain()
                    .setMark("textStyle", { margin: null })
                    .removeEmptyTextStyle()
                    .run()
            }
        }
    }
})
