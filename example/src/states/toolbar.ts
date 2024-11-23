import type { Editor } from "@tiptap/core"

import { getContext, setContext } from "svelte"

const toolbarStateKey = Symbol("toolbarState")

export interface ToolbarState {
    container: HTMLDivElement
    editor: Editor
    isBold: boolean
}

export const setToolbarContext = (state: ToolbarState) => {
    setContext(toolbarStateKey, state)
}

export const getToolbarContext = () => {
    return getContext(toolbarStateKey) as ToolbarState
}
