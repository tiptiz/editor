<script lang="ts">
    import SvgRedo from "@/components/toolbars/SvgRedo.svelte"
    import SvgUndo from "@/components/toolbars/SvgUndo.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const ctx = getEditorContext()

    const undo = () => ctx.editor.commands.undo()
    const redo = () => ctx.editor.commands.redo()
</script>

<SvgUndo onclick={undo}/>
<SvgRedo onclick={redo}/>
