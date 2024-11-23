<script lang="ts">
    import SvgBold from "@/components/toolbars/SvgBold.svelte"
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
    const toggleBold = () => {
        if (state.isBold) {
            editor().chain().focus().unsetMark("bold", { extendEmptyMarkRange: true }).run()
        } else {
            editor().chain().focus().selectParentNode().setMark("bold").run()
        }
    }
</script>

<div class="toolbar h-[52px] flex items-center justify-center gap-1">
    <SvgUndo onclick={undo}/>
    <SvgRedo onclick={redo}/>
    <SvgClear onclick={clear}/>
    <SvgBrush/>
    <SvgBold class={state.isBold ? "active" : ""} onclick={toggleBold}/>
</div>
<style lang="scss">
    :global(.dark) {
        .toolbar {
            --font-color: #e6e6e6;
        }
    }

    .toolbar {
        --font-color: #4d4d4d;

        :global(svg.active) {
            color: hsl(var(--primary));
        }

        :global(svg) {
            color: var(--font-color);
            font-size: 20px;

            &:hover {
                cursor: pointer;
            }
        }
    }

</style>
