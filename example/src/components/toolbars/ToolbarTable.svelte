<script lang="ts">
    import ToolbarButton from "@/components/ToolbarButton.svelte"
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import SvgTable from "@/icons/toolbars/SvgTable.svelte"
    import SvgTableColDelete from "@/icons/toolbars/SvgTableColDelete.svelte"
    import SvgTableHead from "@/icons/toolbars/SvgTableHead.svelte"
    import SvgTableRemove from "@/icons/toolbars/SvgTableRemove.svelte"
    import SvgTableRowDelete from "@/icons/toolbars/SvgTableRowDelete.svelte"
    import SvgTableToggleCell from "@/icons/toolbars/SvgTableToggleCell.svelte"
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
    const fixTable = () => ctx.editor.chain().focus().fixTables().run()
    const deleteCol = () => ctx.editor.chain().focus().deleteColumn().run()
    const deleteRow = () => ctx.editor.chain().focus().deleteRow().run()
    const toggleCell = () => ctx.editor.chain().focus().toggleHeaderCell().run()
    const deleteTable = () => ctx.editor.chain().focus().deleteTable().run()
</script>

<Tooltip label="insert new table">
    <TableCreateNew/>
</Tooltip>

<TableInsertNew/>

<Tooltip label="delete column">
    <SvgTableColDelete onclick={deleteCol}/>
</Tooltip>
<Tooltip label="delete row">
    <SvgTableRowDelete onclick={deleteRow}/>
</Tooltip>

<Tooltip label="delete table">
    <ToolbarButton disabled={!ctx.isTable} onclick={deleteTable}>
        <SvgTableRemove/>
    </ToolbarButton>
</Tooltip>
<Tooltip label="fix table">
    <ToolbarButton disabled={!ctx.isTable} onclick={fixTable}>
        <SvgTable class={ctx.isTable ? "active" : ""}/>
    </ToolbarButton>
</Tooltip>

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

<Tooltip label="toggle cell as header">
    <SvgTableToggleCell onclick={toggleCell}/>
</Tooltip>
