import type { Extensions } from "@tiptap/core"

import NodeBlockQuote from "@tiptap/extension-blockquote"
import Document from "@tiptap/extension-document"
import NodeParagraph from "@tiptap/extension-paragraph"
import NodeText from "@tiptap/extension-text"

export const nodes: Extensions = [
    Document,
    NodeParagraph,
    NodeText,
    NodeBlockQuote
]
export const markers: Extensions = []
export const functionalities: Extensions = []

export const extensions: Extensions = [
    ...nodes,
    ...markers,
    ...functionalities
]
