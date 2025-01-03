"use client"
import "@/styles/toolbars.css"

import PageBreak from "@/components/editor-toolbars/PageBreak"
import Hr from "@/components/Hr"
import cn from "clsx"

import Blockquote from "../editor-toolbars/Blockquote"
import BulletList from "../editor-toolbars/BulletList"
import CheckList from "../editor-toolbars/CheckList"
import CodeBlock from "../editor-toolbars/CodeBlock"
import ColorFill from "../editor-toolbars/ColorFill"
import ColorText from "../editor-toolbars/ColorText"
import Emoji from "../editor-toolbars/Emoji"
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
import InsertImage from "../editor-toolbars/InsertImage"
import LiftList from "../editor-toolbars/LiftList"
import LineHeight from "../editor-toolbars/LineHeight"
import Margin from "../editor-toolbars/Margin"
import Redo from "../editor-toolbars/Redo"
import SinkList from "../editor-toolbars/SinkList"
import TextAlignCenter from "../editor-toolbars/TextAlignCenter"
import TextAlignJustify from "../editor-toolbars/TextAlignJustify"
import TextAlignLeft from "../editor-toolbars/TextAlignLeft"
import TextAlignRight from "../editor-toolbars/TextAlignRight"
import TextIndentDec from "../editor-toolbars/TextIndentDec"
import TextIndentInc from "../editor-toolbars/TextIndentInc"
import Undo from "../editor-toolbars/Undo"

const Splitter = <Hr className="h-[80%] mx-2" />

export default function ToolbarRich() {
    return (
        <>
            {/* <h1 className="text-[3rem] font-bold">With Rich Toolbars</h1> */}
            <div
                className={cn(
                    "h-[62px] flex items-center justify-center relative",
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
            </div>
            <div className="h-[62px]" />
        </>
    )
}
