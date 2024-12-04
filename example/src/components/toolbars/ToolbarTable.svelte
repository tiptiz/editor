<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import SvgTableHead from "@/icons/toolbars/SvgTableHead.svelte"
    import TableCellMerge from "@/components/toolbars/TableCellMerge.svelte"
    import TableCellSplit from "@/components/toolbars/TableCellSplit.svelte"
    import TableCreateNew from "@/components/toolbars/TableCreateNew.svelte"
    import TableInsertNew from "@/components/toolbars/TableInsertNew.svelte"

    const ctx = getEditorContext()

    const positions = ["left", "top"] as const
    type Position = typeof positions[number]

    const handleToggleHeader = (position: Position) => {
        const chain = ctx.editor.chain().focus()
        if (position === "left") chain.toggleHeaderColumn().run()
        else if (position === "top") chain.toggleHeaderRow().run()
    }
</script>

<TableCreateNew/>
<TableInsertNew/>
<TableCellMerge/>
<TableCellSplit/>
{#snippet header(position: Position)}
    <Tooltip label={`toggle table header ${position}`}>
        <SvgTableHead position={position} onclick={() => handleToggleHeader(position)}/>
    </Tooltip>
{/snippet}
{#each positions as pos}
    {@render header(pos)}
{/each}
