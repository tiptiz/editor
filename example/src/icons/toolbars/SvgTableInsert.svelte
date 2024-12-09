<script lang="ts">
    import type { TableInsertTarget } from "@/utils/editor-presets"

    export let target: TableInsertTarget
</script>
{#if target === "row below"}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" {...$$restProps}>
        <path fill="currentColor"
              d="M904 768H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8m-25.3-608H145.3c-18.4 0-33.3 14.3-33.3 32v464c0 17.7 14.9 32 33.3 32h733.3c18.4 0 33.3-14.3 33.3-32V192c.1-17.7-14.8-32-33.2-32M360 616H184V456h176zm0-224H184V232h176zm240 224H424V456h176zm0-224H424V232h176zm240 224H664V456h176zm0-224H664V232h176z"/>
    </svg>
{:else if target === "row above"}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" {...$$restProps}>
        <path fill="currentColor"
              d="M878.7 336H145.3c-18.4 0-33.3 14.3-33.3 32v464c0 17.7 14.9 32 33.3 32h733.3c18.4 0 33.3-14.3 33.3-32V368c.1-17.7-14.8-32-33.2-32M360 792H184V632h176zm0-224H184V408h176zm240 224H424V632h176zm0-224H424V408h176zm240 224H664V632h176zm0-224H664V408h176zm64-408H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8"/>
    </svg>
{:else if target === "col before"}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" {...$$restProps}>
        <path fill="currentColor"
              d="M248 112h-80c-4.4 0-8 3.6-8 8v784c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V120c0-4.4-3.6-8-8-8m584 0H368c-17.7 0-32 14.9-32 33.3v733.3c0 18.4 14.3 33.3 32 33.3h464c17.7 0 32-14.9 32-33.3V145.3c0-18.4-14.3-33.3-32-33.3M568 840H408V664h160zm0-240H408V424h160zm0-240H408V184h160zm224 480H632V664h160zm0-240H632V424h160zm0-240H632V184h160z"/>
    </svg>
{:else if target === "col after"}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" {...$$restProps}>
        <path fill="currentColor"
              d="M856 112h-80c-4.4 0-8 3.6-8 8v784c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V120c0-4.4-3.6-8-8-8m-200 0H192c-17.7 0-32 14.9-32 33.3v733.3c0 18.4 14.3 33.3 32 33.3h464c17.7 0 32-14.9 32-33.3V145.3c0-18.4-14.3-33.3-32-33.3M392 840H232V664h160zm0-240H232V424h160zm0-240H232V184h160zm224 480H456V664h160zm0-240H456V424h160zm0-240H456V184h160z"/>
    </svg>
{/if}
