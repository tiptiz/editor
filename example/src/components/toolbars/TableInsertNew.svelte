<script lang="ts">
    import type { TableInsertTarget } from "@/utils/editor"

    import { Button } from "@/components/ui/button"
    import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
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
            <Button class="p-0 h-auto" disabled={!ctx.isTable} variant="ghost" on:click={() => handleInsert(target)}>
                <SvgTableInsert target={target}/>
            </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
            <span>insert {target.replace("-", " ")}</span>
        </TooltipContent>
    </Tooltip>
{/snippet}
{#each tableInsertTargets as target}
    {@render tableInsert(target)}
{/each}
