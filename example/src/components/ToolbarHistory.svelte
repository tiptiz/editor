<script lang="ts">
    import SvgBrush from "@/components/toolbars/SvgBrush.svelte"
    import SvgClear from "@/components/toolbars/SvgClear.svelte"
    import SvgRedo from "@/components/toolbars/SvgRedo.svelte"
    import SvgUndo from "@/components/toolbars/SvgUndo.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const state = getEditorContext()
    const editor = () => state.editor

    const undo = () => editor().commands.undo()
    const redo = () => editor().commands.redo()
    const clear = () => {
        editor().chain().focus().clearNodes().run()
        editor().chain().focus().unsetAllMarks().run()
    }
    // TODO thinking clear is one of feature
    // 1. split node/mark, back to normal
    // 2. reset color include focused parent node/mark (current)
</script>

<SvgUndo onclick={undo}/>
<SvgRedo onclick={redo}/>
<SvgClear onclick={clear}/>
<SvgBrush class="cursor-not-allowed"/>
