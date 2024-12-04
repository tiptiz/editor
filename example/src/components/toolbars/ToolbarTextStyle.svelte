<script lang="ts">
    import { getEditorContext } from "@/states/toolbar"

    import SvgTextMinus from "@/icons/toolbars/SvgTextMinus.svelte"
    import SvgTextPlugs from "@/icons/toolbars/SvgTextPlugs.svelte"

    const ctx = getEditorContext()

    const updateFontSize = (size: number) => {
        const editor = ctx.editor

        // if textStyle has style attribute, other style property must be null if not set
        let fontSize = editor.getAttributes("textStyle")?.fontSize || "16px"

        let newSize = parseInt(fontSize, 10) + size
        if (newSize <= 4) newSize = 4
        else if (newSize >= 96) newSize = 96

        editor.chain().focus().setFontSize(`${newSize}px`).run()
    }
</script>

<SvgTextMinus onclick={() => updateFontSize(-2)}/>
<SvgTextPlugs onclick={() => updateFontSize(2)}/>
