<script lang="ts">
    import type { HeadingLevel } from "@/utils/editor"

    import ColorPicker from "@/components/ColorPicker.svelte"
    import EditorTransactionEvent from "@/components/EditorTransactionEvent.svelte"
    import HeadingSelect from "@/components/HeadingSelect.svelte"
    import SvgTextBgStyle from "@/components/toolbars/SvgTextBgStyle.svelte"
    import SvgTextMinus from "@/components/toolbars/SvgTextMinus.svelte"
    import SvgTextPlugs from "@/components/toolbars/SvgTextPlugs.svelte"
    import SvgTextStyle from "@/components/toolbars/SvgTextStyle.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const ctx = getEditorContext()
    const editor = () => ctx.editor

    const setupHeading = (level: HeadingLevel) => {
        editor().chain().focus().toggleHeading({ level }).run()
    }
    const updateFontSize = (size: number) => {
        const editor = ctx.editor
        const { fontSize = "16px" } = editor.getAttributes("textStyle") ?? {}

        let newSize = parseInt(fontSize) + size
        if (newSize <= 4) newSize = 4
        else if (newSize >= 96) newSize = 96

        editor.chain().focus()
            .setFontSize(`${newSize}px`)
            .run()
    }

    let foreground: string | undefined
    let background: string | undefined
    const handleTextStyleTr = () => {
        foreground = editor().getAttributes("textStyle")?.color
        background = editor().getAttributes("highlight")?.color
    }
    const setFontColor = (color?: string) => {
        foreground = color
        if (color) {
            editor().chain().focus().setColor(color).run()
        } else {
            editor().chain().focus().unsetColor().run()
        }
    }
    // TODO color picker reset to normal/default
    const setBgColor = (color?: string) => {
        background = color
        if (color) {
            editor().chain().focus().setHighlight({ color }).run()
        } else {
            editor().chain().focus().unsetHighlight().run()
        }
    }
</script>

<EditorTransactionEvent handler={handleTextStyleTr}/>
<SvgTextMinus onclick={() => updateFontSize(-2)}/>
<SvgTextPlugs onclick={() => updateFontSize(2)}/>
<HeadingSelect class={ctx.isHeading ? "active" : ""}
               level={ctx.isHeading}
               onselect={setupHeading}/>
<ColorPicker onselect={setFontColor}>
    <SvgTextStyle color={foreground}/>
</ColorPicker>
<ColorPicker onselect={setBgColor}>
    <SvgTextBgStyle color={background}/>
</ColorPicker>
