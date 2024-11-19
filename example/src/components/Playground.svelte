<script lang="ts">
    import { Editor } from "@tiptap/core"
    import { extensions } from "@tiptap-contentful/packs-universal"
    import { onMount } from "svelte"

    let divRef: HTMLDivElement
    onMount(() => {
        const editor = new Editor({
            element: divRef,
            extensions: extensions,
            content: `<p>Hello, world!</p>`
        })
    })
</script>
<div bind:this={divRef} class="size-full" ></div>
