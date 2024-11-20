import type { Editor } from "@tiptap/core"

import { getContext, setContext } from "svelte"

export type EditorContext = {
    container: HTMLDivElement
    editor: Editor
}

export const editorCtxKey = Symbol("tiptap-editor")

export function setEditorContext(ctx: EditorContext) {
    setContext(editorCtxKey, ctx)
}

export function getEditorContext() {
    return getContext(editorCtxKey) as EditorContext
}
