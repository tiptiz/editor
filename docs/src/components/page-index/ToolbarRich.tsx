"use client"
import "@/styles/toolbars.css"

import cn from "clsx"

import Hr from "@/components/Hr"

import FontFamily from "../editor-toolbars/FontFamily"
import FontSize from "../editor-toolbars/FontSize"
import FontSizeMinus from "../editor-toolbars/FontSizeMinus"
import FontSizePus from "../editor-toolbars/FontSizePus"
import FormatBrush from "../editor-toolbars/FormatBrush"
import FormatClear from "../editor-toolbars/FormatClear"
import HeadingLevel from "../editor-toolbars/HeadingLevel"
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
                <div className="w-15">
                    <Undo />
                    <Redo />
                    <FormatClear />
                    <FormatBrush />
                </div>
                <Hr className="h-[80%] mr-3" />
                <div>
                    <FontFamily />
                    <FontSize />
                    <HeadingLevel />
                    <FontSizePus />
                    <FontSizeMinus />
                </div>
            </div>
            <div className="h-[62px]" />
        </>
    )
}
