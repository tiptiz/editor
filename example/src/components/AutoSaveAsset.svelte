<script lang="ts">
    import SvgUploadLoading from "@/icons/SvgUploadLoading.svelte"

    import { Button } from "@/components/ui/button"
    import { Checkbox } from "@/components/ui/checkbox"
    import CountDownLoading from "@/components/CountDownLoading.svelte"
    import { globalState } from "@/states/global.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"
    import { saveAsset, sleep } from "@/utils/svelte-helper"

    const ctx = getEditorContext()

    let loading = $state(false)
    let success = $state(false)
    const devSaveInLocal = async () => {
        const content = ctx.editor.getHTML()
        if (!globalState.currentAsset) return

        loading = true
        sleep(900).then(() => success = true)
        await Promise.all([sleep(1500), saveAsset(globalState.currentAsset, content)])
        loading = false
        success = false
    }

    let autoSave = $state(false)
    let continuing = $derived(autoSave && !success)
</script>
<Button class="w-[106px] py-0 px-2 h-7 rounded"
        variant="secondary"
        disabled={!globalState.currentAsset}
        on:click={devSaveInLocal}>
    {#if loading}
        <SvgUploadLoading width="24" height="24" class={success ? "text-primary" : ""}/>
    {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M3 5.75A2.75 2.75 0 0 1 5.75 3h9.965a3.25 3.25 0 0 1 2.298.952l2.035 2.035c.61.61.952 1.437.952 2.299v9.964A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25zM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25A2.25 2.25 0 0 1 8.25 12h7.5A2.25 2.25 0 0 1 18 14.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.286c0-.465-.184-.91-.513-1.238l-2.035-2.035a1.75 1.75 0 0 0-.952-.49V7.25a2.25 2.25 0 0 1-2.25 2.25h-4.5A2.25 2.25 0 0 1 7 7.25V4.5zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25zm-8-15v2.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V4.5z"/>
        </svg>
    {/if}
    <span class="mx-auto">{$t("Save")}</span>
</Button>
<span>{globalState.currentAsset}</span>
<label for="auto-save" class="flex items-center gap-2">
    <Checkbox id="auto-save" bind:checked={autoSave} aria-label="auto save"/>
    Auto save
    <CountDownLoading enable={continuing}
                      count={5}
                      ondispatch={devSaveInLocal}
                      format={v => ` ( ${v}s ) `}/>
</label>
