<script lang="ts">
    import SvgClipboard from "../icons/SvgClipboard.svelte"
    import SvgCopied from "../icons/SvgCopied.svelte"

    import { toolbarsState } from "./Toolbars.state.svelte"

    interface Props {
        copyContent: () => void
    }

    const { copyContent }: Props = $props()

    let barState = $state({
        copied: false
    })

    const handleCopy = (e: MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()

        barState.copied = true
        copyContent()
        window.setTimeout(() => {
            barState.copied = false
        }, 1500)
    }
</script>

<div class="code-block-toolbar">
    <div style="margin-left: auto"></div>
    {#if toolbarsState.isHovering}
        <button onclick={e => handleCopy(e)} style="user-select: none">
            {#if barState.copied}
                <SvgCopied class="svg-icon-copied" width="26" height="26"/>
            {:else}
                <SvgClipboard width="26" height="26"/>
            {/if}
        </button>
    {/if}
</div>
