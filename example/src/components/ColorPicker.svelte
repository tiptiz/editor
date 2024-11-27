<script lang="ts">
    import type { Snippet } from "svelte"

    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"

    import LibColorPicker from "svelte-color-picker"

    interface Props {
        children: Snippet
        onselect: (color?: string) => void
    }

    const { onselect, children }: Props = $props()
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        {@render children()}
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-0 color-picker-menu-content">
        <LibColorPicker on:input={e => onselect(e.detail.color?.toRgbString())}
                        isDialog={false}
                        disableCloseClickOutside/>
    </DropdownMenuContent>
</DropdownMenu>

<style lang="scss">
    :global(.color-picker-menu-content) {
        --slider-width: 16px;

        :global(.wrapper) {
            border: none;
            padding: 8px;
            margin: 0;

            :global(.picker) {
                border-radius: 0;
            }
        }
    }
</style>
