"use client"
import "@/styles/toolbars.css"

import Hr from "@/components/Hr"
import cn from "clsx"

import Blockquote from "../editor-toolbars/Blockquote"
import BulletList from "../editor-toolbars/BulletList"
import CheckList from "../editor-toolbars/CheckList"
import CodeBlock from "../editor-toolbars/CodeBlock"
import Emoji from "../editor-toolbars/Emoji"
import FontBold from "../editor-toolbars/FontBold"
import FontItalic from "../editor-toolbars/FontItalic"
import FontStrike from "../editor-toolbars/FontStrike"
import FontUnderline from "../editor-toolbars/FontUnderline"
import FormatClear from "../editor-toolbars/FormatClear"
import HeadingLevel from "../editor-toolbars/HeadingLevel"
import InsertImage from "../editor-toolbars/InsertImage"
import Redo from "../editor-toolbars/Redo"
import TableNew from "../editor-toolbars/TableNew"
import TableRemoveAll from "../editor-toolbars/TableRemoveAll"
import Undo from "../editor-toolbars/Undo"

const Splitter = <Hr className="h-[70%] mx-2" />

export default function ToolbarLite() {
    return (
        <>
            {/* <h1 className="text-[3rem] font-bold">With Rich Toolbars</h1> */}
            <div
                className={cn(
                    "hidden sm:flex",
                    "h-[31px] mt-4 flex items-center justify-center -mx-6 md:-mx-12",
                    "border-t border-b border-neutral-100 dark:border-neutral-500/60",
                    "bg-neutral-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-200"
                )}
            >

                <div className="w-21">
                    <Undo />
                    <Redo />
                    <FormatClear />
                </div>
                {Splitter}
                <div>
                    <HeadingLevel />
                    <FontBold />
                    <FontItalic />
                    <FontStrike />
                    <FontUnderline />
                </div>
                {Splitter}
                <div>
                    <BulletList />
                    <CheckList />
                    <Blockquote />
                    <CodeBlock />
                    <Emoji />
                    <InsertImage />
                    <TableNew />
                    <TableRemoveAll />
                </div>
            </div>
        </>
    )
}
