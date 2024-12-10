<script lang="ts">
    import { Button } from "@/components/ui/button"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"

    const ctx = getEditorContext()

    const saveFile = (content: string, ext: "json" | "html") => {
        let fileName = window.prompt("Enter a file name")
        if (!fileName) return

        if (!fileName.endsWith("." + ext)) {
            fileName += "." + ext
        }

        const blob = new Blob([content], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = fileName
        a.click()
        URL.revokeObjectURL(url)
    }

    // image resources not be packed as base64, so, image will dead anyway.
    const exportAsJSON = () => {
        const content = ctx.editor.getJSON()
        saveFile(JSON.stringify(content, null, 2), "json")
    }
    const exportAsHTML = () => {
        const content = ctx.editor.getHTML()
        saveFile(content, "html")
    }

    const saveInLocal = () => {
        const content = ctx.editor.getHTML()
        console.log("content", content)
        fetch("/content", { method: "PUT", body: content }).then((res) => {
            console.log("res", res.status)
        })
    }
</script>

{#if import.meta.env.DEV}
    <Button class="w-[146px] py-0 px-2 h-7 rounded" variant="secondary" on:click={saveInLocal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...$$props}>
            <path fill="currentColor"
                  d="M3 5.75A2.75 2.75 0 0 1 5.75 3h9.965a3.25 3.25 0 0 1 2.298.952l2.035 2.035c.61.61.952 1.437.952 2.299v9.964A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25zM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25A2.25 2.25 0 0 1 8.25 12h7.5A2.25 2.25 0 0 1 18 14.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.286c0-.465-.184-.91-.513-1.238l-2.035-2.035a1.75 1.75 0 0 0-.952-.49V7.25a2.25 2.25 0 0 1-2.25 2.25h-4.5A2.25 2.25 0 0 1 7 7.25V4.5zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25zm-8-15v2.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V4.5z"/>
        </svg>
        <span class="mx-auto">{$t("Save in local")}</span>
    </Button>
{/if}

<Button class="w-[146px] py-0 px-2 h-7 rounded" variant="secondary" on:click={exportAsJSON}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4m-10 4a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1m4 0a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1a1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/>
        </g>
    </svg>
    <span class="mx-auto">{$t("Export as JSON")}</span>
</Button>
<Button class="w-[146px] py-0 px-2 h-7 rounded" variant="secondary" on:click={exportAsHTML}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" {...$$props}>
        <g stroke="currentColor" stroke-width="0.2">
            <path fill="currentColor"
                  d="M6.35 8.85a.5.5 0 0 0-.707-.707l-1.5 1.5a.5.5 0 0 0 0 .707l1.5 1.5a.5.5 0 0 0 .707-.707L5.2 9.993l1.15-1.15zM8.6 7.01a.5.5 0 0 1 .392.588l-1 5a.5.5 0 0 1-.98-.196l1-5A.5.5 0 0 1 8.6 7.01m3.3 2.64l-1.5-1.5a.5.5 0 0 0-.707.707l1.15 1.15l-1.15 1.15a.5.5 0 0 0 .707.707l1.5-1.5a.5.5 0 0 0 0-.707z"/>
            <path fill="currentColor" fill-rule="evenodd"
                  d="M2 3c0-1.1.895-2 2-2h5.5c.133 0 .26.053.354.146l4 4A.5.5 0 0 1 14 5.5V13c0 1.1-.895 2-2 2H4c-1.1 0-2-.895-2-2zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6H9.5a.5.5 0 0 1-.5-.5V2zm6 .707l2.29 2.29H10z"
                  clip-rule="evenodd"/>
        </g>
    </svg>
    <span class="mx-auto">{$t("Export as HTML")}</span>
</Button>
