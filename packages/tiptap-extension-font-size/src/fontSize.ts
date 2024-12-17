import "@tiptap/extension-text-style"

import { type Command, Extension } from "@tiptap/core"

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
            /**
             * Increase/Decrease the font size
             * @example editor.commands.updateFontSize(2)
             * */
            updateFontSize: (step?: number) => ReturnType
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
        type ChainCmdFactory = (...args: any[]) => Command
        const chainCmdSetFontSize: ChainCmdFactory = (fontSize: string) =>
            ({ chain }) => chain().setMark("textStyle", { fontSize }).run()

        const chainCmdUnsetFontSize: ChainCmdFactory = () =>
            ({ chain }) => chain()
                .setMark("textStyle", { fontSize: null })
                .removeEmptyTextStyle()
                .run()

        const chainCmdUpdateFontSize: ChainCmdFactory = (step = 2) =>
            ({ chain, editor }) => {
                const fontSize = editor.getAttributes("textStyle").fontSize || "16px"
                const size = parseInt(fontSize, 10) + step
                return chain().setMark("textStyle", { fontSize: `${size}px` }).run()
            }

        return {
            setFontSize: chainCmdSetFontSize,
            unsetFontSize: chainCmdUnsetFontSize,
            updateFontSize: chainCmdUpdateFontSize
        }
    }
})
