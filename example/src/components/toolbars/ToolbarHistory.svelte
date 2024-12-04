<script lang="ts">
    import { getEditorContext } from "@/states/toolbar"

    import SvgRedo from "@/icons/toolbars/SvgRedo.svelte"
    import SvgUndo from "@/icons/toolbars/SvgUndo.svelte"

    const ctx = getEditorContext()

    const undo = () => ctx.editor.commands.undo()
    const redo = () => ctx.editor.commands.redo()
</script>

<SvgUndo onclick={undo}/>
<SvgRedo onclick={redo}/>
