<script lang="ts">
    import Hr from "@/components/Hr.svelte"
    import { globalState } from "@/states/global.svelte"

    import SelectFontFamily from "@/components/toolbars/SelectFontFamily.svelte"
    import SelectFontSize from "@/components/toolbars/SelectFontSize.svelte"
    import SelectHeadingLevel from "@/components/toolbars/SelectHeadingLevel.svelte"
    import ToolbarColors from "@/components/toolbars/ToolbarColors.svelte"
    import ToolbarFormat from "@/components/toolbars/ToolbarFormat.svelte"
    import ToolbarHistory from "@/components/toolbars/ToolbarHistory.svelte"
    import ToolbarIndent from "@/components/toolbars/ToolbarIndent.svelte"
    import ToolbarList from "@/components/toolbars/ToolbarList.svelte"
    import ToolbarMarks from "@/components/toolbars/ToolbarMarks.svelte"
    import ToolbarTable from "@/components/toolbars/ToolbarTable.svelte"
    import ToolbarTextStyle from "@/components/toolbars/ToolbarTextStyle.svelte"
    import ToolbarTwoLine from "@/components/toolbars/ToolbarTwoLine.svelte"

</script>

<div class="toolbar h-[52px] flex items-center justify-center gap-2 relative">
    <ToolbarTwoLine class="w-12 gap-x-2">
        <ToolbarHistory/>
        <ToolbarFormat/>
    </ToolbarTwoLine>
    <Hr class="h-[75%] mx-1"/>
    <ToolbarTwoLine class="w-[332px] gap-x-2.5">
        <SelectFontFamily/>
        <SelectFontSize/>
        <div class="flex items-center gap-x-[9px]">
            <ToolbarTextStyle/>
        </div>
        <ToolbarMarks/>
        <ToolbarColors/>
        <ToolbarIndent/>
        <SelectHeadingLevel/>
    </ToolbarTwoLine>
    <Hr class="h-[75%] mx-1"/>
    <ToolbarTwoLine class="w-[86px]">
        <ToolbarList/>
    </ToolbarTwoLine>
    <Hr class="h-[75%] mx-1"/>
    <ToolbarTable/>
    {#if globalState.viewSparkLines}
        <hr class="absolute top-[9px] border-red-600/50 w-full"/>
        <hr class="absolute top-[22px] border-red-600/50 w-full"/>
        <hr class="absolute top-[30px] border-red-600/50 w-full"/>
        <hr class="absolute top-[46px] border-red-600/50 w-full"/>
    {/if}
</div>
