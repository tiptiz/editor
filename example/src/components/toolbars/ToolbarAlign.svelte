<script lang="ts">
    import type { AlignStyle } from "@/utils/editor-presets"

    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { EditorKeymap } from "@/utils/editor-keymap"
    import { aligns } from "@/utils/editor-presets"
    import { t } from "@/utils/i18n"

    import SvgAlign from "@/icons/toolbars/SvgAlign.svelte"

    const ctx = getEditorContext()

    const handleAlign = (align: AlignStyle) => {
        const chain = ctx.editor.chain().focus()

        if (ctx.isTextAlign === align) chain.unsetTextAlign().run()
        else chain.setTextAlign(align).run()
    }

    const alignClasses = (align: AlignStyle) =>
        ctx.isTextAlign === align ? "active" : ""

    const keymap = {
        left: EditorKeymap.AlignLeft,
        center: EditorKeymap.AlignCenter,
        right: EditorKeymap.AlignRight,
        justify: EditorKeymap.AlignJustify
    }
</script>

{#each aligns as align}
    <Tooltip label={$t(`Align ${align}`) + ` (${keymap[align]})`}>
        <SvgAlign class={alignClasses(align)} {align} onclick={() => handleAlign(align)}/>
    </Tooltip>
{/each}
