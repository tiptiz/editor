import type { Editor } from "@tiptap/core"
import type { AlignStyle, HeadingLevel } from "@/utils/editor-presets"

import { getContext, setContext } from "svelte"

const toolbarStateKey = Symbol("toolbarState")

export interface ToolbarState {
    container: HTMLDivElement
    editor: Editor
    isBold: boolean
    isItalic: boolean
    isStrike: boolean
    isUnderline: boolean
    isSup: boolean
    isSub: boolean
    isHeading: HeadingLevel | 0
    isBulletList: boolean
    isTaskList: boolean
    isTable: boolean
    isTextAlign: AlignStyle | ""
    isBlockquote: boolean
}

export const setEditorContext = (state: ToolbarState) => {
    setContext(toolbarStateKey, state)
}

export const getEditorContext = () => {
    return getContext(toolbarStateKey) as ToolbarState
}
