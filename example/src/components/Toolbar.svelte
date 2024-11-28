<script lang="ts">
    import Hr from "@/components/Hr.svelte"
    import ToolbarHistory from "@/components/ToolbarHistory.svelte"
    import ToolbarLayout from "@/components/ToolbarLayout.svelte"
    import ToolbarMarks from "@/components/ToolbarMarks.svelte"
    import ToolbarTextStyle from "@/components/ToolbarTextStyle.svelte"
</script>

<div class="toolbar h-[52px] flex items-center justify-center gap-1.5 relative">
    <ToolbarHistory/>
    <Hr class="h-2/5 mx-1"/>
    <ToolbarTextStyle />
    <Hr class="h-2/5 mx-1"/>
    <ToolbarMarks />
    <Hr class="h-2/5 mx-1"/>
    <ToolbarLayout />
    <hr class="absolute top-[33px] border-red-600 w-full"/>
    <hr class="absolute top-[18px] border-red-600 w-full"/>
</div>
