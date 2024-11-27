<script lang="ts">
    import SvgBold from "@/components/toolbars/SvgBold.svelte"
    import SvgItalic from "@/components/toolbars/SvgItalic.svelte"
    import SvgStrike from "@/components/toolbars/SvgStrike.svelte"
    import SvgUnderline from "@/components/toolbars/SvgUnderline.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const state = getEditorContext()

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
</script>

<SvgBold class={state.isBold ? "active" : ""} onclick={toggleBold}/>
<SvgItalic class={state.isItalic ? "active" : ""} onclick={toggleItalic}/>
<SvgStrike class={state.isStrike ? "active" : ""} onclick={toggleStrike}/>
<SvgUnderline class={state.isUnderline ? "active" : ""} onclick={handleToggle("underline")}/>
