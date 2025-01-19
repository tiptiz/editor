"use client"
import "@/styles/toolbars.css"

import cn from "clsx"

import Blockquote from "./Blockquote"
import BulletList from "./BulletList"
import CheckList from "./CheckList"
import CodeBlock from "./CodeBlock"
import Emoji from "./Emoji"
import FontBold from "./FontBold"
import FontItalic from "./FontItalic"
import FontStrike from "./FontStrike"
import FontUnderline from "./FontUnderline"
import FormatClear from "./FormatClear"
import HeadingLevel from "./HeadingLevel"
import InsertImage from "./InsertImage"
import Redo from "./Redo"
import TableNew from "./TableNew"
import TableRemoveAll from "./TableRemoveAll"
import Undo from "./Undo"
import Hr from "@/components/Hr"

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
