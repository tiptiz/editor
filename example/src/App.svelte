<script lang="ts">
    import "@/styles/editor.scss"

    import type { ToolbarState } from "@/states/toolbar"

    import AssetsTree from "@/components/AssetsTree.svelte"
    import AutoSaveAsset from "@/components/AutoSaveAsset.svelte"
    import ExportContent from "@/components/ExportContent.svelte"
    import Github from "@/components/Github.svelte"
    import TableOfContents from "@/components/TableOfContents.svelte"
    import ToggleAssetsTree from "@/components/ToggleAssetsTree.svelte"
    import ToggleLocale from "@/components/ToggleLocale.svelte"
    import ToggleSparkLine from "@/components/ToggleSparkLine.svelte"
    import ThemeMode from "@/components/ToggleTheme.svelte"
    import ToggleToc from "@/components/ToggleToc.svelte"
    import Toolbar from "@/components/Toolbar.svelte"
    import { setEditorContext } from "@/states/toolbar"
    import { createEditor } from "@/utils/editor"
    import { aligns, headingLevels } from "@/utils/editor-presets"

    import { onMount } from "svelte"
    /*
    * TODO features
    *  code block
    * emoji, resize box, resize image, resize video, codepen
    * */
    const state = $state<ToolbarState>({
        isBold: false,
        isItalic: false,
        isStrike: false,
        isUnderline: false,
        isSup: false,
        isSub: false,
        isHeading: 0,
        isBulletList: false,
        isTaskList: false,
        isTable: false,
        isTextAlign: "",
        isBlockquote: false,
        isCodeBlock: false,
        ...createEditor({
            onTransaction({ editor }) {
                state.editor = editor
                state.isBold = editor.isActive("bold")
                state.isItalic = editor.isActive("italic")
                state.isStrike = editor.isActive("strike")
                state.isUnderline = editor.isActive("underline")
                state.isSup = editor.isActive("superscript")
                state.isSub = editor.isActive("subscript")
                state.isHeading = headingLevels.find(level => editor.isActive("heading", { level })) || 0
                state.isBulletList = editor.isActive("bulletList")
                state.isTaskList = editor.isActive("taskList")
                state.isTable = editor.isActive("table")
                state.isTextAlign = aligns.find(textAlign => editor.isActive({ textAlign })) || ""
                state.isBlockquote = editor.isActive("blockquote")
                state.isCodeBlock = editor.isActive("codeBlock")
            }
        })
    })
    setEditorContext(state)

    let divRef: HTMLDivElement
    onMount(() => {
        divRef.appendChild(state.container)
        return () => {
            state.editor.destroy()
        }
    })
</script>

<div class="w-full h-[104px] fixed top-0 z-10">
    <div class="w-full min-h-[52px] px-4 shadow flex gap-3 items-center bg-background dark:bg-neutral-700">
        <ToggleAssetsTree/>
        <ExportContent/>
        <div class="flex-1"></div>
        {#if import.meta.env.DEV}
            <AutoSaveAsset/>
        {/if}
        <div class="flex-1"></div>
        <Github href="https://github.com/tiptiz/editor" target="_blank" width="24" height="24"/>
        <ToggleToc/>
        <ToggleLocale/>
        <ToggleSparkLine/>
        <ThemeMode/>
    </div>
    <Toolbar/>
    <hr class="dark:border-neutral-600"/>
</div>
<div class="size-full pt-[120px] pb-4 bg-accent dark:bg-neutral-800">
    <div class="size-full overflow-y-auto px-4">
        <div class="px-10 py-6 max-w-[826px] min-h-full mx-auto bg-white dark:bg-neutral-700 shadow-xl"
             bind:this={divRef}></div>
    </div>
</div>
<AssetsTree/>
<TableOfContents/>
