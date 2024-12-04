<script lang="ts">
    import type { TableInsertTarget } from "@/utils/editor"

    import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
    import ToolbarButton from "@/components/ToolbarButton.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { tableInsertTargets } from "@/utils/editor"

    import SvgTableInsert from "@/icons/toolbars/SvgTableInsert.svelte"

    const ctx = getEditorContext()
    const handleInsert = (target: TableInsertTarget) => {
        const chain = ctx.editor.chain().focus()
        switch (target) {
        case "col-before":
            chain.addColumnBefore().run()
            break
        case "col-after":
            chain.addColumnAfter().run()
            break
        case "row-above":
            chain.addRowBefore().run()
            break
        case "row-below":
            chain.addRowAfter().run()
            break
        }
    }
</script>

{#snippet tableInsert(target: TableInsertTarget)}
    <Tooltip openDelay={100} closeDelay={0}>
        <TooltipTrigger class="flex">
            <ToolbarButton disabled={!ctx.isTable} onclick={() => handleInsert(target)}>
                <SvgTableInsert target={target}/>
            </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent side="bottom">
            <span>insert {target.replace("-", " ")}</span>
        </TooltipContent>
    </Tooltip>
{/snippet}
{#each tableInsertTargets as target}
    {@render tableInsert(target)}
{/each}
