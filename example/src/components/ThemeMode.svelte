<script lang="ts">
    import SvgDarkMode from "@/components/SvgDarkMode.svelte"
    import SvgLightMode from "@/components/SvgLightMode.svelte"

    let isDark = $state(localStorage.getItem("theme-mode") === "dark")

    $effect(() => {
        if (isDark) {
            document.body.classList.add("dark")
            localStorage.setItem("theme-mode", "dark")
        } else {
            document.body.classList.remove("dark")
            localStorage.removeItem("theme-mode")
        }
    })
</script>

<button onclick={() => isDark = !isDark}>
    {#if isDark}
        <SvgLightMode width="30px" />
    {:else}
        <SvgDarkMode width="30px" />
    {/if}
</button>
