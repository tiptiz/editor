import { Extension } from "@tiptap/core"
import Blockquote, { type BlockquoteOptions } from "@tiptap/extension-blockquote"
import Bold, { type BoldOptions } from "@tiptap/extension-bold"
import Code, { type CodeOptions } from "@tiptap/extension-code"
import Color, { type ColorOptions } from "@tiptap/extension-color"
import FontFamily, { type FontFamilyOptions } from "@tiptap/extension-font-family"
import Highlight, { type HighlightOptions } from "@tiptap/extension-highlight"
import Image, { type ImageOptions } from "@tiptap/extension-image"
import Italic, { type ItalicOptions } from "@tiptap/extension-italic"
import Link, { type LinkOptions } from "@tiptap/extension-link"
import ListItem, { type ListItemOptions } from "@tiptap/extension-list-item"
import Paragraph, { type ParagraphOptions } from "@tiptap/extension-paragraph"
import Placeholder, { type PlaceholderOptions } from "@tiptap/extension-placeholder"
import Strike, { type StrikeOptions } from "@tiptap/extension-strike"
import Sub, { type SubscriptExtensionOptions } from "@tiptap/extension-subscript"
import Sup, { type SuperscriptExtensionOptions } from "@tiptap/extension-superscript"
import Table, { type TableOptions } from "@tiptap/extension-table"
import TableCell, { type TableCellOptions } from "@tiptap/extension-table-cell"
import TableHeader, { type TableHeaderOptions } from "@tiptap/extension-table-header"
import TableRow, { type TableRowOptions } from "@tiptap/extension-table-row"
import TaskListItem, { type TaskItemOptions } from "@tiptap/extension-task-item"
import TaskList, { type TaskListOptions } from "@tiptap/extension-task-list"
import Text from "@tiptap/extension-text"
import TextAlign, { type TextAlignOptions } from "@tiptap/extension-text-align"
import TextStyle, { type TextStyleOptions } from "@tiptap/extension-text-style"
import Underline, { type UnderlineOptions } from "@tiptap/extension-underline"
import BulletList, { type BulletListOptions } from "tiptiz-extension-bullet-list"
import CodeBlockShiki, { type CodeBlockShikiOptions } from "tiptiz-extension-code-block-shiki"
import FontSize, { type FontSizeOptions } from "tiptiz-extension-font-size"
import HardBreak from "tiptiz-extension-hard-break"
import Heading, { type HeadingOptions } from "tiptiz-extension-heading"
import HorizontalRules, { type HorizontalOptions } from "tiptiz-extension-horizontal-rules"
import Indent from "tiptiz-extension-indent"
import LineHeight from "tiptiz-extension-line-height"
import Margin from "tiptiz-extension-margin"
import TrailingNode, { type TrailingNodeOptions } from "tiptiz-extension-trailing-node"

import { type AnyExtension, type PreConfigOption, withPreConfigure } from "../utils/extension"

export interface FullKitOptions {
    Blockquote?: PreConfigOption<BlockquoteOptions>
    Bold?: PreConfigOption<BoldOptions>
    Code?: PreConfigOption<CodeOptions>
    Color?: PreConfigOption<ColorOptions>
    FontFamily?: PreConfigOption<FontFamilyOptions>
    Highlight?: PreConfigOption<HighlightOptions>
    Image?: PreConfigOption<ImageOptions>
    Italic?: PreConfigOption<ItalicOptions>
    Link?: PreConfigOption<LinkOptions>
    ListItem?: PreConfigOption<ListItemOptions>
    Paragraph?: PreConfigOption<ParagraphOptions>
    Placeholder?: PreConfigOption<PlaceholderOptions>
    Strike?: PreConfigOption<StrikeOptions>
    Sub?: PreConfigOption<SubscriptExtensionOptions>
    Sup?: PreConfigOption<SuperscriptExtensionOptions>
    Table?: PreConfigOption<TableOptions>
    TableCell?: PreConfigOption<TableCellOptions>
    TableHeader?: PreConfigOption<TableHeaderOptions>
    TableRow?: PreConfigOption<TableRowOptions>
    TaskListItem?: PreConfigOption<TaskItemOptions>
    TaskList?: PreConfigOption<TaskListOptions>
    Text?: PreConfigOption<{}>
    TextAlign?: PreConfigOption<TextAlignOptions>
    TextStyle?: PreConfigOption<TextStyleOptions>
    Underline?: PreConfigOption<UnderlineOptions>
    BulletList?: PreConfigOption<BulletListOptions>
    CodeBlockShiki?: PreConfigOption<CodeBlockShikiOptions>
    FontSize?: PreConfigOption<FontSizeOptions>
    HardBreak?: PreConfigOption<{}>
    Heading?: PreConfigOption<HeadingOptions>
    HorizontalRules?: PreConfigOption<HorizontalOptions>
    Indent?: PreConfigOption<{}>
    LineHeight?: PreConfigOption<{}>
    Margin?: PreConfigOption<{}>
    TrailingNode?: PreConfigOption<TrailingNodeOptions>
}

