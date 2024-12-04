<script lang="ts">
    import SvgSparkLines from "@/icons/SvgSparkLines.svelte"
    import { globalState } from "@/states/global.svelte"

    let viewSparkLines = $derived(globalState.viewSparkLines)
    $effect(() => {
        localStorage.setItem("toolbar-spark-line", viewSparkLines ? "1" : "0")
    })
</script>

<SvgSparkLines class="hover:cursor-pointer"
               onclick={() => globalState.viewSparkLines = !viewSparkLines}
               width="20" height="20"/>
