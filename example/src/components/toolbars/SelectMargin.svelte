<script lang="ts">
    import SvgArrowDown from "@/icons/SvgArrowDown.svelte"

    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"

    import SvgMargin from "@/icons/toolbars/SvgMargin.svelte"
</script>
<DropdownMenu>
    <DropdownMenuTrigger class="pl-1.5 flex items-center toolbar-icon-trigger">
        <SvgMargin/>
        <SvgArrowDown/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuItem>...</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
