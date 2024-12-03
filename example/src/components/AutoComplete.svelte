<script lang="ts">
    import type { Snippet } from "svelte"
    import type { HTMLInputAttributes } from "svelte/elements"

    import SvgArrowDown from "@/components/icons/SvgArrowDown.svelte"
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import { Input } from "@/components/ui/input"

    export type SelectOption = {
        label: string
        value: any
    }

    interface Props extends HTMLInputAttributes {
        items: SelectOption[]
        placeholder?: string
        handleSelect?: (item: SelectOption) => void
        label?: Snippet<[option: SelectOption]>
    }

    const {
        items, placeholder, handleSelect, label,
        class: classes,
        ...inputAttrs
    }: Props = $props()
</script>

<DropdownMenu>
    <DropdownMenuTrigger class="flex items-center relative">
        <Input class={`h-6 pr-4 rounded bg-opacity-50 ${classes}`} placeholder={placeholder} {...inputAttrs}/>
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
