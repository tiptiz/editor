import "@tiptap/extension-text-style"

import { Extension } from "@tiptap/core"

type FontSizeOptions = {
    types: string[]
}
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        fontSize: {
            /**
             * Set the font size
             * @example editor.commands.setFontSize('10px')
             */
            setFontSize: (fontSize: string) => ReturnType
            /**
             * Unset the font size
             * @example editor.commands.unsetFontSize()
             */
            unsetFontSize: () => ReturnType
        }
    }
}

export const FontSize = Extension.create<FontSizeOptions>({
    name: "fontSize",

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
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize,
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) {
                                return {}
                            }

                            return {
                                style: `font-size: ${attributes.fontSize}`
                            }
                        }
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setFontSize: fontSize => ({ chain }) => {
                return chain()
                    .setMark("textStyle", { fontSize })
                    .run()
            },
            unsetFontSize: () => ({ chain }) => {
                return chain()
                    .setMark("textStyle", { fontSize: null })
                    .removeEmptyTextStyle()
                    .run()
            }
        }
    }
})
