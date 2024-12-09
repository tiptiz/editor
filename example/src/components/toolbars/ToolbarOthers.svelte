<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"

    import SvgBlockquote from "@/icons/toolbars/SvgBlockquote.svelte"
    import SvgCodeBlock from "@/icons/toolbars/SvgCodeBlock.svelte"
    import SelectEmojis from "@/components/toolbars/SelectEmojis.svelte"
    import SelectHorizontalRules from "@/components/toolbars/SelectHorizontalRules.svelte"

    const ctx = getEditorContext()
    const blockquote = () => ctx.editor.chain().focus().toggleBlockquote().run()
    const addCodeBlock = () => ctx.editor.chain().focus().toggleCodeBlock().run()
</script>

<SelectHorizontalRules/>

<div class="flex items-center gap-x-[10px]">
    <Tooltip label={$t("Blockquote")}>
        <SvgBlockquote class={ctx.isBlockquote ? "active" : ""} onclick={blockquote}/>
    </Tooltip>
    <Tooltip label={$t("Pick a emoji")}>
        <SelectEmojis/>
    </Tooltip>
    <Tooltip label={$t("Insert a code block")}>
        <SvgCodeBlock onclick={addCodeBlock}/>
    </Tooltip>
</div>
