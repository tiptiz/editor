<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"

    import SvgBrush from "@/icons/toolbars/SvgBrush.svelte"
    import SvgClear from "@/icons/toolbars/SvgClear.svelte"

    const ctx = getEditorContext()
    const clear = () => {
        ctx.editor.chain().focus().clearNodes().run()
        ctx.editor.chain().focus().unsetAllMarks().run()
    }
</script>

<Tooltip label={$t("Clear current marks")}>
    <SvgClear onclick={clear}/>
</Tooltip>
<Tooltip label="marks brush (not supported yet!)">
    <SvgBrush class="cursor-not-allowed"/>
</Tooltip>
