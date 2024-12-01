import type { EditorOptions, Extensions } from "@tiptap/core"

import html from "@/assets/features.html?raw"
import { attrs, css } from "@/utils/config"

import { Editor } from "@tiptap/core"
import BlockQuote from "@tiptap/extension-blockquote"
import Bold from "@tiptap/extension-bold"
import Code from "@tiptap/extension-code"
import Color from "@tiptap/extension-color"
import Document from "@tiptap/extension-document"
import DropCursor from "@tiptap/extension-dropcursor"
import FontFamily from "@tiptap/extension-font-family"
import Highlight from "@tiptap/extension-highlight"
import History from "@tiptap/extension-history"
import Hr from "@tiptap/extension-horizontal-rule"
import Italic from "@tiptap/extension-italic"
import ListItem from "@tiptap/extension-list-item"
import Paragraph from "@tiptap/extension-paragraph"
import Strike from "@tiptap/extension-strike"
import Sub from "@tiptap/extension-subscript"
import Sup from "@tiptap/extension-superscript"
import TaskListItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Text from "@tiptap/extension-text"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import BulletList from "tiptap-extension-bullet-list"
import FontSize from "tiptap-extension-font-size"
import HardBreak from "tiptap-extension-hard-break"
import Heading from "tiptap-extension-heading"
import Indent from "tiptap-extension-indent"

export const headingLevels = [1, 2, 3, 4, 5, 6] as const
export type HeadingLevel = typeof headingLevels[number]

export const extensions: Extensions = [
    Document,
    DropCursor,
    History,
    Text,
    Paragraph,
    Hr.configure(attrs({ style: css`margin: 10px 0` })),
    Bold.extend({ renderHTML: ({ HTMLAttributes }) => ["b", HTMLAttributes, 0] }),
    Italic,
    Strike,
    Underline,
    Code.configure(attrs({
        style: css`
            padding: 2px 6px;
            border-radius: 3px;
            background-color: #dfdfdf;
        `
    })),
    Sub,
    Sup,
    TextStyle, /*           */// given ability to let <span style="" /> element can keep style attribute
    FontFamily, /*          */// operate style.fontFamily
    Color, /*               */// operate style.color
    Highlight.configure({ /**/// <mark /> style.backgroundColor
        multicolor: true
    }),
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
    BlockQuote.configure(attrs({
        style: css`
            overflow: hidden;
            padding-left: 20px;
            border-left: 4px;
            border-style: solid;
            border-color: #dfdfdf66;
            background-color: #efefef44
        `
    })),
    Indent,
    HardBreak,
    // packages/*
    Heading.configure(attrs({ all: { style: css`margin: 5px 0` } })),
    FontSize
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
            content: html,
            ...options
        })
    }
}
