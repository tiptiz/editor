<script lang="ts">
    import SvgBold from "@/components/toolbars/SvgBold.svelte"
    import SvgItalic from "@/components/toolbars/SvgItalic.svelte"
    import SvgStrike from "@/components/toolbars/SvgStrike.svelte"
    import SvgSubscript from "@/components/toolbars/SvgSubscript.svelte"
    import SvgSuperscript from "@/components/toolbars/SvgSuperscript.svelte"
    import SvgUnderline from "@/components/toolbars/SvgUnderline.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const ctx = getEditorContext()

    const handleToggle = (name: string) => () => {
        const editor = ctx.editor
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

    const toggleSup = () => ctx.editor.chain().focus().toggleSuperscript().run()
    const toggleSub = () => ctx.editor.chain().focus().toggleSubscript().run()
</script>

<SvgBold class={ctx.isBold ? "active" : ""} onclick={toggleBold}/>
<SvgItalic class={ctx.isItalic ? "active" : ""} onclick={toggleItalic}/>
<SvgStrike class={ctx.isStrike ? "active" : ""} onclick={toggleStrike}/>
<SvgUnderline class={ctx.isUnderline ? "active" : ""} onclick={handleToggle("underline")}/>
<SvgSuperscript class={ctx.isSup ? "active" : "" } onclick={toggleSup}/>
<SvgSubscript class={ctx.isSub ? "active" : "" } onclick={toggleSub}/>
