<script lang="ts">
    import type { HeadingLevel } from "@/utils/editor"

    import SvgArrowDown from "@/components/icons/SvgArrowDown.svelte"
    import SvgHeading from "@/components/toolbars/SvgHeading.svelte"
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import { headingLevels } from "@/utils/editor"

    interface Props {
        class?: string
        level: HeadingLevel | 0
        onselect: (level: HeadingLevel) => void
    }

    const { class: classes, level, onselect, ...restProps }: Props = $props()
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        <div class={`w-11 h-6 flex items-center pl-1.5 toolbar-icon-trigger ${classes}`} {...restProps}>
            <SvgHeading level={level || 1} style="transform: scale(0.85)"/>
            <SvgArrowDown width="16px"/>
        </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-0 w-11">
        {#each headingLevels as lv}
            <DropdownMenuItem on:click={() => onselect(lv)}>
                <SvgHeading level={lv} class={lv === level ? "active" : ""}/>
            </DropdownMenuItem>
        {/each}
    </DropdownMenuContent>
</DropdownMenu>
<style lang="scss">
    :global(svg.active) {
        color: hsl(var(--primary));
    }
</style>
