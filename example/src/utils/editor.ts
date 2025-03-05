import type { EditorOptions, Extensions } from "@tiptap/core"

import { horizontalTypes, lowContrastBg, lowContrastGray } from "@/utils/editor-presets"

import { Editor } from "@tiptap/core"
import Document from "@tiptap/extension-document"
import DropCursor from "@tiptap/extension-dropcursor"
import History from "@tiptap/extension-history"
import { FullKit } from "@tiptiz/editor"
import { attrs, css } from "tiptap-utils-shared"

export const extensions: Extensions = [
    Document,
    History,
    DropCursor,
    FullKit.configure({
        Placeholder: { placeholder: "Write down your imagination …" },
        TextAlign: { types: ["heading", "paragraph"] },
        Heading: attrs({ all: { style: css`margin: 5px 0` } }),
        HorizontalRules: {
            ...attrs({
                style: css`
                    border-color: ${lowContrastGray};
                    margin-top: 10px;
                    margin-bottom: 10px;
                    border-top-width: 2px
                `
            }),
            types: horizontalTypes
        },
        Link: attrs({
            style: css`
                text-decoration: underline;
                color: #0096dc;
                cursor: pointer
            `
        }),
        BulletList: attrs({ class: "list-paddingleft-1", style: css`padding-left: 1.25em` }),
        TaskList: attrs({
            style: css`
                /*
                 * It's a hack here, for some editor (eg: wechat editor) 
                 * didn't support 0 value padding
                 * so, you can paste taskList with style now
                 */
                padding-left: 1px;
                margin-left: -1px;
            `
        }),
        TaskListItem: attrs({
            style: css`
                display: flex;
                gap: 0.625em;
            `
        }),
        Blockquote: attrs({
            style: css`
                overflow: hidden;
                padding: 5px 0 5px 10px;
                border-left: 4px solid ${lowContrastGray};
                margin: 10px 0;
            `
        }),
        CodeBlockShiki: {
            defaultLanguage: "javascript",
            defaultTheme: "vitesse-dark"
        },
        Image: attrs({
            style: css`
                display: block;
                margin: 0 auto;
                max-width: 100%;
                max-height: 1000px;
                height: auto;
            `
        }),
        TableCell: attrs({
            style: css`border: 1px solid ${lowContrastGray}`
        }),
        TableHeader: attrs({
            style: css`
                background-color: ${lowContrastBg};
                border: 1px solid ${lowContrastGray}
            `
        })
    })
]

export const createEditor = (options?: Partial<EditorOptions>) => {
    const container = document.createElement("div")
    container.classList.add("editor-container")
    container.style.fontSize = "16px"

    return {
        container,
        editor: new Editor({
            element: container,
            extensions,
            content: "",
            ...options
        })
    }
}
