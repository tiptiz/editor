<script lang="ts">
    import SvgTable from "@/components/toolbars/SvgTable.svelte"
    import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
    import { getEditorContext } from "@/states/toolbar"
    import { range } from "@/utils/common"

    const ctx = getEditorContext()
    let currentPos: [row: number, col: number] | undefined
    const handleMouseMove = (e: MouseEvent) => {
        console.log("mose move", e)
    }
    // TODO table create
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        <SvgTable/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        1
    </DropdownMenuContent>
</DropdownMenu>
<div class="flex flex-wrap w-[204px] gap-1 p-2 fixed top-0 right-0 bg-white shadow-2xl"
     onmousemove={handleMouseMove}>
    {#each range(1, 8) as col}
        {#each range(1, 6) as row}
            <div class="w-5 h-5 border rounded-sm"
                 class:index-active={currentPos && row <= currentPos[0] && col <= currentPos[1]}
                 data-pos={{ row, col }}>
            </div>
        {/each}
    {/each}
    {currentPos}
</div>
<style>
    .index-active {
        border-color: blue;
    }
</style>
