<script lang="ts">
    import { Button } from "@/components/ui/button"
    import { globalState, saveState } from "@/states/global.svelte"
    import { t } from "@/utils/i18n"

    const toggleToc = () => {
        globalState.viewAssetsTree = !globalState.viewAssetsTree
        saveState("toolbar-view-assets-tree", globalState.viewAssetsTree)
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
