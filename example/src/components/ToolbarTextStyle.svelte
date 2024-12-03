<script lang="ts">
    import SelectFontFamily from "@/components/SelectFontFamily.svelte"
    import SelectFontSize from "@/components/SelectFontSize.svelte"
    import SvgTextMinus from "@/components/toolbars/SvgTextMinus.svelte"
    import SvgTextPlugs from "@/components/toolbars/SvgTextPlugs.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const ctx = getEditorContext()

    const updateFontSize = (size: number) => {
        const editor = ctx.editor
        const { fontSize = "16px" } = editor.getAttributes("textStyle") ?? {}

        let newSize = parseInt(fontSize) + size
        if (newSize <= 4) newSize = 4
        else if (newSize >= 96) newSize = 96

        editor.chain().focus().setFontSize(`${newSize}px`).run()
    }
</script>

<SelectFontFamily />
<SelectFontSize />
<SvgTextMinus onclick={() => updateFontSize(-2)} wdith="18" height="18"/>
<SvgTextPlugs onclick={() => updateFontSize(2)} wdith="18" height="18"/>
