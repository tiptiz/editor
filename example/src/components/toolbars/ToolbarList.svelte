<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { EditorKeymap } from "@/utils/editor-keymap"
    import { t } from "@/utils/i18n"

    import SvgListBreak from "@/icons/toolbars/SvgListBreak.svelte"
    import SvgListIndent from "@/icons/toolbars/SvgListIndent.svelte"
    import SvgListOutdent from "@/icons/toolbars/SvgListOutdent.svelte"
    import SvgTaskList from "@/icons/toolbars/SvgTaskList.svelte"
    import SelectListType from "@/components/toolbars/SelectListType.svelte"

    const ctx = getEditorContext()
    // TODO TaskList has style problem
    const toggleTaskList = () => {
        ctx.editor.chain().focus().toggleTaskList().run()
    }
    const breakList = () => {
        const target = ctx.isBulletList ? "listItem" : "taskItem"
        ctx.editor.chain().focus().splitListItem(target).run()
    }
    const sinkList = () => {
        const target = ctx.isBulletList ? "listItem" : "taskItem"
        ctx.editor.chain().focus().sinkListItem(target).run()
    }
    const liftList = () => {
        const target = ctx.isBulletList ? "listItem" : "taskItem"
        ctx.editor.chain().focus().liftListItem(target).run()
    }
</script>

<Tooltip label={$t("Select list") + ` (${EditorKeymap.InsertBulletList})`}>
    <SelectListType/>
</Tooltip>
<Tooltip label={$t("Insert task list") + ` (${EditorKeymap.InsertTaskList})`}>
    <SvgTaskList class={ctx.isTaskList ? "active" : ""} onclick={toggleTaskList}/>
</Tooltip>
<Tooltip label={$t("Break list") + ` (${EditorKeymap.BreakList})`}>
    <SvgListBreak onclick={breakList}/>
</Tooltip>
<Tooltip label={$t("Sink list item") + ` (${EditorKeymap.SinkListItem})`}>
    <SvgListIndent onclick={sinkList}/>
</Tooltip>
<Tooltip label={$t("Lift list item") + ` (${EditorKeymap.LiftListItem})`}>
    <SvgListOutdent onclick={liftList}/>
</Tooltip>
