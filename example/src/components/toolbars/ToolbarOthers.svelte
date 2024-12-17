<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { EditorKeymap } from "@/utils/editor-keymap"
    import { t } from "@/utils/i18n"

    import SvgBlockquote from "@/icons/toolbars/SvgBlockquote.svelte"
    import SvgCodeBlock from "@/icons/toolbars/SvgCodeBlock.svelte"
    import InsertImage from "@/components/toolbars/InsertImage.svelte"
    import SelectEmojis from "@/components/toolbars/SelectEmojis.svelte"
    import SelectHorizontalRules from "@/components/toolbars/SelectHorizontalRules.svelte"

    const ctx = getEditorContext()
    const blockquote = () => ctx.editor.chain().focus().toggleBlockquote().run()
    const addCodeBlock = () => {
        const selection = ctx.editor.state.selection

        if (selection.empty) {
            ctx.editor.chain().focus().toggleCodeBlock().run()
        } else {
            ctx.editor.chain().focus().toggleMark("code").run()
        }
    }
</script>

<SelectHorizontalRules/>
<Tooltip label={$t("Blockquote") + ` (${EditorKeymap.Blockquote})`}>
    <SvgBlockquote class={ctx.isBlockquote ? "active" : ""} onclick={blockquote}/>
</Tooltip>
<Tooltip label={$t("Pick a emoji")}>
    <SelectEmojis/>
</Tooltip>
<Tooltip label={$t("Toggle/Insert code block") + ` (${EditorKeymap.CodeBlock})`}>
    <SvgCodeBlock class={ctx.isCodeBlock ? "active" : ""} onclick={addCodeBlock}/>
</Tooltip>
<Tooltip label={$t("Insert image")}>
    <InsertImage/>
</Tooltip>
