<script lang="ts">
    import SvgSparkLines from "@/icons/SvgSparkLines.svelte"

    import { globalState, saveState } from "@/states/global.svelte"

    let viewSparkLines = $derived(globalState.viewSparkLines)
    $effect(() => {
        saveState("toolbar-spark-line", viewSparkLines)
    })
</script>

<SvgSparkLines class="hover:cursor-pointer"
               onclick={() => globalState.viewSparkLines = !viewSparkLines}
               width="24" height="24"/>
