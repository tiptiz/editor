<script lang="ts">
    import SvgDarkMode from "@/icons/SvgDarkMode.svelte"
    import SvgLightMode from "@/icons/SvgLightMode.svelte"

    import { theme } from "@/states/theme.svelte"

    theme.isDark = localStorage.getItem("theme-mode") === "dark"

    $effect(() => {
        if (theme.isDark) {
            document.body.classList.add("dark")
            localStorage.setItem("theme-mode", "dark")
        } else {
            document.body.classList.remove("dark")
            localStorage.removeItem("theme-mode")
        }
    })
</script>

<button onclick={() => theme.isDark = !theme.isDark}>
    {#if theme.isDark}
        <SvgLightMode width="20" height="20"/>
    {:else}
        <SvgDarkMode width="20" height="20"/>
    {/if}
</button>
