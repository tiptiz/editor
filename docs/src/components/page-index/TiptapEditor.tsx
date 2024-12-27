"use client"
import type { ReactNode } from "react"

import Document from "@tiptap/extension-document"
import DropCursor from "@tiptap/extension-dropcursor"
import History from "@tiptap/extension-history"
import { EditorConsumer, EditorContent, EditorContext, useEditor } from "@tiptap/react"
import TiptizSuites from "@tiptiz/rich-suits"

const extensions = [
    Document,
    DropCursor,
    History,
    TiptizSuites.configure({
        // CodeBlockShiki: false
    })
]
export default function TiptapEditor({ children }: { children: ReactNode }) {
    const editor = useEditor({
        extensions,
        immediatelyRender: false,
        content: "<h1>Tiptiz Editor</h1>"
    })
    return (
        <EditorContext.Provider value={{ editor }}>
            {children}
            <EditorConsumer>
                {({ editor: currentEditor }) => <EditorContent editor={currentEditor} />}
            </EditorConsumer>
        </EditorContext.Provider>
    )
}
