<script lang="ts">
    import type { Snippet } from "svelte"

    import SvgArrowDown from "@/icons/SvgArrowDown.svelte"

    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"

    export type SelectOption = {
        label: string
        value: any
    }

    interface Props {
        class?: string
        items: SelectOption[]
        placeholder?: string
        handleSelect?: (item: SelectOption) => void
        label?: Snippet<[option: SelectOption]>
    }

    const {
        items, placeholder, handleSelect, label,
        class: classes
    }: Props = $props()
</script>

<DropdownMenu>
    <DropdownMenuTrigger class="flex items-center relative">
        <div class={`h-6 pr-4 rounded bg-background ${classes}`}>{placeholder}</div>
        <SvgArrowDown class="absolute right-1" width="16px"/>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-0">
        {#each items as item}
            <DropdownMenuItem class="min-w-0" on:click={() => handleSelect?.(item)}>
                {#if label}
                    {@render label(item)}
                {:else}
                    {item.label}
                {/if}
            </DropdownMenuItem>
        {/each}
    </DropdownMenuContent>
</DropdownMenu>
