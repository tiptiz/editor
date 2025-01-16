"use client"
import "@/styles/toolbars.css"

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
import LiftList from "../editor-toolbars/LiftList"
import Redo from "../editor-toolbars/Redo"
import SinkList from "../editor-toolbars/SinkList"
import TableAddColAfter from "../editor-toolbars/TableAddColAfter"
import TableAddColBefore from "../editor-toolbars/TableAddColBefore"
import TableAddRowAfter from "../editor-toolbars/TableAddRowAfter"
import TableAddRowBefore from "../editor-toolbars/TableAddRowBefore"
import TableColRemove from "../editor-toolbars/TableColRemove"
import TableNew from "../editor-toolbars/TableNew"
import TableRefresh from "../editor-toolbars/TableRefresh"
import TableRemoveAll from "../editor-toolbars/TableRemoveAll"
import TableRowRemove from "../editor-toolbars/TableRowRemove"
import TableToggleHeaderTop from "../editor-toolbars/TableToggleHeaderTop"
import Undo from "../editor-toolbars/Undo"
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
