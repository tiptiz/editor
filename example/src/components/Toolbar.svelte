<script lang="ts">
    import Hr from "@/components/Hr.svelte"
    import { globalState } from "@/states/global.svelte"

    import ToolbarAlign from "@/components/toolbars/ToolbarAlign.svelte"
    import ToolbarColors from "@/components/toolbars/ToolbarColors.svelte"
    import ToolbarFormat from "@/components/toolbars/ToolbarFormat.svelte"
    import ToolbarHistory from "@/components/toolbars/ToolbarHistory.svelte"
    import ToolbarIndent from "@/components/toolbars/ToolbarIndent.svelte"
    import ToolbarList from "@/components/toolbars/ToolbarList.svelte"
    import ToolbarMarks from "@/components/toolbars/ToolbarMarks.svelte"
    import ToolbarOthers from "@/components/toolbars/ToolbarOthers.svelte"
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
    <ToolbarTwoLine class="w-[408px] gap-x-[10px]">
        <ToolbarTextStyle/>
        <div class="flex items-center gap-x-2">
            <ToolbarMarks/>
            <ToolbarColors/>
            <ToolbarAlign/>
        </div>
        <div class="flex items-center gap-x-2">
            <ToolbarIndent/>
        </div>
    </ToolbarTwoLine>
    <Hr class="h-[75%] mx-1"/>
    <ToolbarTwoLine class="w-[148px] pt-[3px] gap-x-2 gap-y-[6px]">
        <ToolbarList/>
        <div class="flex items-center gap-x-[9px]">
            <ToolbarOthers/>
        </div>
    </ToolbarTwoLine>
    <Hr class="h-[75%] mx-1"/>
    <ToolbarTwoLine class="w-[174px] gap-x-2 pt-[3px] gap-y-[5px]">
        <ToolbarTable/>
    </ToolbarTwoLine>
    {#if globalState.viewSparkLines}
        <hr class="absolute top-[9px] border-red-600/50 w-full"/>
        <hr class="absolute top-[22px] border-red-600/50 w-full"/>
        <hr class="absolute top-[32px] border-red-600/50 w-full"/>
        <hr class="absolute top-[45px] border-red-600/50 w-full"/>
    {/if}
</div>
