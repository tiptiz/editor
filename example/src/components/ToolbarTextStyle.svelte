<script lang="ts">
    import type { HeadingLevel } from "@/utils/editor"

    import SelectHeadingLevel from "@/components/SelectHeadingLevel.svelte"
    import SvgTextMinus from "@/components/toolbars/SvgTextMinus.svelte"
    import SvgTextPlugs from "@/components/toolbars/SvgTextPlugs.svelte"
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

        editor.chain().focus().setFontSize(`${newSize}px`).run()
    }
</script>

<SvgTextMinus onclick={() => updateFontSize(-2)}/>
<SvgTextPlugs onclick={() => updateFontSize(2)}/>
<SelectHeadingLevel class={ctx.isHeading ? "active" : ""}
                    level={ctx.isHeading}
                    onselect={setupHeading}/>