/**
 * Full-featured rich text editor kit with all available extensions
 *
 * @example
 * import Document from "@tiptap/extension-document"
 * import { FullKit } from "@tiptiz/editor"
 *
 * const editor = new Editor({
 *     extensions: [
 *         Document,
 *         FullKit
 *     ]
 * })
 */
export const FullKit = Extension.create<FullKitOptions>({
    name: "tiptiz-full-kit",
    addExtensions() {
        const _Bold = Bold.extend({
            renderHTML: ({ HTMLAttributes }) => ["b", HTMLAttributes, 0]
        })
        const _Italic = Italic.extend({
            renderHTML: ({ HTMLAttributes }) => ["i", HTMLAttributes, 0]
        })
        const _Strike = Strike.extend({
            addKeyboardShortcuts() {
                return {
                    "Mod-Shift-X": () => this.editor.commands.toggleStrike()
                }
            }
        })

        return [
            withPreConfigure(Blockquote, this.options.Blockquote),
            withPreConfigure(_Bold, this.options.Bold),
            withPreConfigure(Code, this.options.Code, {
                HTMLAttributes: { class: "inline-code" }
            }),
            withPreConfigure(Color, this.options.Color),
            withPreConfigure(FontFamily, this.options.FontFamily),
            withPreConfigure(Highlight, this.options.Highlight, {
                multicolor: true
            }),
            withPreConfigure(Image, this.options.Image),
            withPreConfigure(_Italic, this.options.Italic),
            withPreConfigure(Link, this.options.Link),
            withPreConfigure(ListItem, this.options.ListItem),
            withPreConfigure(Paragraph, this.options.Paragraph),
            withPreConfigure(Placeholder, this.options.Placeholder),
            withPreConfigure(_Strike, this.options.Strike),
            withPreConfigure(Sub, this.options.Sub),
            withPreConfigure(Sup, this.options.Sup),
            withPreConfigure(Table, this.options.Table, {
                resizable: true,
                allowTableNodeSelection: true
            }),
            withPreConfigure(TableCell, this.options.TableCell),
            withPreConfigure(TableHeader, this.options.TableHeader),
            withPreConfigure(TableRow, this.options.TableRow),
            withPreConfigure(TaskListItem, this.options.TaskListItem, { nested: true }),
            withPreConfigure(TaskList, this.options.TaskList),
            withPreConfigure(Text, this.options.Text),
            withPreConfigure(TextAlign, this.options.TextAlign),
            withPreConfigure(TextStyle, this.options.TextStyle),
            withPreConfigure(Underline, this.options.Underline),
            withPreConfigure(BulletList, this.options.BulletList),
            withPreConfigure(CodeBlockShiki, this.options.CodeBlockShiki),
            withPreConfigure(FontSize, this.options.FontSize),
            withPreConfigure(HardBreak, this.options.HardBreak),
            withPreConfigure(Heading, this.options.Heading, {
                HTMLAttributes: {
                    all: { style: "margin: 5px 0;" }
                }
            }),
            withPreConfigure(HorizontalRules, this.options.HorizontalRules),
            withPreConfigure(Indent, this.options.Indent),
            withPreConfigure(LineHeight, this.options.LineHeight),
            withPreConfigure(Margin, this.options.Margin),
            withPreConfigure(TrailingNode, this.options.TrailingNode)
        ] as AnyExtension[]
    }
})
