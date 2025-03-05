<script lang="ts">
    import type { Snippet } from "svelte"

    import SvgForbidden from "@/icons/SvgForbidden.svelte"

    import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
    import { appendColors, colors, colorsRecommended } from "@/states/histories.svelte"
    import { theme } from "@/states/theme.svelte"

    import { css } from "../../../packages/tiptiz-utils-shared"

    import LibColorPicker from "svelte-color-picker"

    interface Props {
        children: Snippet
        onselect: (color?: string) => void
    }

    const { onselect, children }: Props = $props()

    let currentColor: string | undefined
    const handleMenuClose = (open: boolean) => {
        if (!open && currentColor) appendColors(currentColor)
        else {
            currentColor = undefined
        }
    }
    const handleColorChange = (color?: string) => {
        currentColor = color
        onselect(color)
    }
    type ColorString = string
</script>

{#snippet colorBlock(color: ColorString)}
    <button class="w-6 h-6 rounded-full btn-color"
            aria-label={`color ${color}`}
            style={css` background-color: ${color};`}
            onclick={() => handleColorChange(color)}>
    </button>
{/snippet}
<DropdownMenu onOpenChange={handleMenuClose}>
    <DropdownMenuTrigger>
        {@render children()}
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-0 color-picker-menu-content">
        <LibColorPicker on:input={e => handleColorChange(e.detail.color?.toHex())}
                        isDark={theme.isDark}
                        isDialog={false}
                        textInputModes={["hex"]}
                        disableCloseClickOutside/>
        {#if colors.length}
            <div class="flex flex-wrap w-full gap-2 p-2">
                {#each colors as color}
                    {@render colorBlock(color)}
                {/each}
            </div>
            <hr/>
        {/if}
        <div class="flex flex-wrap w-[263px] gap-2 p-2">
            <button class="w-6 h-6 rounded-full border-2 bg-gray-200"
                    onclick={() => handleColorChange()}>
                <SvgForbidden class="size-full" style="color: red"/>
            </button>
            {#each colorsRecommended as color}
                {@render colorBlock(color)}
            {/each}
        </div>
    </DropdownMenuContent>
</DropdownMenu>

<style lang="scss">
    .btn-color {
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
    }

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
