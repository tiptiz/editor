<script lang="ts">
    import type { HeadingLevel } from "@/utils/editor"

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

    interface Props {
        class?: string
        level: HeadingLevel | 0
        onselect: (level: HeadingLevel) => void
    }

    const components = {
        0: SvgHeading1,
        1: SvgHeading1,
        2: SvgHeading2,
        3: SvgHeading3,
        4: SvgHeading4,
        5: SvgHeading5,
        6: SvgHeading6
    } as const
    const { class: classes, level, onselect, ...restProps }: Props = $props()
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        <div class={`w-11 -mb-0.5 flex pl-1.5 heading-trigger ${classes}`} {...restProps}>
            <svelte:component this={components[level]}/>
            <SvgArrowDown width="16px"/>
        </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-0 w-11">
        <DropdownMenuItem onclick={() => onselect(1)}>
            <SvgHeading1 class={level === 1 ? "active" : "" }/>
        </DropdownMenuItem>
        <DropdownMenuItem onclick={() => onselect(2)}>
            <SvgHeading2 class={level === 2 ? "active" : "" }/>
        </DropdownMenuItem>
        <DropdownMenuItem onclick={() => onselect(3)}>
            <SvgHeading3 class={level === 3 ? "active" : "" }/>
        </DropdownMenuItem>
        <DropdownMenuItem onclick={() => onselect(4)}>
            <SvgHeading4 class={level === 4 ? "active" : "" }/>
        </DropdownMenuItem>
        <DropdownMenuItem onclick={() => onselect(5)}>
            <SvgHeading5 class={level === 5 ? "active" : "" }/>
        </DropdownMenuItem>
        <DropdownMenuItem onclick={() => onselect(6)}>
            <SvgHeading6 class={level === 6 ? "active" : "" }/>
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

    :global(svg.active) {
        color: hsl(var(--primary));
    }
</style>
