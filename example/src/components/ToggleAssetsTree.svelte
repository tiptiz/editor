<script lang="ts">
    import { Button } from "@/components/ui/button"
    import { globalState, saveState } from "@/states/global.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"
    import { saveAsset } from "@/utils/svelte-helper"

    const toggleToc = () => {
        globalState.viewAssetsTree = !globalState.viewAssetsTree
        saveState("toolbar-view-assets-tree", globalState.viewAssetsTree)
    }

    const ctx = getEditorContext()
    const devSaveInLocal = () => {
        const content = ctx.editor.getHTML()
        if (!globalState.currentAsset) return
        saveAsset(globalState.currentAsset, content).then((res) => {
            console.log("res", res.status)
        })
    }
</script>

<Button class="py-0 px-2 h-7 rounded" variant="secondary" on:click={toggleToc}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round"
                  d="M19 16c0 2.828 0 4.243-.879 5.121C17.243 22 15.828 22 13 22h-2c-2.828 0-4.243 0-5.121-.879C5 20.243 5 18.828 5 16v-4m0-4c0-2.828 0-4.243.879-5.121C6.757 2 8.172 2 11 2h2c2.828 0 4.243 0 5.121.879C19 3.757 19 5.172 19 8v4"/>
            <path d="M5 4.076c-.975.096-1.631.313-2.121.803C2 5.757 2 7.172 2 10v4c0 2.828 0 4.243.879 5.121c.49.49 1.146.707 2.121.803M19 4.076c.975.096 1.631.313 2.121.803C22 5.757 22 7.172 22 10v4c0 2.828 0 4.243-.879 5.121c-.49.49-1.146.707-2.121.803"/>
            <path stroke-linecap="round" d="M9 13h6M9 9h6m-6 8h3"/>
        </g>
    </svg>
    <div class="w-24">{$t(globalState.viewAssetsTree ? "Close Assets" : "Open Assets")}</div>
</Button>
<span>{globalState.currentAsset}</span>

{#if import.meta.env.DEV}
    <Button class="w-[86px] py-0 px-2 h-7 rounded" variant="secondary" disabled={!globalState.currentAsset}
            on:click={devSaveInLocal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M3 5.75A2.75 2.75 0 0 1 5.75 3h9.965a3.25 3.25 0 0 1 2.298.952l2.035 2.035c.61.61.952 1.437.952 2.299v9.964A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25zM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25A2.25 2.25 0 0 1 8.25 12h7.5A2.25 2.25 0 0 1 18 14.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.286c0-.465-.184-.91-.513-1.238l-2.035-2.035a1.75 1.75 0 0 0-.952-.49V7.25a2.25 2.25 0 0 1-2.25 2.25h-4.5A2.25 2.25 0 0 1 7 7.25V4.5zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25zm-8-15v2.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V4.5z"/>
        </svg>
        <span class="mx-auto">{$t("Save")}</span>
    </Button>
{/if}
