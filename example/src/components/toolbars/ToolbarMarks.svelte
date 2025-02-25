<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { EditorKeymap } from "@/utils/editor-keymap"
    import { t } from "@/utils/i18n"

    import SvgBold from "@/icons/toolbars/SvgBold.svelte"
    import SvgItalic from "@/icons/toolbars/SvgItalic.svelte"
    import SvgStrike from "@/icons/toolbars/SvgStrike.svelte"
    import SvgSubscript from "@/icons/toolbars/SvgSubscript.svelte"
    import SvgSuperscript from "@/icons/toolbars/SvgSuperscript.svelte"
    import SvgUnderline from "@/icons/toolbars/SvgUnderline.svelte"

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

<Tooltip label={$t("Bold") + ` (${EditorKeymap.Bold})`}>
    <SvgBold class={ctx.isBold ? "active" : ""} onclick={toggleBold}/>
</Tooltip>
<Tooltip label={$t("Italic") + ` (${EditorKeymap.Italic})`}>
    <SvgItalic class={ctx.isItalic ? "active" : ""} onclick={toggleItalic}/>
</Tooltip>
<Tooltip label={$t("Strikethrough") + ` (${EditorKeymap.Strike})`}>
    <SvgStrike class={ctx.isStrike ? "active" : ""} onclick={toggleStrike}/>
</Tooltip>
<Tooltip label={$t("Underline") + ` (${EditorKeymap.Underline})`}>
    <SvgUnderline class={ctx.isUnderline ? "active" : ""} onclick={handleToggle("underline")}/>
</Tooltip>
<Tooltip label={$t("Superscript") + ` (${EditorKeymap.Superscript})`}>
    <SvgSuperscript class={ctx.isSup ? "active" : "" } onclick={toggleSup}/>
</Tooltip>
<Tooltip label={$t("Subscript") + ` (${EditorKeymap.Subscript})`}>
    <SvgSubscript class={ctx.isSub ? "active" : "" } onclick={toggleSub}/>
</Tooltip>
