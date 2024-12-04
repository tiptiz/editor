<script lang="ts">
    import type { Component } from "svelte"

    import SvgArrowDown from "@/icons/SvgArrowDown.svelte"
    import SvgCircle from "@/icons/SvgCircle.svelte"
    import SvgDot from "@/icons/SvgDot.svelte"
    import SvgSquare from "@/icons/SvgSquare.svelte"

    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import { getEditorContext } from "@/states/toolbar"

    import SvgListBulleted from "@/icons/toolbars/SvgListBulleted.svelte"

    interface ListStyle {
        icon?: Component
        label?: string
        name: string
        style: string
    }

    const ctx = getEditorContext()

    const listStyles: ListStyle[] = [
        { icon: SvgDot, name: "Bulleted", style: "disc" },
        { icon: SvgSquare, name: "Squared", style: "square" },
        { icon: SvgCircle, name: "Circle", style: "circle" },
        { label: "1, 2, 3...", name: "Numbered", style: "decimal" },
        { label: "a, b, c...", name: "Lower Alpha", style: "lower-alpha" },
        { label: "A, B, C...", name: "Upper Alpha", style: "upper-alpha" },
        { label: "i, ii, iii...", name: "Lower Roman", style: "lower-roman" }
    ]
    let listStyleType = $state("disc")

    const handleListStyleState = () => {
        listStyleType = ctx.editor.getAttributes("bulletList").listStyleType
    }
    const handleListStyleSelect = (listStyleType: string) => {
        const { editor, isBulletList } = ctx
        let chain = editor.chain().focus()
        if (!isBulletList) {
            chain.toggleBulletList().updateAttributes("bulletList", { listStyleType }).run()
        } else if (editor.getAttributes("bulletList").listStyleType !== listStyleType) {
            chain.updateAttributes("bulletList", { listStyleType }).run()
        } else {
            chain.toggleBulletList().run()
        }
    }
</script>

{#snippet renderIcon(Icon: Component)}
    <Icon width="10px" class="mr-2"/>
{/snippet}

<DropdownMenu onOpenChange={handleListStyleState}>
    <DropdownMenuTrigger>
        <div class={`w-11 flex pl-1.5 toolbar-icon-trigger`} class:active={ctx.isBulletList}>
            <SvgListBulleted/>
            <SvgArrowDown/>
        </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="svg-active-able">
        {#each listStyles as { icon, name, style, label }}
            <DropdownMenuItem class={style === listStyleType ? "active" : "" }
                              onclick={() => handleListStyleSelect(style)}>
                {#if icon}
                    {@render renderIcon(icon)}{name}
                {:else}
                    {label}
                {/if}
            </DropdownMenuItem>
        {/each}
    </DropdownMenuContent>
</DropdownMenu>
