import { mergeAttributes, Node, textblockTypeInputRule } from "@tiptap/core"

/**
 * The heading level options.
 */
export type Level = 1 | 2 | 3 | 4 | 5 | 6

export interface TypographyOptions {
    levels: Level[]
    /**
     * The HTML attributes for a heading node.
     * @default {}
     * @example { h2: { class: "foo", style: "font-size: 24px" } }
     */
    HTMLAttributes: Partial<Record<`h${Level}` | "all", Record<string, any>>>
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        heading: {
            /**
             * Set a heading node
             * @param attributes The heading attributes
             * @example editor.commands.setHeading({ level: 1 })
             */
            setHeading: (attributes: { level: Level }) => ReturnType
            /**
             * Toggle a heading node
             * @param attributes The heading attributes
             * @example editor.commands.toggleHeading({ level: 1 })
             */
            toggleHeading: (attributes: { level: Level }) => ReturnType
        }
    }
}

export const Typography = Node.create<TypographyOptions>({
    name: "typography",
    addOptions() {
        return {
            levels: [2, 3, 4],
            HTMLAttributes: {
                h2: { style: "font-size: 1.875em; font-weight: bolder; margin-top: 0.5em" },
                h3: { style: "font-size: 1.500em; font-weight: bold; margin-top: 0.3em" },
                h4: { style: "font-size: 1.250em; margin-top: 0.1em" }
            }
        } satisfies TypographyOptions
    },

    content: "inline*",

    group: "block",

    defining: true,

    addAttributes() {
        return {
            level: null
        }
    },

    parseHTML() {
        return this.options.levels.map((level: Level) => ({
            tag: `h${level}`,
            attrs: {
                level
            }
        }))
    },

    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level)

        const level = hasLevel
            ? node.attrs.level
            : this.options.levels[0]
        const tag = `h${level}`

        const commandAttrs = this.options.HTMLAttributes.all
        const levelAttrs = this.options.HTMLAttributes[tag]

        return [tag, mergeAttributes(commandAttrs, levelAttrs, HTMLAttributes), 0]
    },

    addCommands() {
        return {
            setHeading: attributes => ({ commands }) => {
                if (!this.options.levels.includes(attributes.level)) {
                    return false
                }

                return commands.setNode(this.name, attributes)
            },
            toggleHeading: attributes => ({ commands }) => {
                if (!this.options.levels.includes(attributes.level)) {
                    return false
                }

                return commands.toggleNode(this.name, "paragraph", attributes)
            }
        }
    },

    addKeyboardShortcuts() {
        return this.options.levels.reduce((items, level) => ({
            ...items,
            ...{
                [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level })
            }
        }), {})
    },

    addInputRules() {
        return this.options.levels.map((level) => {
            return textblockTypeInputRule({
                find: new RegExp(`^(#{1,${level}})\\s$`),
                type: this.type,
                getAttributes: {
                    level // # => h2, ## => h3
                }
            })
        })
    }
})
