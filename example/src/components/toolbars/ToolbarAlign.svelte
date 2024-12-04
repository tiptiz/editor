<script lang="ts">
    import type { AlignStyle } from "@/utils/editor-presets"

    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { aligns } from "@/utils/editor-presets"

    import SvgAlign from "@/icons/toolbars/SvgAlign.svelte"

    const ctx = getEditorContext()

    const handleAlign = (align: AlignStyle) => {
        const chain = ctx.editor.chain().focus()

        if (ctx.isTextAlign === align) chain.unsetTextAlign().run()
        else chain.setTextAlign(align).run()
    }
</script>

{#each aligns as align}
    <Tooltip label={`text align ${align}`}>
        <SvgAlign class={ctx.isTextAlign === align ? "active" : ""}
                  {align}
                  onclick={() => handleAlign(align)}/>
    </Tooltip>
{/each}
