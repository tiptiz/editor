import type { Extensions } from "@tiptap/core"

import html from "@/assets/features.html?raw"

import { Editor } from "@tiptap/core"
import Document from "@tiptap/extension-document"
import History from "@tiptap/extension-history"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Heading from "tiptap-extension-heading"

export const extensions: Extensions = [
    Document,
    History,
    Text,
    Paragraph,
    // packages/*
    Heading
]

export const createEditor = () => {
    const container = document.createElement("div")
    container.classList.add("editor-container")
    container.style.fontSize = "16px"

    return {
        container,
        editor: new Editor({
            element: container,
            extensions,
            content: html
        })
    }
}
