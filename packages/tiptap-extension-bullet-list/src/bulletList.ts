import type { BulletListOptions as TiptapBulletListOptions } from "@tiptap/extension-bullet-list"

import TiptapBulletList from "@tiptap/extension-bullet-list"

export interface BulletListOptions extends TiptapBulletListOptions {
    listStyleType: string
}

export const BulletList = TiptapBulletList.extend<BulletListOptions>({
    content: "listItem*",
    addAttributes() {
        return {
            ...this.parent?.(),
            listStyleType: {
                default: "disc",
                parseHTML: (element) => {
                    console.log("get style property value", element.style.getPropertyValue("list-style-type"))
                    return element.style.getPropertyValue("list-style-type") || "disc"
                },
                renderHTML: ({ listStyleType }) => {
                    return {
                        style: `list-style-type: ${listStyleType}`
                    }
                }
            }
        }
    }
})
