<script lang="ts">
    import Hr from "@/components/Hr.svelte"
    import ToolbarHistory from "@/components/ToolbarHistory.svelte"
    import ToolbarLayout from "@/components/ToolbarLayout.svelte"
    import ToolbarMarks from "@/components/ToolbarMarks.svelte"
    import ToolbarTextStyle from "@/components/ToolbarTextStyle.svelte"
</script>

<div class="toolbar h-[52px] flex items-center justify-center gap-1.5">
    <ToolbarHistory/>
    <Hr class="h-2/5 mx-2"/>
    <ToolbarTextStyle />
    <Hr class="h-2/5 mx-2"/>
    <ToolbarMarks />
    <Hr class="h-2/5 mx-2"/>
    <ToolbarLayout />
</div>
