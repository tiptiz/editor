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
import LiftList from "./LiftList"
import Redo from "./Redo"
import SinkList from "./SinkList"
import TableAddColAfter from "./TableAddColAfter"
import TableAddColBefore from "./TableAddColBefore"
import TableAddRowAfter from "./TableAddRowAfter"
import TableAddRowBefore from "./TableAddRowBefore"
import TableColRemove from "./TableColRemove"
import TableNew from "./TableNew"
import TableRefresh from "./TableRefresh"
import TableRemoveAll from "./TableRemoveAll"
import TableRowRemove from "./TableRowRemove"
import TableToggleHeaderTop from "./TableToggleHeaderTop"
import Undo from "./Undo"
import Hr from "@/components/Hr"

const Splitter = <Hr className="h-[70%] mx-2" />

export default function ToolbarMarkdown() {
    return (
        <>
            {/* <h1 className="text-[3rem] font-bold">With Rich Toolbars</h1> */}
            <div
                className={cn(
                    "hidden sm:flex",
                    "h-[31px] mt-4 flex items-center justify-center -mx-12",
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
                    <LiftList />
                    <SinkList />
                    <Blockquote />
                    <CodeBlock />
                    <Emoji />
                    <InsertImage />
                </div>
                {Splitter}
                <div>
                    <TableNew />
                    <TableRefresh />
                    <TableRemoveAll />
                    <TableToggleHeaderTop />
                    <TableAddColBefore />
                    <TableAddColAfter />
                    <TableAddRowBefore />
                    <TableAddRowAfter />
                    <TableColRemove />
                    <TableRowRemove />
                </div>
            </div>
        </>
    )
}
