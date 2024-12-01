<script lang="ts">
    import SvgTable from "@/components/toolbars/SvgTable.svelte"
    import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
    import { getEditorContext } from "@/states/toolbar"

    const ctx = getEditorContext()
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        <SvgTable class={ctx.isTable ? "active" : ""}/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        123
    </DropdownMenuContent>
</DropdownMenu>
