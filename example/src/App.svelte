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

<div class="w-full h-[104px] fixed top-0 z-10">
    <div class="w-full min-h-[52px] px-4 border flex items-center bg-background">
        <div class="flex-1"></div>
        <ThemeMode />
    </div>
    <Toolbar />
    <hr />
</div>
<div class="size-full pt-[120px] pb-4 bg-accent">
    <div class="size-full overflow-y-auto">
        <div class="w-[826px] min-h-full mx-auto bg-white dark:bg-neutral-700"
             bind:this={divRef}></div>
    </div>
</div>
