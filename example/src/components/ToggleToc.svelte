<script lang="ts">
    import { Button } from "@/components/ui/button"
    import { globalState, saveState } from "@/states/global.svelte"
    import { t } from "@/utils/i18n"

    const toggleToc = () => {
        globalState.viewToc = !globalState.viewToc
        saveState("toolbar-view-toc", globalState.viewToc)
    }
</script>

<Button class="py-0 px-2 h-7 rounded" variant="secondary" on:click={toggleToc}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
        <g fill="currentColor" transform="scale(1, 1.1) translate(0 -0.6)" stroke="currentColor" stroke-width="0.2">
            <path d="M4 9h9v1H4zm0 3h7v1H4zm0-6h10v1H4zM1 3h11v1H1z"/>
            <path d="M4 4h1v9H4z"/>
        </g>
    </svg>
    <div class="w-16">{$t(globalState.viewToc ? "Close Toc" : "Open Toc")}</div>
</Button>
