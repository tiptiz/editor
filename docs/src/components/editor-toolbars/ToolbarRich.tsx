"use client"
import "@/styles/toolbars.css"

import cn from "clsx"

import Blockquote from "./Blockquote"
import BulletList from "./BulletList"
import CheckList from "./CheckList"
import CodeBlock from "./CodeBlock"
import ColorFill from "./ColorFill"
import ColorText from "./ColorText"
import Emoji from "./Emoji"
import FontBold from "./FontBold"
import FontFamily from "./FontFamily"
import FontItalic from "./FontItalic"
import FontSize from "./FontSize"
import FontSizeMinus from "./FontSizeMinus"
import FontSizePus from "./FontSizePus"
import FontStrike from "./FontStrike"
import FontSubscript from "./FontSubscript"
import FontSuperscript from "./FontSuperscript"
import FontUnderline from "./FontUnderline"
import FormatBrush from "./FormatBrush"
import FormatClear from "./FormatClear"
import HeadingLevel from "./HeadingLevel"
import InsertImage from "./InsertImage"
import LiftList from "./LiftList"
import LineHeight from "./LineHeight"
import Margin from "./Margin"
import PageBreak from "./PageBreak"
import Redo from "./Redo"
import SinkList from "./SinkList"
import TableAddColAfter from "./TableAddColAfter"
import TableAddColBefore from "./TableAddColBefore"
import TableAddRowAfter from "./TableAddRowAfter"
import TableAddRowBefore from "./TableAddRowBefore"
import TableColRemove from "./TableColRemove"
import TableMergeCells from "./TableMergeCells"
import TableNew from "./TableNew"
import TableRefresh from "./TableRefresh"
import TableRemoveAll from "./TableRemoveAll"
import TableRowRemove from "./TableRowRemove"
import TableSplitCell from "./TableSplitCell"
import TableToggleHeaderCell from "./TableToggleHeaderCell"
import TableToggleHeaderLeft from "./TableToggleHeaderLeft"
import TableToggleHeaderTop from "./TableToggleHeaderTop"
import TextAlignCenter from "./TextAlignCenter"
import TextAlignJustify from "./TextAlignJustify"
import TextAlignLeft from "./TextAlignLeft"
import TextAlignRight from "./TextAlignRight"
import TextIndentDec from "./TextIndentDec"
import TextIndentInc from "./TextIndentInc"
import Undo from "./Undo"
import Hr from "@/components/Hr"

const Splitter = <Hr className="h-[80%] mx-2" />

export default function ToolbarRich() {
    return (
        <>
            {/* <h1 className="text-[3rem] font-bold">With Rich Toolbars</h1> */}
            <div
                className={cn(
                    "hidden lg:flex",
                    "h-[62px] mt-4 flex items-center justify-center -mx-12",
                    "border-t border-b border-neutral-100 dark:border-neutral-500/60",
                    "bg-neutral-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-200"
                )}
            >

                <div className="w-14">
                    <Undo />
                    <Redo />
                    <FormatClear />
                    <FormatBrush />
                </div>
                {Splitter}
                <div className="w-[432px] flex flex-wrap justify-around">
                    <FontFamily />
                    <FontSize />
                    <HeadingLevel />
                    <FontSizePus />
                    <FontSizeMinus />
                    <LineHeight />
                    <Margin />
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
                    <TextIndentInc />
                    <TextIndentDec />
                </div>
                {Splitter}
                <div className="w-[140px] flex flex-wrap">
                    <BulletList />
                    <div className="mr-1"></div>
                    <CheckList />
                    <LiftList />
                    <SinkList />
                    <Blockquote />
                    <CodeBlock />
                    <Emoji />
                    <InsertImage />
                    <PageBreak />
                </div>
                {Splitter}
                <div className="w-[196px] flex flex-wrap">
                    <TableNew />
                    <TableAddColBefore />
                    <TableAddColAfter />
                    <TableAddRowBefore />
                    <TableAddRowAfter />
                    <TableColRemove />
                    <TableRowRemove />
                    <TableRefresh />
                    <TableRemoveAll />
                    <TableMergeCells />
                    <TableSplitCell />
                    <TableToggleHeaderTop />
                    <TableToggleHeaderLeft />
                    <TableToggleHeaderCell />
                </div>
            </div>
            {/* <div className="h-[62px]" /> */}
        </>
    )
}
