import TiptapBulletList from "@tiptap/extension-bullet-list"

export const BulletList = TiptapBulletList.extend({
    content: "listItem*",
    addAttributes() {
        return {
            ...this.parent?.(),
            listType: {
                default: "disc",
                parseHTML: element => element.style.getPropertyValue("list-style-type") || "disc",
                renderHTML: ({ listType }) => {
                    return {
                        style: `list-style-type: ${listType}`
                    }
                }
            }
        }
    }
})
