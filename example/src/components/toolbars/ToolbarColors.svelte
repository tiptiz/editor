<script lang="ts">
    import ColorPicker from "@/components/ColorPicker.svelte"
    import EditorTransactionEvent from "@/components/EditorTransactionEvent.svelte"
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"

    import SvgTextBgStyle from "@/icons/toolbars/SvgTextBgStyle.svelte"
    import SvgTextStyle from "@/icons/toolbars/SvgTextStyle.svelte"

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
    <Tooltip label={$t("Pick font color")}>
        <SvgTextStyle color={foreground}/>
    </Tooltip>
</ColorPicker>
<ColorPicker onselect={setBgColor}>
    <Tooltip label={$t("Pick text background color")}>
        <SvgTextBgStyle color={background}/>
    </Tooltip>
</ColorPicker>
