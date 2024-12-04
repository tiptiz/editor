<script lang="ts">
    import { Button } from "@/components/ui/button"
    import { Checkbox } from "@/components/ui/checkbox"
    import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
    import { Input } from "@/components/ui/input"
    import { getEditorContext } from "@/states/toolbar"
    import { range } from "@/utils/common"

    import SvgTablePlus from "@/icons/toolbars/SvgTablePlus.svelte"

    const ctx = getEditorContext()

    let open = false
    let currentPos: [row: number, col: number] = [0, 0]
    let firstRowHeader = true

    const insertTable = () => {
        const editor = ctx.editor
        const [rows, cols] = currentPos
        editor.chain().focus().insertTable({ rows, cols, withHeaderRow: firstRowHeader }).run()
        open = false
    }
</script>

<DropdownMenu bind:open>
    <DropdownMenuTrigger class="flex">
        <Button class="p-0 h-auto" disabled={ctx.isTable} variant="ghost">
            <SvgTablePlus/>
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <div class="flex flex-wrap w-[204px] gap-1 p-2">
            {#each range(1, 6) as row}
                {#each range(1, 8) as col}
                    <button class="w-5 h-5 border rounded-sm"
                            class:index-active={currentPos && row <= currentPos[0] && col <= currentPos[1]}
                            aria-label="table size"
                            on:click={insertTable}
                            on:mouseover={() => currentPos = [row, col]}
                            on:focus={() => currentPos = [row, col]}>
                    </button>
                {/each}
            {/each}
            <div class="flex gap-3 mt-2">
                <Input class="h-8 flex-1" type="number" bind:value={currentPos[0]}/>
                <div class="w-10">row</div>
            </div>
            <div class="flex gap-3">
                <Input class="h-8 flex-1" type="number" bind:value={currentPos[1]}/>
                <div class="w-10">col</div>
            </div>
            <div class="flex items-center gap-2">
                <Checkbox id="check-header" bind:checked={firstRowHeader}></Checkbox>
                <label for="check-header" class="select-none">First row header</label>
            </div>
            <Button class="ml-auto mt-2" size="sm" on:click={insertTable}>Create</Button>
        </div>
    </DropdownMenuContent>
</DropdownMenu>

<style>
    .index-active {
        border-color: hsl(var(--primary));
    }
</style>
