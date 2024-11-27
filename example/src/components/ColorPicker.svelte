<script lang="ts">
    import type { Snippet } from "svelte"

    import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
    import { theme } from "@/states/theme.svelte"

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
                        isDark={theme.isDark}
                        isDialog={false}
                        textInputModes={["hex"]}
                        disableCloseClickOutside/>
    </DropdownMenuContent>
</DropdownMenu>

<style lang="scss">
    :global(.dark .color-picker-menu-content) {
        --cp-bg-color: hsl(var(--background));
        --cp-border-color: white;
        --cp-button-hover-color: #777;
        --cp-input-color: #555;
    }

    :global(.color-picker-menu-content) {
        --slider-width: 16px;
        --cp-text-color: hsl(var(--foreground));

        :global(.wrapper) {
            border: none;
            padding: 8px;
            margin: 0;

            :global(.picker) {
                border-radius: 0;
            }
        }

        :global(.text-input .button-like) {
            display: none;
        }
    }
</style>
