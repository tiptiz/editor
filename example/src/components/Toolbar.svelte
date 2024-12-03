<script lang="ts">
    import Hr from "@/components/Hr.svelte"
    import SelectFontFamily from "@/components/SelectFontFamily.svelte"
    import SelectFontSize from "@/components/SelectFontSize.svelte"
    import SelectHeadingLevel from "@/components/SelectHeadingLevel.svelte"
    import ToolbarColors from "@/components/ToolbarColors.svelte"
    import ToolbarFormat from "@/components/ToolbarFormat.svelte"
    import ToolbarHistory from "@/components/ToolbarHistory.svelte"
    import ToolbarIndent from "@/components/ToolbarIndent.svelte"
    import ToolbarList from "@/components/ToolbarList.svelte"
    import ToolbarMarks from "@/components/ToolbarMarks.svelte"
    import ToolbarTable from "@/components/ToolbarTable.svelte"
    import ToolbarTextStyle from "@/components/ToolbarTextStyle.svelte"
    import ToolbarTwoLine from "@/components/ToolbarTwoLine.svelte"
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
    <hr class="absolute top-[9px] border-red-600/50 w-full"/>
    <hr class="absolute top-[22px] border-red-600/50 w-full"/>
    <hr class="absolute top-[30px] border-red-600/50 w-full"/>
    <hr class="absolute top-[46px] border-red-600/50 w-full"/>
</div>
