<script lang="ts">
    import Hr from "@/components/Hr.svelte"
    import SvgBrush from "@/components/toolbars/SvgBrush.svelte"
    import SvgClear from "@/components/toolbars/SvgClear.svelte"
    import SvgRedo from "@/components/toolbars/SvgRedo.svelte"
    import SvgUndo from "@/components/toolbars/SvgUndo.svelte"
    import { getToolbarContext } from "@/states/toolbar"

    const state = getToolbarContext()
    const editor = () => state.editor

    const undo = () => editor().commands.undo()
    const redo = () => editor().commands.redo()
    const clear = () => {
        editor().chain().focus().clearNodes().run()
        editor().chain().focus().selectParentNode().unsetAllMarks().run()
    }
</script>

<SvgUndo onclick={undo}/>
<SvgRedo onclick={redo}/>
<Hr class="h-2/5 mx-2"/>
<SvgClear onclick={clear}/>
<SvgBrush/>
