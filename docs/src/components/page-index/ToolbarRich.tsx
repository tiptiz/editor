"use client"
import "@/styles/toolbars.css"

import Hr from "@/components/Hr"
import cn from "clsx"

import ColorFill from "../editor-toolbars/ColorFill"
import ColorText from "../editor-toolbars/ColorText"
import FontBold from "../editor-toolbars/FontBold"
import FontFamily from "../editor-toolbars/FontFamily"
import FontItalic from "../editor-toolbars/FontItalic"
import FontSize from "../editor-toolbars/FontSize"
import FontSizeMinus from "../editor-toolbars/FontSizeMinus"
import FontSizePus from "../editor-toolbars/FontSizePus"
import FontStrike from "../editor-toolbars/FontStrike"
import FontSubscript from "../editor-toolbars/FontSubscript"
import FontSuperscript from "../editor-toolbars/FontSuperscript"
import FontUnderline from "../editor-toolbars/FontUnderline"
import FormatBrush from "../editor-toolbars/FormatBrush"
import FormatClear from "../editor-toolbars/FormatClear"
import HeadingLevel from "../editor-toolbars/HeadingLevel"
import LineHeight from "../editor-toolbars/LineHeight"
import Redo from "../editor-toolbars/Redo"
import TextAlignCenter from "../editor-toolbars/TextAlignCenter"
import TextAlignJustify from "../editor-toolbars/TextAlignJustify"
import TextAlignLeft from "../editor-toolbars/TextAlignLeft"
import TextAlignRight from "../editor-toolbars/TextAlignRight"
import Undo from "../editor-toolbars/Undo"

export default function ToolbarRich() {
    return (
        <>
            <h1 className="text-[3rem] font-bold">With Rich Toolbars</h1>
            <div
                className={cn(
                    "h-[62px] flex items-center justify-center",
                    "border-t border-b border-neutral-100 dark:border-neutral-500/60",
                    "bg-neutral-100 dark:bg-neutral-800"
                )}
            >
                <div className="w-14">
                    <Undo />
                    <Redo />
                    <FormatClear />
                    <FormatBrush />
                </div>
                <Hr className="h-[80%] mx-2" />
                <div className="w-95">
                    <FontFamily />
                    <FontSize />
                    <HeadingLevel />
                    <FontSizePus />
                    <FontSizeMinus />
                    <LineHeight />
                    <FontBold />
                    <FontItalic />
                    <FontStrike />
                    <FontUnderline />
                    <FontSuperscript />
                    <FontSubscript />
                    <ColorText />
                    <ColorFill />
                    <TextAlignLeft />
                    <TextAlignCenter />
                    <TextAlignRight />
                    <TextAlignJustify />
                </div>
            </div>
            <div className="h-[62px]" />
        </>
    )
}
