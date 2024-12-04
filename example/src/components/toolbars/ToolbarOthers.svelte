<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import SvgBlockquote from "@/icons/toolbars/SvgBlockquote.svelte"
    import SvgHr from "@/icons/toolbars/SvgHr.svelte"

    const ctx = getEditorContext()
    const blockquote = () => ctx.editor.chain().focus().toggleBlockquote().run()
    const setHr = () => ctx.editor.chain().focus().setHorizontalRule().run()
</script>

<div class="ml-[5px] flex items-center gap-x-[13px]">
    <Tooltip label="lift list item">
        <SvgBlockquote class={ctx.isBlockquote ? "active" : ""} onclick={blockquote}/>
    </Tooltip>
    <Tooltip label="set horizontal rule">
        <SvgHr onclick={setHr}/>
    </Tooltip>
</div>
