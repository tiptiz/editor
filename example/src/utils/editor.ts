import type { Extensions } from "@tiptap/core"

import textHTMLContent from "@/assets/test-article.html?raw"

import { Editor } from "@tiptap/core"
import CodeBlock from "@tiptap/extension-code-block"
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import StarterKit from "@tiptap/starter-kit"
import BulletList from "tiptap-extension-bullet-list"
import Float from "tiptap-extension-float"
import FontSize from "tiptap-extension-font-size"
import Hr from "tiptap-extension-hr"
import Iframe from "tiptap-extension-iframe"
import Image from "tiptap-extension-image"
import ImageLink from "tiptap-extension-image-link"
import LineHeight from "tiptap-extension-line-height"
import Link from "tiptap-extension-link"
import Margin from "tiptap-extension-margin"
import OrderedList from "tiptap-extension-ordered-list"
import Resizable from "tiptap-extension-resizable"
import Section from "tiptap-extension-section"
import TrailingNode from "tiptap-extension-trailing-node"
import Video from "tiptap-extension-video"

export const extensions: Extensions = [
    StarterKit.configure({
        bulletList: false,
        orderedList: false,
        codeBlock: false
    }),
    Underline,
    TextStyle,
    Color,
    FontSize,
    TextAlign.configure({
        types: ["paragraph"],
        defaultAlignment: "justify"
    }),
    Highlight.configure({ multicolor: true }),
    CodeBlock.configure({ HTMLAttributes: { class: "code-snippet" } }),
    TrailingNode,
    Link.configure({ openOnClick: false, HTMLAttributes: { rel: "" } }),
    Resizable.configure({ types: ["image", "video"] }),
    Image.configure({ inline: true, allowBase64: true }),
    Video.configure({ allowBase64: true }),
    Iframe,
    Section,
    ImageLink,
    Hr,
    BulletList.configure({ HTMLAttributes: { class: "list-paddingleft-1" } }),
    OrderedList.configure({
        HTMLAttributes: { class: "list-paddingleft-1" }
    }),
    LineHeight,
    Float,
    Margin
]

export const createEditor = () => {
    const container = document.createElement("div")
    container.classList.add("editor-container")

    return {
        container,
        editor: new Editor({
            element: container,
            extensions,
            content: textHTMLContent
        })
    }
}
