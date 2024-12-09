<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"

    import SvgRedo from "@/icons/toolbars/SvgRedo.svelte"
    import SvgUndo from "@/icons/toolbars/SvgUndo.svelte"

    const ctx = getEditorContext()

    const undo = () => ctx.editor.commands.undo()
    const redo = () => ctx.editor.commands.redo()

</script>

<Tooltip label={$t("Undo")}>
    <SvgUndo onclick={undo}/>
</Tooltip>
<Tooltip label={$t("Redo")}>
    <SvgRedo onclick={redo}/>
</Tooltip>
