<script lang="ts">
    import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

    export let label: string
</script>

<Tooltip openDelay={100} closeDelay={0}>
    <TooltipTrigger class="flex">
        <slot/>
    </TooltipTrigger>
    <TooltipContent side="bottom">
        {#if $$slots.label}
            <slot name="label"/>
        {:else}
            <span>{label}</span>
        {/if}
    </TooltipContent>
</Tooltip>
