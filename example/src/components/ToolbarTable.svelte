<script lang="ts">
    import TableCreateNew from "@/components/TableCreateNew.svelte"
    import TableModify from "@/components/TableModify.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const ctx = getEditorContext()
</script>

{#if ctx.isTable}
    <TableModify />
{:else}
    <TableCreateNew/>
{/if}
