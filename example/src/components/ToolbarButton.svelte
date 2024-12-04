<script lang="ts">
    import type { Snippet } from "svelte"
    import type { ButtonProps } from "@/components/ui/button"

    import { Button } from "@/components/ui/button"

    interface Props {
        class?: string
        children?: Snippet
    }
    const { class: classes, children, ...restProps }: Props & ButtonProps = $props()
</script>

<Button class={`p-0 h-auto ${classes}`} variant="ghost" {...restProps}>
    {@render children?.()}
</Button>
