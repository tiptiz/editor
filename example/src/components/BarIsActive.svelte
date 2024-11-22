<script lang="ts">
    import type { Editor } from "@tiptap/core"
    import type { SvelteHTMLElements } from "svelte/elements"

    type RootAttrs = SvelteHTMLElements["div"]

    interface Props extends RootAttrs {
        name: string
        editor: Editor
    }

    const { name, editor, children, ...rest }: Props = $props()
</script>

<div class="size-6 rounded flex items-center justify-center" class:active={editor.isActive(name)} {...rest}>
    {@render children?.()}
</div>
<style>
    .active {
        color: white;
        background-color: hsl(var(--primary));
    }
</style>
