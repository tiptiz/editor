<script lang="ts">
    import SvgFolderColored from "@/icons/SvgFolderColored.svelte"
    import SvgHTMLColored from "@/icons/SvgHTMLColored.svelte"

    import { globalState, saveState } from "@/states/global.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { getAsset } from "@/utils/svelte-helper"

    type TreeItem = {
        name: string
        children?: TreeItem[]
        path?: string
        getContent?: () => Promise<string>
    }

    const dynAssets = {
        "features.html": () => import("../assets/features.html?raw").then(m => m.default),
        "first-page.html": () => import("../assets/first-page.html?raw").then(m => m.default),
        "wikis/explain.html": () => import("../assets/wikis/explain.html?raw").then(m => m.default),
        "dev-logs/progress-2024-12-15.html": () => import("../assets/dev-logs/progress-2024-12-15.html?raw").then(m => m.default)
    } as const

    const createAsset = (name: string, path = name): TreeItem => ({
        name,
        path,
        getContent: import.meta.env.DEV ? () => getAsset(path) : dynAssets[path]
    })
    const docsTree: TreeItem[] = [
        {
            name: "get started",
            children: [
                createAsset("first-page.html"),
                createAsset("features.html")
            ]
        },
        {
            name: "wikis",
            children: [
                createAsset("explain.html", "wikis/explain.html")
            ]
        },
        {
            name: "develop logs & progress",
            children: [
                createAsset("progress-2024-12-15.html", "dev-logs/progress-2024-12-15.html")
            ]
        },
        {
            name: "dev test use",
            children: [
                createAsset("test.html", "dev-use/test.html")
            ]
        }
    ]

    let currentPath = $derived(globalState.currentAsset)

    const ctx = getEditorContext()
    const handleAssetClick = (doc: TreeItem) => {
        if (doc.children) return

        globalState.currentAsset = doc.path
        saveState("current-asset", doc.path)

        doc?.getContent().then((htmlRaw) => {
            ctx.editor.commands.setContent(htmlRaw)
        })
    }

    if (globalState.currentAsset) {
        createAsset(globalState.currentAsset).getContent().then((htmlRaw) => {
            ctx.editor.commands.setContent(htmlRaw)
        })
    }
</script>

{#snippet tree(docs: TreeItem[], level = 0)}
    <div class="my-2" style={`padding-left: ${level * 6}px`}>
        {#each docs as doc}
            <div class={`flex items-center gap-2 border-l-4`} class:pl-2={level}
                 style={`border-color: ${doc.path === currentPath ? "hsl(var(--primary))" : "#ffffff00"}`}>
                <div class="w-5 flex justify-center">
                    {#if doc.children}
                        <SvgFolderColored width="24" height="24"/>
                    {:else }
                        <SvgHTMLColored width="18" height="18"/>
                    {/if}
                </div>
                <button class="flex items-center" onclick={() => handleAssetClick(doc)}>
                    {doc.name}
                </button>
            </div>
            {#if doc.children}
                {@render tree(doc.children, level + 1)}
            {/if}
        {/each}
    </div>
{/snippet}

<div class="assets-tree p-2 shadow-xl fixed bg-white dark:bg-neutral-700" class:active={globalState.viewAssetsTree}>
    <h1>Assets</h1>
    <hr/>
    <div class="overflow-y-auto" style="height: calc(100% - 50px)">
        {@render tree(docsTree)}
    </div>
</div>

<style lang="scss">
    .assets-tree {
        position: fixed;
        z-index: 999;
        top: 120px;
        left: 0;
        width: 360px;
        height: 70%;
        transform: translateX(-360px);
        transition: transform 0.3s;

        h1 {
            font-size: 20px;
            font-weight: 900;
        }
    }

    .assets-tree.active {
        transform: translateX(0);
    }
</style>
