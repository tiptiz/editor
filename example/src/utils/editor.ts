import type { EditorOptions, Extensions } from "@tiptap/core"

import { horizontalTypes, lowContrastBg, lowContrastGray } from "@/utils/editor-presets"

import { Editor } from "@tiptap/core"
import Blockquote from "@tiptap/extension-blockquote"
import Bold from "@tiptap/extension-bold"
import Code from "@tiptap/extension-code"
import Color from "@tiptap/extension-color"
import Document from "@tiptap/extension-document"
import DropCursor from "@tiptap/extension-dropcursor"
import FontFamily from "@tiptap/extension-font-family"
import Highlight from "@tiptap/extension-highlight"
import History from "@tiptap/extension-history"
import Image from "@tiptap/extension-image"
import Italic from "@tiptap/extension-italic"
import Link from "@tiptap/extension-link"
import ListItem from "@tiptap/extension-list-item"
import Paragraph from "@tiptap/extension-paragraph"
import Placeholder from "@tiptap/extension-placeholder"
import Strike from "@tiptap/extension-strike"
import Sub from "@tiptap/extension-subscript"
import Sup from "@tiptap/extension-superscript"
import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import TaskListItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Text from "@tiptap/extension-text"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import BulletList from "tiptap-extension-bullet-list"
import CodeBlockShiki from "tiptap-extension-code-block-shiki"
import FontSize from "tiptap-extension-font-size"
import HardBreak from "tiptap-extension-hard-break"
import Heading from "tiptap-extension-heading"
import HorizontalRules from "tiptap-extension-horizontal-rules"
import Indent from "tiptap-extension-indent"
import LineHeight from "tiptap-extension-line-height"
import Margin from "tiptap-extension-margin"
import TrailingNode from "tiptap-extension-trailing-node"
import { attrs, css } from "tiptap-utils-shared"

export const extensions: Extensions = [
    Document,
    Placeholder.configure({ placeholder: "Write down your imagination …" }),
    DropCursor,
    History,
    Paragraph,
    TrailingNode,
    Text,
    TextStyle, /*           */// given ability to let <span style="" /> element can keep style attribute
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    FontFamily,
    FontSize,
    Heading.configure(attrs({ all: { style: css`margin: 5px 0` } })),
    LineHeight,
    Color,
    Highlight.configure({ multicolor: true }),
    Italic.extend({ renderHTML: ({ HTMLAttributes }) => ["i", HTMLAttributes, 0] }),
    Strike,
    Underline,
    Indent,
    Margin,
    HardBreak,
    // TODO better hr style
    HorizontalRules.configure({
        ...attrs({
            style: css`
                border-color: ${lowContrastGray};
                margin-top: 10px;
                margin-bottom: 10px;
                border-top-width: 2px
            `
        }),
        types: horizontalTypes
    }),
    Bold.extend({ renderHTML: ({ HTMLAttributes }) => ["b", HTMLAttributes, 0] }),
    Code.configure(attrs({ class: "inline-code" })),
    Sub,
    Sup,
    Link.configure(attrs({
        style: css`
            text-decoration: underline;
            color: #0096dc;
            cursor: pointer
        `
    })),
    BulletList.configure(attrs({ class: "list-paddingleft-1", style: css`padding-left: 1.25em` })),
    ListItem,
    TaskList.configure(attrs({
        style: css`
            /*
             * It's a hack here, for some editor (eg: wechat editor) 
             * didn't support 0 value padding
             * so, you can paste taskList with style now
             */
            padding-left: 1px;
            margin-left: -1px;
        `
    })),
    TaskListItem.configure({
        nested: true,
        ...attrs({
            style: css`
                display: flex;
                gap: 0.625em;
            `
        })
    }),
    Blockquote.configure(attrs({
        style: css`
            overflow: hidden;
            padding: 10px 20px;
            border-left: 4px;
            border-style: solid;
            border-color: ${lowContrastGray};
            margin: 10px 0;
            background-color: ${lowContrastBg}
        `
    })),
    CodeBlockShiki.configure({
        ...attrs({ class: "code-block" }),
        defaultLanguage: "javascript",
        defaultTheme: "vitesse-dark"
    }),
    Image.configure(attrs({
        style: css`
            display: block;
            margin: 0 auto;
            max-width: 100%;
            max-height: 1000px;
            height: auto;
        `
    })),
    Table.configure({ resizable: true, allowTableNodeSelection: true }),
    TableCell.configure(attrs({
        style: css`border: 1px solid ${lowContrastGray}`
    })),
    TableHeader.configure(attrs({
        style: css`
            background-color: ${lowContrastBg};
            border: 1px solid ${lowContrastGray}
        `
    })),
    TableRow
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
