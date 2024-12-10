import type { HorizontalType } from "tiptap-extension-horizontal-rules"

import googleNotoEmojis from "@/assets/noto-emojis-v16.json"

import { builtinTypes } from "tiptap-extension-horizontal-rules"

export const lowContrastBg = "#afafaf33"
export const lowContrastGray = "#70707099"

export const headingLevels = [1, 2, 3, 4, 5, 6] as const
export type HeadingLevel = typeof headingLevels[number]

export const tableInsertTargets = ["col before", "col after", "row below", "row above"] as const
export type TableInsertTarget = typeof tableInsertTargets[number]

export const aligns = ["left", "center", "right", "justify"] as const
export type AlignStyle = typeof aligns[number]

export const marginTargets = ["top", "bottom", "right", "left"] as const
export type MarginTarget = typeof marginTargets[number]

export const horizontalTypes: HorizontalType[] = [
    ...builtinTypes
]

export interface EmojiItemMeta {
    base: number[]
    alternates: number[]
    emoticons: string[]
    shortcodes: string[]
    animated: boolean
    directional: boolean
}

export interface EmojiMetaData {
    group: string
    emoji: EmojiItemMeta[]
}

export const emojis = googleNotoEmojis as any as EmojiMetaData[]
