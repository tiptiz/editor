<script lang="ts">
    import type { Component } from "svelte"

    import SvgArrowDown from "@/icons/SvgArrowDown.svelte"
    import SvgChevronDown from "@/icons/SvgChevronDown.svelte"
    import SvgChevronUp from "@/icons/SvgChevronUp.svelte"

    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import { getEditorContext } from "@/states/toolbar"

    import SvgLineHeight from "@/icons/toolbars/SvgLineHeight.svelte"

    let size = 100
    const items = [115, 150, 200]
    const steps = [
        { Icon: SvgChevronUp, step: 20 },
        { Icon: SvgChevronDown, step: -20 }
    ]

    const ctx = getEditorContext()
    const setLineHeight = (size: number) => {
        ctx.editor.chain().focus()
            .selectParentNode()
            .setLineHeight(`${size}em`)
            .run()
    }

    type StepSize = number
    const handleStep = (step: StepSize) => {
        size += step
        setLineHeight(size / 100)
    }
</script>

{#snippet stepButton(Icon: Component, step: StepSize)}
    <button class="size-4 flex items-center justify-center toolbar-icon-trigger"
            onclick={() => handleStep(step)}>
        <Icon/>
    </button>
{/snippet}

<DropdownMenu onOpenChange={() => size = 100}>
    <DropdownMenuTrigger class="pl-1.5 flex items-center toolbar-icon-trigger">
        <SvgLineHeight/>
        <SvgArrowDown/>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-0 w-[86px] flex flex-col gap-1">
        <div class="flex">
            <DropdownMenuItem class="flex-1" on:click={() => setLineHeight(size / 100)}>
                {size / 100}
            </DropdownMenuItem>
            <div class="flex flex-col w-6 justify-center">
                {#each steps as { Icon, step }}
                    {@render stepButton(Icon, step)}
                {/each}
            </div>
        </div>
        {#each items as size}
            <DropdownMenuItem class="h-8 cursor-pointer" on:click={() => setLineHeight(size / 100)}>
                {size / 100}
            </DropdownMenuItem>
        {/each}
    </DropdownMenuContent>
</DropdownMenu>
