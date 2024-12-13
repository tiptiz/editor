<script lang="ts">
    import type { AlignStyle } from "@/utils/editor-presets"

    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { aligns } from "@/utils/editor-presets"
    import { t } from "@/utils/i18n"

    import SvgAlign from "@/icons/toolbars/SvgAlign.svelte"

    const ctx = getEditorContext()

    const handleAlign = (align: AlignStyle) => {
        const chain = ctx.editor.chain().focus()

        if (ctx.isTextAlign === align) chain.unsetTextAlign().run()
        else chain.setTextAlign(align).run()
    }

    const keymap = {
        "Align left": "Mod+Shift+l",
        "Align center": "Mod+Shift+e",
        "Align right": "Mod+Shift+r",
        "Align justify": "Mod+Shift+j"
    }
</script>

{#each aligns as align}
    <Tooltip label={$t(`Align ${align}`) + ` (${keymap[`Align ${align}`]})`}>
        <SvgAlign class={ctx.isTextAlign === align ? "active" : ""}
                  {align}
                  onclick={() => handleAlign(align)}/>
    </Tooltip>
{/each}
