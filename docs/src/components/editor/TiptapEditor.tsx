"use client"
import "./editor.scss"

import type { ReactNode } from "react"

import Document from "@tiptap/extension-document"
import DropCursor from "@tiptap/extension-dropcursor"
import History from "@tiptap/extension-history"
import { EditorConsumer, EditorContent, EditorContext, useEditor } from "@tiptap/react"
import TiptizSuites from "@tiptiz/rich-suits"

const code = `<h1>Heading Title</h1>
<pre data-show-line-numbers="true" data-highlight-lines="1,2,3,6,7"><code class="language-javascript">for (var i=1; i <= 20; i++) {
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
} </code></pre>
`

const extensions = [
    Document.extend({
        content: "heading block*"
    }),
    DropCursor,
    History,
    TiptizSuites.configure({
        Placeholder: {
            placeholder: ({ node }) => {
                if (node.type.name === "heading") {
                    return "What’s the title?"
                }

                return "Can you add some further context?"
            }
        },
        CodeBlockShiki: {
            defaultLanguage: "javascript",
            defaultTheme: "vitesse-dark"
        }
    })
]
export default function TiptapEditor({ children }: { children: ReactNode }) {
    const editor = useEditor({
        extensions,
        immediatelyRender: false,
        content: code
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
