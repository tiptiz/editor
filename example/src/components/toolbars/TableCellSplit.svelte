<script lang="ts">
    import ToolbarButton from "@/components/ToolbarButton.svelte"
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import SvgTableCellSplit from "@/icons/toolbars/SvgTableCellSplit.svelte"

    const ctx = getEditorContext()
    const splitCell = () => {
        ctx.editor.chain().focus().splitCell().run()
    }
</script>

<Tooltip label="split table cells">
    <ToolbarButton disabled={!ctx.isTable} onclick={splitCell}>
        <SvgTableCellSplit/>
    </ToolbarButton>
</Tooltip>
