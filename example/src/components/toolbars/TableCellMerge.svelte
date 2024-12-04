<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import SvgTableCellMerge from "@/icons/toolbars/SvgTableCellMerge.svelte"

    const ctx = getEditorContext()
    const mergeCells = () => {
        ctx.editor.chain().focus().mergeCells().run()
    }
</script>

<Tooltip label="merge table cells">
    <SvgTableCellMerge width="16" height="16" onclick={mergeCells}/>
</Tooltip>
