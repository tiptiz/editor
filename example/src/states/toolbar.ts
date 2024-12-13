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
    isCodeBlock: boolean
    tocHeadings: { level: number; text: string }[] // Pb2db
}

export const setEditorContext = (state: ToolbarState) => {
    setContext(toolbarStateKey, state)
}

export const getEditorContext = () => {
    return getContext(toolbarStateKey) as ToolbarState
}

export const updateTOCHeadings = (editor: Editor) => {
    const doc = editor.state.doc;
    const newHeadings: { level: number; text: string }[] = [];

    doc.descendants((node) => {
        if (node.type.name === "heading") {
            newHeadings.push({
                level: node.attrs.level,
                text: node.textContent,
            });
        }
    });

    const state = getEditorContext();
    state.tocHeadings = newHeadings;
};
