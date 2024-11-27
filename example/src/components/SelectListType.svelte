<script lang="ts">

    import type { Component } from "svelte"

    import EditorTransactionEvent from "@/components/EditorTransactionEvent.svelte"
    import SvgArrowDown from "@/components/icons/SvgArrowDown.svelte"
    import SvgCircle from "@/components/icons/SvgCircle.svelte"
    import SvgDot from "@/components/icons/SvgDot.svelte"
    import SvgSquare from "@/components/icons/SvgSquare.svelte"
    import SvgListBulleted from "@/components/toolbars/SvgListBulleted.svelte"
    import SvgListNumbered from "@/components/toolbars/SvgListNumbered.svelte"
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import { getEditorContext } from "@/states/toolbar"

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
    let listStyleType: string = "disc"
    let CurrentListStyle = $derived(listStyles.find(ls => ls.style === listStyleType)
        ?.label
        ? SvgListNumbered
        : SvgListBulleted)

    const handleListStyleTr = () => {
        listStyleType = ctx.editor.getAttributes("bulletList").listStyleType
    }
    const handleListStyleSelect = (listStyleType: string) => {
        const { editor } = ctx
        let chain = editor.chain().focus()
        if (!editor.isActive("bulletList")) {
            chain.toggleBulletList().updateAttributes("bulletList", { listStyleType })
        } else if (editor.getAttributes("bulletList").listStyleType !== listStyleType) {
            chain.updateAttributes("bulletList", { listStyleType })
        } else {
            chain.toggleBulletList()
        }
    }
</script>

<EditorTransactionEvent handler={handleListStyleTr}/>
{#snippet renderIcon(Icon: Component)}
    <Icon width="10px" class="mr-2"/>
{/snippet}

<DropdownMenu>
    <DropdownMenuTrigger>
        <div class={`w-11 h-6 -mb-0.5 flex items-center pl-1.5 heading-trigger`}>
            <CurrentListStyle/>
            <SvgArrowDown width="16px"/>
        </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
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
