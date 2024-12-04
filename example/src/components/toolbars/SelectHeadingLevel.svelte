<script lang="ts">
    import type { HeadingLevel } from "@/utils/editor"

    import SvgArrowDown from "@/icons/SvgArrowDown.svelte"

    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import { getEditorContext } from "@/states/toolbar"
    import { headingLevels } from "@/utils/editor"

    import SvgHeading from "@/icons/toolbars/SvgHeading.svelte"

    const ctx = getEditorContext()

    let level = $derived(ctx.isHeading)
    const setupHeading = (level: HeadingLevel) => {
        ctx.editor.chain().focus().toggleHeading({ level }).run()
    }
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        <div class={`pl-1.5 flex items-center toolbar-icon-trigger`} class:active={ctx.isHeading}>
            <SvgHeading level={level || 1}/>
            <SvgArrowDown />
        </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-0 w-11">
        {#each headingLevels as lv}
            <DropdownMenuItem on:click={() => setupHeading(lv)}>
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
