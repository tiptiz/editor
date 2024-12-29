"use client"
import "@/styles/toolbars.css"

import ColorFill from "@/components/editor-toolbars/ColorFill"
import ColorText from "@/components/editor-toolbars/ColorText"
import FontBold from "@/components/editor-toolbars/FontBold"
import FontItalic from "@/components/editor-toolbars/FontItalic"
import FontStrike from "@/components/editor-toolbars/FontStrike"
import FontSubscript from "@/components/editor-toolbars/FontSubscript"
import FontSuperscript from "@/components/editor-toolbars/FontSuperscript"
import FontUnderline from "@/components/editor-toolbars/FontUnderline"
import Hr from "@/components/Hr"
import cn from "clsx"

import FontFamily from "../editor-toolbars/FontFamily"
import FontSize from "../editor-toolbars/FontSize"
import FontSizeMinus from "../editor-toolbars/FontSizeMinus"
import FontSizePus from "../editor-toolbars/FontSizePus"
import FormatBrush from "../editor-toolbars/FormatBrush"
import FormatClear from "../editor-toolbars/FormatClear"
import HeadingLevel from "../editor-toolbars/HeadingLevel"
import LineHeight from "../editor-toolbars/LineHeight"
import Redo from "../editor-toolbars/Redo"
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
                </div>
            </div>
            <div className="h-[62px]" />
        </>
    )
}
