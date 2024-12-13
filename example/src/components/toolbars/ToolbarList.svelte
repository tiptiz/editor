<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
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

    const keymap = {
        "Select list": "Mod+Shift+8",
        "Insert task list": "Mod+Shift+9",
        "Break list": "Enter",
        "Sink list item": "Tab",
        "Lift list item": "Shift Tab"
    }
</script>

<Tooltip label={$t("Select list") + ` (${keymap["Select list"]})`}>
    <SelectListType/>
</Tooltip>
<Tooltip label={$t("Insert task list") + ` (${keymap["Insert task list"]})`}>
    <SvgTaskList class={ctx.isTaskList ? "active" : ""} onclick={toggleTaskList}/>
</Tooltip>
<Tooltip label={$t("Break list") + ` (${keymap["Break list"]})`}>
    <SvgListBreak onclick={breakList}/>
</Tooltip>
<Tooltip label={$t("Sink list item") + ` (${keymap["Sink list item"]})`}>
    <SvgListIndent onclick={sinkList}/>
</Tooltip>
<Tooltip label={$t("Lift list item") + ` (${keymap["Lift list item"]})`}>
    <SvgListOutdent onclick={liftList}/>
</Tooltip>
