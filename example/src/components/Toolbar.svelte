<script lang="ts">
    import Hr from "@/components/Hr.svelte"
    import SelectListType from "@/components/SelectListType.svelte"
    import ToolbarColors from "@/components/ToolbarColors.svelte"
    import ToolbarFormat from "@/components/ToolbarFormat.svelte"
    import ToolbarHistory from "@/components/ToolbarHistory.svelte"
    import ToolbarIndent from "@/components/ToolbarIndent.svelte"
    import ToolbarMarks from "@/components/ToolbarMarks.svelte"
    import ToolbarTable from "@/components/ToolbarTable.svelte"
    import ToolbarTextStyle from "@/components/ToolbarTextStyle.svelte"
    import ToolbarTwoLine from "@/components/ToolbarTwoLine.svelte"
</script>

<div class="toolbar h-[52px] flex items-center justify-center gap-2 relative">
    <ToolbarTwoLine class="w-12">
        <ToolbarHistory/>
        <ToolbarFormat/>
    </ToolbarTwoLine>
    <Hr class="h-[75%] mx-1"/>
    <ToolbarTwoLine>
        <ToolbarTextStyle/>
        <ToolbarMarks/>
        <ToolbarColors />
    </ToolbarTwoLine>
    <Hr class="h-[75%] mx-1"/>
    <SelectListType/>
    <ToolbarIndent/>
    <Hr class="h-[75%] mx-1"/>
    <ToolbarTable/>
    <hr class="absolute top-[33px] border-red-600/50 w-full"/>
    <hr class="absolute top-[18px] border-red-600/50 w-full"/>
</div>
