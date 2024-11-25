import type { EditorOptions, Extensions } from "@tiptap/core"

import html from "@/assets/features.html?raw"

import { Editor } from "@tiptap/core"
import Bold from "@tiptap/extension-bold"
import Code from "@tiptap/extension-code"
import Document from "@tiptap/extension-document"
import DropCursor from "@tiptap/extension-dropcursor"
import History from "@tiptap/extension-history"
import Hr from "@tiptap/extension-horizontal-rule"
import Italic from "@tiptap/extension-italic"
import Paragraph from "@tiptap/extension-paragraph"
import Strike from "@tiptap/extension-strike"
import Sub from "@tiptap/extension-subscript"
import Sup from "@tiptap/extension-superscript"
import Text from "@tiptap/extension-text"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import Heading from "tiptap-extension-heading"

export const extensions: Extensions = [
    Document,
    DropCursor,
    History,
    Text,
    Paragraph.configure({ HTMLAttributes: { style: "margin: 5px 0" } }),
    Hr.configure({ HTMLAttributes: { style: "margin: 10px 0;" } }),
    Bold,
    Italic,
    Strike,
    Underline,
    Code.configure({ HTMLAttributes: { style: "background-color: #dfdfdf; border-radius: 3px; padding: 2px 6px" } }),
    Sub,
    Sup,
    TextStyle,
    // packages/*
    Heading.configure({ HTMLAttributes: { all: { style: "margin: 5px 0" } } })
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
