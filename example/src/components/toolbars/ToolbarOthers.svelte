<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import SvgBlockquote from "@/icons/toolbars/SvgBlockquote.svelte"
    import SelectEmojis from "@/components/toolbars/SelectEmojis.svelte"
    import SelectHorizontalRules from "@/components/toolbars/SelectHorizontalRules.svelte"

    const ctx = getEditorContext()
    const blockquote = () => ctx.editor.chain().focus().toggleBlockquote().run()
</script>

<SelectHorizontalRules/>

<div class="flex items-center gap-x-[10px]">
    <Tooltip label="lift list item">
        <SvgBlockquote class={ctx.isBlockquote ? "active" : ""} onclick={blockquote}/>
    </Tooltip>
    <SelectEmojis/>
</div>
