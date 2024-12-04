import type { HorizontalType } from "tiptap-extension-horizontal-rules"

import { builtinTypes } from "tiptap-extension-horizontal-rules"

export const lowContrastBg = "#afafaf33"
export const lowContrastGray = "#70707099"

export const headingLevels = [1, 2, 3, 4, 5, 6] as const
export type HeadingLevel = typeof headingLevels[number]

export const tableInsertTargets = ["col-before", "col-after", "row-below", "row-above"] as const
export type TableInsertTarget = typeof tableInsertTargets[number]

export const aligns = ["left", "center", "right", "justify"] as const
export type AlignStyle = typeof aligns[number]

export const horizontalTypes: HorizontalType[] = [
    ...builtinTypes
]
