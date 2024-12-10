<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"

    import SvgTextMinus from "@/icons/toolbars/SvgTextMinus.svelte"
    import SvgTextPlugs from "@/icons/toolbars/SvgTextPlugs.svelte"
    import SelectFontFamily from "@/components/toolbars/SelectFontFamily.svelte"
    import SelectFontSize from "@/components/toolbars/SelectFontSize.svelte"
    import SelectHeadingLevel from "@/components/toolbars/SelectHeadingLevel.svelte"
    import SelectLineHeight from "@/components/toolbars/SelectLineHeight.svelte"

    const ctx = getEditorContext()

    const updateFontSize = (size: number) => {
        const editor = ctx.editor

        // if textStyle has style attribute, other style property must be null if not set
        let fontSize = editor.getAttributes("textStyle")?.fontSize || "16px"

        let newSize = parseInt(fontSize, 10) + size
        if (newSize <= 4) newSize = 4
        else if (newSize >= 96) newSize = 96

        editor.chain().focus().setFontSize(`${newSize}px`).run()
    }
</script>

<Tooltip label={$t("Select font family")}>
    <SelectFontFamily/>
</Tooltip>
<Tooltip label={$t("Select font size")}>
    <SelectFontSize/>
</Tooltip>

<Tooltip label={$t("Select heading level")}>
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
