<script lang="ts">
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"

    import SvgArrowDown from "./icons/SvgArrowDown.svelte"
    import SvgHeading1 from "./toolbars/SvgHeading1.svelte"
    import SvgHeading2 from "./toolbars/SvgHeading2.svelte"
    import SvgHeading3 from "./toolbars/SvgHeading3.svelte"
    import SvgHeading4 from "./toolbars/SvgHeading4.svelte"
    import SvgHeading5 from "./toolbars/SvgHeading5.svelte"
    import SvgHeading6 from "./toolbars/SvgHeading6.svelte"
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        <div class="-mb-0.5 flex pl-1.5 heading-trigger">
            <SvgHeading1/>
            <SvgArrowDown width="16px"/>
        </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-0 w-11">
        <DropdownMenuItem>
            <SvgHeading1/>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <SvgHeading2/>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <SvgHeading3/>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <SvgHeading4/>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <SvgHeading5/>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <SvgHeading6/>
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
<style lang="scss">
    :global(.dark) {
        .heading-trigger {
            --hover-color: #4d4d4d55;
        }
    }
    .heading-trigger {
        --hover-color: #e5e5e5;
        border-radius: 2px;
        &:hover {
            background-color: var(--hover-color);
        }
    }
</style>
