<script lang="ts">
    import { getEditorContext } from "@/states/toolbar"

    import throttle from "lodash/throttle"
    import { onMount } from "svelte"

    const ctx = getEditorContext()

    interface Props {
        handler: () => void
        ms?: number
    }

    const { handler, ms = 200 }: Props = $props()
    onMount(() => {
        const throttleHandler = throttle(handler, ms, { leading: false })
        ctx.editor.on("transaction", throttleHandler)
        return () => {
            ctx.editor.off("transaction", throttleHandler)
        }
    })
</script>
