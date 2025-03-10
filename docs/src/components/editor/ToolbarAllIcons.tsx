"use client"

import { Checkbox, FormControlLabel } from "@mui/material"
import { ediBrush, ediEraser, ediRedo, ediUndo } from "@tiptiz/icons"
import { ediFontSizeMinus, ediFontSizePlus } from "@tiptiz/icons"
import { ediHeading1, ediHeading2, ediHeading3, ediHeading4, ediHeading5, ediHeading6 } from "@tiptiz/icons"
import { ediHeadingDec, ediHeadingHash, ediHeadingInc } from "@tiptiz/icons"
import { ediBold, ediItalic, ediStrike, ediSubscript, ediSuperscript, ediUnderline } from "@tiptiz/icons"
import { ediColorFill, ediColorHelper, ediColorText } from "@tiptiz/icons"
import { ediAlignCenter, ediAlignJustify, ediAlignLeft, ediAlignRight } from "@tiptiz/icons"
import { ediIndentDec, ediIndentInc } from "@tiptiz/icons"
import { ediBulletList, ediCheckList, ediListCircle, ediListDisc, ediListSquare } from "@tiptiz/icons"
import { ediLiftList, ediSinkList } from "@tiptiz/icons"
import { ediBlockquote, ediCodeBlock, ediEmoji, ediHorizontalRule, ediImage } from "@tiptiz/icons"
import {
    ediTableAddColAfter,
    ediTableAddColBefore,
    ediTableAddRowAfter,
    ediTableAddRowBefore
} from "@tiptiz/icons"
import { ediTableNew, ediTableRefresh, ediTableRemove } from "@tiptiz/icons"
import { ediTableColumnRemove, ediTableMergeCells, ediTableRowRemove, ediTableSplitCell } from "@tiptiz/icons"
import { ediToggleTableHeaderCell, ediToggleTableHeaderLeft, ediToggleTableHeaderTop } from "@tiptiz/icons"
import { ediPageBreak } from "@tiptiz/icons"
import { useEffect, useState } from "react"

import IconBar from "@/components/IconBar"

const SparkLines = ({ visible }: { visible: boolean }) => visible
    ? (
        <>
            <hr className="absolute top-[6px] border-red-600/50 w-full" />
            <hr className="absolute bottom-[6.5px] border-red-600/50 w-full" />
        </>
    )
    : null

const allIcons = [
    ["ediUndo", ediUndo],
    ["ediRedo", ediRedo],
    ["ediEraser", ediEraser],
    ["ediBrush", ediBrush],
    ["ediFontSizePlus", ediFontSizePlus],
    ["ediFontSizeMinus", ediFontSizeMinus],
    ["ediHeading1", ediHeading1],
    ["ediHeading2", ediHeading2],
    ["ediHeading3", ediHeading3],
    ["ediHeading4", ediHeading4],
    ["ediHeading5", ediHeading5],
    ["ediHeading6", ediHeading6],
    ["ediHeadingInc", ediHeadingInc],
    ["ediHeadingDec", ediHeadingDec],
    ["ediHeadingHash", ediHeadingHash],
    ["ediBold", ediBold],
    ["ediItalic", ediItalic],
    ["ediUnderline", ediUnderline],
    ["ediStrike", ediStrike],
    ["ediSuperscript", ediSuperscript],
    ["ediSubscript", ediSubscript],
    // ["ediColorFill", ediColorFill],
    // ["ediColorText", ediColorText],
    // ["ediColorHelper", ediColorHelper],
    ["ediColorTextWithHelper", [ediColorText, ediColorHelper]],
    ["ediColorFillWithHelper", [ediColorFill, ediColorHelper]],
    ["ediAlignLeft", ediAlignLeft],
    ["ediAlignCenter", ediAlignCenter],
    ["ediAlignRight", ediAlignRight],
    ["ediAlignJustify", ediAlignJustify],
    ["ediIndentInc", ediIndentInc],
    ["ediIndentDec", ediIndentDec],
    ["ediBulletList", ediBulletList],
    ["ediSinkList", ediSinkList],
    ["ediLiftList", ediLiftList],
    ["ediCheckList", ediCheckList],
    ["ediHorizontalRule", ediHorizontalRule],
    ["ediBlockquote", ediBlockquote],
    ["ediEmoji", ediEmoji],
    ["ediCodeBlock", ediCodeBlock],
    ["ediImage", ediImage],
    ["ediPageBreak", ediPageBreak],
    ["ediTableNew", ediTableNew],
    ["ediTableRefresh", ediTableRefresh],
    ["ediTableRemove", ediTableRemove],
    ["EdiTableAddColBefore", ediTableAddColBefore],
    ["ediTableAddColAfter", ediTableAddColAfter],
    ["ediTableAddRowBefore", ediTableAddRowBefore],
    ["ediTableAddRowAfter", ediTableAddRowAfter],
    ["ediTableColumnRemove", ediTableColumnRemove],
    ["ediTableRowRemove", ediTableRowRemove],
    ["ediTableMergeCell", ediTableMergeCells],
    ["ediTableSplitCell", ediTableSplitCell],
    ["ediToggleTableHeaderTop", ediToggleTableHeaderTop],
    ["ediToggleTableHeaderLeft", ediToggleTableHeaderLeft],
    ["ediToggleTableCell", ediToggleTableHeaderCell],
    ["ediListCircle", ediListCircle],
    ["ediListDisc", ediListDisc],
    ["ediListSquare", ediListSquare]
] as [key: string, path: string | string[]][]

export default function ToolbarAllIcons() {
    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        setVisible(!visible)
        if (!visible) window?.localStorage?.setItem("toolbar-all-icons", "!")
        else window?.localStorage?.removeItem("toolbar-all-icons")
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            setVisible(window?.localStorage?.getItem("toolbar-all-icons") === "!")
        }
    }, [])
    return (
        <>
            <FormControlLabel
                className="select-none"
                label="View Spark Lines"
                checked={visible}
                control={<Checkbox onClick={toggleVisible} />}
            />
            <div className="flex flex-wrap relative">
                {allIcons.map(([key, path]) => (
                    <div key={key} className="relative px-1">
                        <SparkLines visible={visible} />
                        <IconBar path={path} tooltip={key} iconProps={{ size: 0.8 }} />
                    </div>
                ))}
            </div>
        </>
    )
}
