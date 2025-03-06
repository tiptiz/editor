<script lang="ts">
    import SvgArrowDown from "@/icons/SvgArrowDown.svelte"

    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { horizontalTypes, lowContrastGray } from "@/utils/editor-presets"

    import SvgHr from "@/icons/toolbars/SvgHr.svelte"

    import { css } from "tiptiz-utils-shared"

    const ctx = getEditorContext()

    let currentColor = $state("")
    const setHr = (dataType = "single", color = currentColor) =>
        ctx.editor.chain().focus().setHr({ dataType, color }).run()
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        <div class="pl-1.5 gap-x-0.5 flex items-center">
            <Tooltip label="set horizontal rule">
                <SvgHr onclick={() => setHr()}/>
            </Tooltip>
            <div class="toolbar-icon-trigger">
                <SvgArrowDown/>
            </div>
        </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-0">
        {#each horizontalTypes as hr}
            <DropdownMenuItem on:click={() => setHr(hr.type)}>
                <hr data-type={hr.type}
                    style={css`
                        width: 50px;
                        border-top-width: 2px;
                        border-color: ${currentColor || lowContrastGray};
                        ${hr.style}
                    `}/>
            </DropdownMenuItem>
        {/each}
    </DropdownMenuContent>
</DropdownMenu>
