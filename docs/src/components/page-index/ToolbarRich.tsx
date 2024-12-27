"use client"
import FormatBrush from "@/components/editor-toolbars/FormatBrush"
import FormatClear from "@/components/editor-toolbars/FormatClear"
import Redo from "@/components/editor-toolbars/Redo"
import Undo from "@/components/editor-toolbars/Undo"
import cn from "clsx"

// TODO fix tailwindcss dark mode
export default function ToolbarRich() {
    return (
        <>
            <h1 className="text-[3rem] font-bold">With Rich Toolbars</h1>
            <div
                className={cn(
                    "flex",
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
            </div>
        </>
    )
}
