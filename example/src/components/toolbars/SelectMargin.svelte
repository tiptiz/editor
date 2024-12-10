<script lang="ts">
    import SvgArrowDown from "@/icons/SvgArrowDown.svelte"

    import { Button } from "@/components/ui/button"
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import { Input } from "@/components/ui/input"
    import { getEditorContext } from "@/states/toolbar"
    import { marginTargets } from "@/utils/editor-presets"
    import { locale, t } from "@/utils/i18n"

    import SvgMargin from "@/icons/toolbars/SvgMargin.svelte"
    import SvgMarginTarget from "@/icons/toolbars/SvgMarginTarget.svelte"

    const margin = $state({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    })

    const ctx = getEditorContext()
    // TODO inspect margin from element
    const setMargin = () => {
        ctx.editor.chain().focus()
            .setMargin(`${margin.top}em ${margin.right}em ${margin.bottom}em ${margin.left}em`)
            .run()
    }
</script>

<DropdownMenu>
    <DropdownMenuTrigger class="pl-1.5 flex items-center toolbar-icon-trigger">
        <SvgMargin/>
        <SvgArrowDown/>
    </DropdownMenuTrigger>
    <DropdownMenuContent class={`${$locale === "zh_CN" ? "w-[188px]" : "w-[247px]"} p-2 items-center gap-2 flex flex-wrap`}>
        {#each marginTargets as target}
            <SvgMarginTarget {target}/>
            <Input class="h-6 w-20" bind:value={margin[target]} type="number" step={0.2}/>
            <div class={`${$locale === "zh_CN" ? "w-14" : "w-[117px]"} text-left`}>{$t(`Margin ${target}`)}</div>
        {/each}
        <Button class="ml-auto h-8" on:click={setMargin}>
            {$t("Confirm")}
        </Button>
    </DropdownMenuContent>
</DropdownMenu>
