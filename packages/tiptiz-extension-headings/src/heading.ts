import { mergeAttributes } from "@tiptap/core"
import * as TipTapHeading from "@tiptap/extension-heading"

export interface HeadingOptions extends TipTapHeading.HeadingOptions {
    HTMLAttributes: Partial<Record<`h${TipTapHeading.Level}` | "all", any>>
}

export const Heading = TipTapHeading.Heading.extend<HeadingOptions>({
    addOptions() {
        return {
            levels: TipTapHeading.Heading.options.levels,
            HTMLAttributes: {
                h1: { style: "font-size: 1.625em; font-weight: bolder; margin-top: 0.5em" },
                h2: { style: "font-size: 1.250em; font-weight: bold; margin-top: 0.5em" },
                h3: { style: "font-size: 1.125em; font-weight: bold; margin-top: 0.3em" },
                h4: { style: "font-size: 1.000em; font-weight: bold; margin-top: 0.3em" }
            }
        }
    },

    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level)

        const level: TipTapHeading.Level = hasLevel
            ? node.attrs.level
            : this.options.levels[0]

        const tag = `h${level}` as const
        const commandAttrs = this.options.HTMLAttributes.all
        const currentAttrs = this.options.HTMLAttributes[tag]

        return [tag, mergeAttributes(commandAttrs, currentAttrs, HTMLAttributes), 0]
    }
})
