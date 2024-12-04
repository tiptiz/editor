<script lang="ts">
    import ToolbarButton from "@/components/ToolbarButton.svelte"
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import SvgTableCellMerge from "@/icons/toolbars/SvgTableCellMerge.svelte"

    const ctx = getEditorContext()
    const mergeCells = () => {
        ctx.editor.chain().focus().mergeCells().run()
    }
</script>

<Tooltip label="merge table cells">
    <ToolbarButton disabled={!ctx.isTable} onclick={mergeCells}>
        <SvgTableCellMerge/>
    </ToolbarButton>
</Tooltip>
