<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import SvgRedo from "@/icons/toolbars/SvgRedo.svelte"
    import SvgUndo from "@/icons/toolbars/SvgUndo.svelte"

    const ctx = getEditorContext()

    const undo = () => ctx.editor.commands.undo()
    const redo = () => ctx.editor.commands.redo()
</script>

<Tooltip label="undo">
    <SvgUndo onclick={undo}/>
</Tooltip>
<Tooltip label="redo">
    <SvgRedo onclick={redo}/>
</Tooltip>
