<script lang="ts">
    import { onMount } from "svelte"

    let divElement: HTMLDivElement
    let visible = false
    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target !== divElement) return
                visible = entry.isIntersecting
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
