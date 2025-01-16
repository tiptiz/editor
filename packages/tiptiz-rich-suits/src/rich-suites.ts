import { Extension, type Mark, type Node } from "@tiptap/core"
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
import BulletList, { type BulletListOptions } from "tiptap-extension-bullet-list"
import CodeBlockShiki, { type CodeBlockShikiOptions } from "tiptap-extension-code-block-shiki"
import FontSize, { type FontSizeOptions } from "tiptap-extension-font-size"
import HardBreak from "tiptap-extension-hard-break"
import Heading, { type HeadingOptions } from "tiptap-extension-heading"
import HorizontalRules, { type HorizontalOptions } from "tiptap-extension-horizontal-rules"
import Indent from "tiptap-extension-indent"
import LineHeight from "tiptap-extension-line-height"
import Margin from "tiptap-extension-margin"
import TrailingNode, { type TrailingNodeOptions } from "tiptap-extension-trailing-node"

type SuiteOption<T> = false | Partial<T> | ((presets?: Partial<T>) => Partial<T>)

function withPreConfigure<T, S>(mark: Mark<T, S>, presets: Partial<T>, options?: SuiteOption<T>): Mark<T, S> | null
function withPreConfigure<T, S>(node: Node<T, S>, presets: Partial<T>, options?: SuiteOption<T>): Node<T, S> | null
function withPreConfigure<T, S>(extension: Extension<T, S>, presets: Partial<T>, options?: SuiteOption<T>): Extension<T, S> | null
function withPreConfigure<T extends {
    configure: (this: T, ...args: any[]) => T
}>(extension: T, presets?: any, options?: any): T | null {
    if (options === false) return null
    else if (typeof options === "function")
        return extension.configure(options(presets))
    else if (options)
        return extension.configure(options)
    else
        return extension.configure(presets)
}

export interface RichSuitesOptions {
    Blockquote?: SuiteOption<BlockquoteOptions>
    Bold?: SuiteOption<BoldOptions>
    Code?: SuiteOption<CodeOptions>
    Color?: SuiteOption<ColorOptions>
    FontFamily?: SuiteOption<FontFamilyOptions>
    Highlight?: SuiteOption<HighlightOptions>
    Image?: SuiteOption<ImageOptions>
    Italic?: SuiteOption<ItalicOptions>
    Link?: SuiteOption<LinkOptions>
    ListItem?: SuiteOption<ListItemOptions>
    Paragraph?: SuiteOption<ParagraphOptions>
    Placeholder?: SuiteOption<PlaceholderOptions>
    Strike?: SuiteOption<StrikeOptions>
    Sub?: SuiteOption<SubscriptExtensionOptions>
    Sup?: SuiteOption<SuperscriptExtensionOptions>
    Table?: SuiteOption<TableOptions>
    TableCell?: SuiteOption<TableCellOptions>
    TableHeader?: SuiteOption<TableHeaderOptions>
    TableRow?: SuiteOption<TableRowOptions>
    TaskListItem?: SuiteOption<TaskItemOptions>
    TaskList?: SuiteOption<TaskListOptions>
    Text?: SuiteOption<{}>
    TextAlign?: SuiteOption<TextAlignOptions>
    TextStyle?: SuiteOption<TextStyleOptions>
    Underline?: SuiteOption<UnderlineOptions>
    BulletList?: SuiteOption<BulletListOptions>
    CodeBlockShiki?: SuiteOption<CodeBlockShikiOptions>
    FontSize?: SuiteOption<FontSizeOptions>
    HardBreak?: SuiteOption<{}>
    Heading?: SuiteOption<HeadingOptions>
    HorizontalRules?: SuiteOption<HorizontalOptions>
    Indent?: SuiteOption<{}>
    LineHeight?: SuiteOption<{}>
    Margin?: SuiteOption<{}>
    TrailingNode?: SuiteOption<TrailingNodeOptions>
}

/**
 * @example
 * import Document from "@tiptap/extension-document"
 * import TiptizSuites from "@tiptiz/rich-suites"
 *
 * const editor = new Editor({
 *     extensions: [
 *         Document,
 *         TiptizSuites
 *     ]
 * })
 * */
export const RichSuites = Extension.create<RichSuitesOptions>({
    name: "tiptiz-rich-suites",
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
            withPreConfigure(Blockquote, {}, this.options.Blockquote),
            withPreConfigure(_Bold, {}, this.options.Bold),
            withPreConfigure(Code, {
                HTMLAttributes: { class: "inline-code" }
            }, this.options.Code),
            withPreConfigure(Color, {}, this.options.Color),
            withPreConfigure(FontFamily, {}, this.options.FontFamily),
            withPreConfigure(Highlight, {
                multicolor: true
            }, this.options.Highlight),
            withPreConfigure(Image, {}, this.options.Image),
            withPreConfigure(_Italic, {}, this.options.Italic),
            withPreConfigure(Link, {}, this.options.Link),
            withPreConfigure(ListItem, {}, this.options.ListItem),
            withPreConfigure(Paragraph, {}, this.options.Paragraph),
            withPreConfigure(Placeholder, {}, this.options.Placeholder),
            withPreConfigure(_Strike, {}, this.options.Strike),
            withPreConfigure(Sub, {}, this.options.Sub),
            withPreConfigure(Sup, {}, this.options.Sup),
            withPreConfigure(Table, {
                resizable: true,
                allowTableNodeSelection: true
            }, this.options.Table),
            withPreConfigure(TableCell, {}, this.options.TableCell),
            withPreConfigure(TableHeader, {}, this.options.TableHeader),
            withPreConfigure(TableRow, {}, this.options.TableRow),
            withPreConfigure(TaskListItem, { nested: true }, this.options.TaskListItem),
            withPreConfigure(TaskList, {}, this.options.TaskList),
            withPreConfigure(Text, {}, this.options.Text),
            withPreConfigure(TextAlign, {}, this.options.TextAlign),
            withPreConfigure(TextStyle, {}, this.options.TextStyle),
            withPreConfigure(Underline, {}, this.options.Underline),
            withPreConfigure(BulletList, {}, this.options.BulletList),
            withPreConfigure(CodeBlockShiki, {}, this.options.CodeBlockShiki),
            withPreConfigure(FontSize, {}, this.options.FontSize),
            withPreConfigure(HardBreak, {}, this.options.HardBreak),
            withPreConfigure(Heading, {
                HTMLAttributes: {
                    all: { style: "margin: 5px 0;" }
                }
            }, this.options.Heading),
            withPreConfigure(HorizontalRules, {}, this.options.HorizontalRules),
            withPreConfigure(Indent, {}, this.options.Indent),
            withPreConfigure(LineHeight, {}, this.options.LineHeight),
            withPreConfigure(Margin, {}, this.options.Margin),
            withPreConfigure(TrailingNode, {}, this.options.TrailingNode)
        ]
    }
})
