<script lang="ts">
    import type { Component } from "svelte"

    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import { type HeadingLevel, headingLevels } from "@/utils/editor"

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
    let CurrentHeading = $derived(components[level])
</script>

{#snippet renderHeading(HeadingComponent: Component, lv: HeadingLevel)}
    <DropdownMenuItem onclick={() => onselect(lv)}>
        <HeadingComponent class={lv === level ? "active" : "" }/>
    </DropdownMenuItem>
{/snippet}
<DropdownMenu>
    <DropdownMenuTrigger>
        <div class={`w-11 -mb-0.5 flex pl-1.5 heading-trigger ${classes}`} {...restProps}>
            <CurrentHeading/>
            <SvgArrowDown width="16px"/>
        </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-0 w-11">
        {#each headingLevels as lv}
            {@render renderHeading(components[lv], lv)}
        {/each}
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
