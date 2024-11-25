<script lang="ts">
    import type { HeadingLevel } from "@/utils/editor"

    import HeadingSelect from "@/components/HeadingSelect.svelte"
    import Hr from "@/components/Hr.svelte"
    import SvgBold from "@/components/toolbars/SvgBold.svelte"
    import SvgBrush from "@/components/toolbars/SvgBrush.svelte"
    import SvgClear from "@/components/toolbars/SvgClear.svelte"
    import SvgItalic from "@/components/toolbars/SvgItalic.svelte"
    import SvgRedo from "@/components/toolbars/SvgRedo.svelte"
    import SvgStrike from "@/components/toolbars/SvgStrike.svelte"
    import SvgTextBgStyle from "@/components/toolbars/SvgTextBgStyle.svelte"
    import SvgTextMinus from "@/components/toolbars/SvgTextMinus.svelte"
    import SvgTextPlugs from "@/components/toolbars/SvgTextPlugs.svelte"
    import SvgTextStyle from "@/components/toolbars/SvgTextStyle.svelte"
    import SvgUnderline from "@/components/toolbars/SvgUnderline.svelte"
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
    // TODO find a way, select node by focus
    const handleToggle = (name: string) => () => {
        const editor = state.editor
        const { from, to } = editor.state.selection

        if (from !== to) {
            editor.chain().focus().toggleMark(name).run()
        } else {
            if (editor.isActive(name)) {
                editor.chain().focus().unsetMark(name, { extendEmptyMarkRange: true }).run()
            } else {
                editor.chain().focus().selectParentNode().setMark(name).run()
            }
        }
    }
    const toggleBold = handleToggle("bold")
    const toggleItalic = handleToggle("italic")
    const toggleStrike = handleToggle("strike")

    const setupHeading = (level: HeadingLevel) => {
        editor().chain().focus().toggleHeading({ level }).run()
    }
</script>

<div class="toolbar h-[52px] flex items-center justify-center gap-1.5">
    <SvgUndo onclick={undo}/>
    <SvgRedo onclick={redo}/>
    <Hr class="h-2/5 mx-2"/>
    <SvgClear onclick={clear}/>
    <SvgBrush/>
    <Hr class="h-2/5 mx-2"/>
    <SvgTextMinus/>
    <SvgTextPlugs/>
    <HeadingSelect class={state.isHeading ? "active" : ""}
                   level={state.isHeading}
                   onselect={setupHeading}/>
    <SvgTextStyle/>
    <SvgTextBgStyle/>
    <Hr class="h-2/5 mx-2"/>
    <SvgBold class={state.isBold ? "active" : ""} onclick={toggleBold}/>
    <SvgItalic class={state.isItalic ? "active" : ""} onclick={toggleItalic}/>
    <SvgStrike class={state.isStrike ? "active" : ""} onclick={toggleStrike}/>
    <SvgUnderline class={state.isUnderline ? "active" : ""} onclick={handleToggle("underline")}/>
    <Hr class="h-2/5 mx-2"/>
</div>
<style lang="scss">
    :global(.dark) {
        .toolbar {
            --font-color: #e6e6e6;
        }
    }

    .toolbar {
        --font-color: #4d4d4d;

        :global(svg) {
            color: var(--font-color);
            font-size: 20px;

            &:hover {
                cursor: pointer;
            }
        }

        :global(svg.active) {
            color: hsl(var(--primary));
        }

        :global(.active svg) {
            color: hsl(var(--primary));
        }
    }
</style>
