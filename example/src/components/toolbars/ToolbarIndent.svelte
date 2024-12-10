<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"

    import SvgIndentDec from "@/icons/toolbars/SvgIndentDec.svelte"
    import SvgIndentInc from "@/icons/toolbars/SvgIndentInc.svelte"
    import SelectMargin from "@/components/toolbars/SelectMargin.svelte"

    const ctx = getEditorContext()

    const handleIndentInc = () => {
        ctx.editor.chain().focus().indent().run()
    }
    const handleIndentDec = () => {
        ctx.editor.chain().focus().outdent().run()
    }
</script>

<Tooltip label={$t("Increase indent")}>
    <SvgIndentInc onclick={handleIndentInc}/>
</Tooltip>
<Tooltip label={$t("Decrease indent")}>
    <SvgIndentDec onclick={handleIndentDec}/>
</Tooltip>

<Tooltip label={$t("Margin")}>
    <SelectMargin/>
</Tooltip>
