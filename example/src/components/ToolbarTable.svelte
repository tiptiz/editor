<script lang="ts">
    import TableCreateNew from "@/components/TableCreateNew.svelte"
    import TableInsertNew from "@/components/TableInsertNew.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const ctx = getEditorContext()
</script>

<TableCreateNew/>
<TableInsertNew/>
