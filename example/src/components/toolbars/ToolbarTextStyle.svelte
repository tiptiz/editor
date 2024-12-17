<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { EditorKeymap } from "@/utils/editor-keymap"
    import { t } from "@/utils/i18n"

    import SvgTextMinus from "@/icons/toolbars/SvgTextMinus.svelte"
    import SvgTextPlugs from "@/icons/toolbars/SvgTextPlugs.svelte"
    import SelectFontFamily from "@/components/toolbars/SelectFontFamily.svelte"
    import SelectFontSize from "@/components/toolbars/SelectFontSize.svelte"
    import SelectHeadingLevel from "@/components/toolbars/SelectHeadingLevel.svelte"
    import SelectLineHeight from "@/components/toolbars/SelectLineHeight.svelte"

    const ctx = getEditorContext()

    const updateFontSize = (size: number) => {
        ctx.editor.chain().focus().updateFontSize(size).run()
    }
</script>

<Tooltip label={$t("Select font family")}>
    <SelectFontFamily/>
</Tooltip>
<Tooltip label={$t("Select font size")}>
    <SelectFontSize/>
</Tooltip>

<Tooltip label={$t("Select heading level") + ` (${EditorKeymap.SelectHeadingLevel})`}>
    <SelectHeadingLevel/>
</Tooltip>

<Tooltip label={$t("Increase font size")}>
    <SvgTextMinus onclick={() => updateFontSize(-2)}/>
</Tooltip>
<Tooltip label={$t("Decrease font size")}>
    <SvgTextPlugs onclick={() => updateFontSize(2)}/>
</Tooltip>

<Tooltip label={$t("Line height")}>
    <SelectLineHeight />
</Tooltip>
