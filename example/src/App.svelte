<script lang="ts">
    import "@/styles/editor.scss"

    import ThemeMode from "@/components/ThemeMode.svelte"
    import Toolbar from "@/components/Toolbar.svelte"
    import { createEditor } from "@/utils/editor"

    import { onMount } from "svelte"

    const ctx = createEditor({
        onTransaction() {
            // reactive problem
            // eslint-disable-next-line no-self-assign
            ctx.editor = ctx.editor
        }
    })

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
    <Toolbar editor={ctx.editor} />
    <hr />
</div>
<div class="size-full pt-[120px] pb-4 bg-accent">
    <div class="size-full overflow-y-auto">
        <div class="max-w-[826px] mx-4 min-h-full mx-auto bg-white dark:bg-neutral-700"
             bind:this={divRef}></div>
    </div>
</div>
