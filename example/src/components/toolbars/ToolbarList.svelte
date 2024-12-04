<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"

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

<SelectListType/>
<Tooltip label="task list">
    <SvgTaskList class={ctx.isTaskList ? "active" : ""} onclick={toggleTaskList}/>
</Tooltip>
<div class="flex-1"></div>
<div class="ml-[5px] flex items-center gap-x-[13px]">
    <Tooltip label="break list">
        <SvgListBreak class="mr-[6px]" onclick={breakList}/>
    </Tooltip>
    <Tooltip label="sink list item">
        <SvgListIndent onclick={sinkList}/>
    </Tooltip>
    <Tooltip label="lift list item">
        <SvgListOutdent onclick={liftList}/>
    </Tooltip>
</div>
