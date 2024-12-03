<script lang="ts">
    import ColorPicker from "@/components/ColorPicker.svelte"
    import EditorTransactionEvent from "@/components/EditorTransactionEvent.svelte"
    import SvgTextBgStyle from "@/components/toolbars/SvgTextBgStyle.svelte"
    import SvgTextStyle from "@/components/toolbars/SvgTextStyle.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const ctx = getEditorContext()

    let foreground: string | undefined
    let background: string | undefined

    const handleTextStyleTr = () => {
        foreground = ctx.editor.getAttributes("textStyle")?.color
        background = ctx.editor.getAttributes("highlight")?.color
    }

    const setFontColor = (color?: string) => {
        foreground = color
        if (color) {
            ctx.editor.chain().focus().setColor(color).run()
        } else {
            ctx.editor.chain().focus().unsetColor().run()
        }
    }
    const setBgColor = (color?: string) => {
        background = color
        if (color) {
            ctx.editor.chain().focus().setHighlight({ color }).run()
        } else {
            ctx.editor.chain().focus().unsetHighlight().run()
        }
    }
</script>
<EditorTransactionEvent handler={handleTextStyleTr}/>
<ColorPicker onselect={setFontColor}>
    <SvgTextStyle color={foreground}/>
</ColorPicker>
<ColorPicker onselect={setBgColor}>
    <SvgTextBgStyle color={background}/>
</ColorPicker>
