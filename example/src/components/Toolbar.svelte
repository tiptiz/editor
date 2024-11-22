<script lang="ts">
    import type { Editor } from "@tiptap/core"

    import SvgBold from "@/components/toolbars/SvgBold.svelte"
    import SvgBrush from "@/components/toolbars/SvgBrush.svelte"
    import SvgClear from "@/components/toolbars/SvgClear.svelte"
    import SvgRedo from "@/components/toolbars/SvgRedo.svelte"
    import SvgUndo from "@/components/toolbars/SvgUndo.svelte"

    interface Props {
        editor: Editor
    }

    let { editor }: Props = $props()

    const undo = () => editor.commands.undo()
    const redo = () => editor.commands.redo()
    const clear = () => {
        editor.chain().focus().clearNodes().run()
        editor.chain().focus().unsetMark("inline", { extendEmptyMarkRange: true }).run()
    }
    const toggleBold = () => {
        if (editor.isActive("bold")) {
            editor.chain().focus().unsetMark("bold", { extendEmptyMarkRange: true }).run()
        } else {
            editor.chain().focus().selectParentNode().setMark("bold").run()
        }
    }
</script>

<div class="toolbar h-[52px] flex items-center justify-center gap-1">
    <SvgUndo onclick={undo}/>
    <SvgRedo onclick={redo}/>
    <SvgClear onclick={clear}/>
    <SvgBrush/>
    <SvgBold class={editor.isActive("bold") ? "active" : ""} onclick={toggleBold}/>
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
