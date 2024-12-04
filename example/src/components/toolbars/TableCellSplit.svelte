<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import SvgTableCellSplit from "@/icons/toolbars/SvgTableCellSplit.svelte"

    const ctx = getEditorContext()
    const splitCell = () => {
        ctx.editor.chain().focus().splitCell().run()
    }
</script>

<Tooltip label="split table cells">
    <SvgTableCellSplit width="16" height="16" onclick={splitCell}/>
</Tooltip>
