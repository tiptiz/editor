<script lang="ts">
    import type { TableInsertTarget } from "@/utils/editor-presets"

    import ToolbarButton from "@/components/ToolbarButton.svelte"
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { tableInsertTargets } from "@/utils/editor-presets"
    import { t } from "@/utils/i18n"

    import SvgTableInsert from "@/icons/toolbars/SvgTableInsert.svelte"

    const ctx = getEditorContext()
    const handleInsert = (target: TableInsertTarget) => {
        const chain = ctx.editor.chain().focus()
        switch (target) {
            case "col before":
                chain.addColumnBefore().run()
                break
            case "col after":
                chain.addColumnAfter().run()
                break
            case "row above":
                chain.addRowBefore().run()
                break
            case "row below":
                chain.addRowAfter().run()
                break
        }
    }
</script>

{#snippet tableInsert(target: TableInsertTarget)}
    <Tooltip label={$t(`Insert a ${target}`)}>
        <ToolbarButton disabled={!ctx.isTable} onclick={() => handleInsert(target)}>
            <SvgTableInsert target={target} />
        </ToolbarButton>
    </Tooltip>
{/snippet}
{#each tableInsertTargets as target}
    {@render tableInsert(target)}
{/each}
