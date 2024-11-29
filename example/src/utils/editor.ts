import type { EditorOptions, Extensions } from "@tiptap/core"

import html from "@/assets/features.html?raw"

import { Editor } from "@tiptap/core"
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
    Paragraph.configure({ HTMLAttributes: { style: "margin-top: 0.625em" } }),
    Hr.configure({ HTMLAttributes: { style: "margin: 10px 0;" } }),
    Bold.extend({ renderHTML: ({ HTMLAttributes }) => ["b", HTMLAttributes, 0] }),
    Italic,
    Strike,
    Underline,
    Code.configure({ HTMLAttributes: { style: "background-color: #dfdfdf; border-radius: 3px; padding: 2px 6px" } }),
    Sub,
    Sup,
    TextStyle, /*           */// given ability to let <span style="" /> element can keep style attribute
    FontFamily, /*          */// operate style.fontFamily
    Color, /*               */// operate style.color
    Highlight.configure({ /**/// operate style.backgroundColor
        multicolor: true /* */// true to enable textStyle setup style.backgroundColor
    }),
    ListItem,
    BulletList.configure({ HTMLAttributes: { style: "padding-left: 20px" } }),
    Indent,
    HardBreak,
    // packages/*
    Heading.configure({ HTMLAttributes: { all: { style: "margin: 5px 0" } } }),
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

export const currentFocusNode = (editor: Editor, nodeType = Node.ELEMENT_NODE) => {
    const pos = editor.state.selection.from
    let node: Node | null = editor.view.domAtPos(pos).node
    while (node && node.nodeType !== nodeType) {
        node = node.parentNode
    }
    return node
}
