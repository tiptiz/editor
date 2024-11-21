<script lang="ts">
    import "@/styles/editor.scss"

    import type { EditorContext } from "@/states/editor"

    import ThemeMode from "@/components/ThemeMode.svelte"
    import Toolbar from "@/components/Toolbar.svelte"
    import { setEditorContext } from "@/states/editor"
    import { createEditor } from "@/utils/editor"

    import { onMount } from "svelte"

    const ctx = $state<EditorContext>(createEditor())
    setEditorContext(ctx)

    let divRef: HTMLDivElement
    onMount(() => {
        divRef.appendChild(ctx.container)
        return () => {
            ctx.editor.destroy()
        }
    })
</script>

<div class="size-full flex flex-col">
    <div class="w-full min-h-[52px] px-4 border flex items-center">
        <div class="flex-1"></div>
        <ThemeMode />
    </div>
    <div class="flex flex-col items-center gap-4 pb-4 bg-accent" style="height: calc(100% - 52px)">
        <Toolbar />
        <div class="w-[860px] h-full overflow-y-auto mx-auto border dark:bg-neutral-900" bind:this={divRef}></div>
    </div>
</div>
