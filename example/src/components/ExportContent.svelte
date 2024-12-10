<script lang="ts">
    import { Button } from "@/components/ui/button"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"

    const ctx = getEditorContext()

    const saveFile = (content: string, ext: "json" | "html") => {
        let fileName = window.prompt("Enter a file name")
        if (!fileName) fileName = "tiptap-contentful." + ext
        else if (!fileName.endsWith("." + ext)) {
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
</script>

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
