import type { Editor } from "@tiptap/core"
import type { HeadingLevel } from "@/utils/editor"

import { getContext, setContext } from "svelte"

const toolbarStateKey = Symbol("toolbarState")

export interface ToolbarState {
    container: HTMLDivElement
    editor: Editor
    isBold: boolean
    isItalic: boolean
    isStrike: boolean
    isUnderline: boolean
    isHeading: HeadingLevel | 0
}

export const setToolbarContext = (state: ToolbarState) => {
    setContext(toolbarStateKey, state)
}

export const getToolbarContext = () => {
    return getContext(toolbarStateKey) as ToolbarState
}
