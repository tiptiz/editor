<script lang="ts">
    import { onMount } from "svelte"

    export let priority = 0

    let divElement: HTMLDivElement
    let visible = false
    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target !== divElement) return
                if (priority) {
                    setTimeout(() => {
                        visible = entry.isIntersecting
                    }, priority)
                } else {
                    visible = entry.isIntersecting
                }
            })
        })
        observer.observe(divElement)
        return () => {
            observer.disconnect()
        }
    })
</script>

<div {...$$props} bind:this={divElement}>
    {#if visible}
        <slot/>
    {/if}
</div>
