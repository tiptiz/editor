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
    <ToolbarTwoLine class="w-11 gap-x-2 pt-1 gap-y-[5px]">
        <ToolbarHistory/>
        <ToolbarFormat/>
    </ToolbarTwoLine>
    <Hr class="h-[75%] mx-1"/>
    <ToolbarTwoLine class="w-[320px] gap-x-2.5">
        <SelectFontFamily/>
        <SelectFontSize/>
        <div class="flex items-center gap-x-[9px]">
            <ToolbarTextStyle/>
        </div>
        <div class="h-[20px] flex items-center gap-x-[11px]">
            <ToolbarMarks/>
            <ToolbarColors/>
            <ToolbarIndent/>
            <SelectHeadingLevel/>
        </div>
    </ToolbarTwoLine>
    <Hr class="h-[75%] mx-1"/>
    <ToolbarTwoLine class="w-[94px] pt-[3px] gap-y-[6px]">
        <ToolbarList/>
    </ToolbarTwoLine>
    <Hr class="h-[75%] mx-1"/>
    <ToolbarTwoLine class="w-[123px] gap-x-2 pt-[3px] gap-y-[5px]">
        <ToolbarTable/>
    </ToolbarTwoLine>
    {#if globalState.viewSparkLines}
        <hr class="absolute top-[9px] border-red-600/50 w-full"/>
        <hr class="absolute top-[22px] border-red-600/50 w-full"/>
        <hr class="absolute top-[32px] border-red-600/50 w-full"/>
        <hr class="absolute top-[45px] border-red-600/50 w-full"/>
    {/if}
</div>
