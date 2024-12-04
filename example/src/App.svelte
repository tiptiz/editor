<script lang="ts">
    import "@/styles/editor.scss"

    import type { ToolbarState } from "@/states/toolbar"

    import ThemeMode from "@/components/ThemeMode.svelte"
    import ToggleSparkLine from "@/components/ToggleSparkLine.svelte"
    import Toolbar from "@/components/Toolbar.svelte"
    import { setEditorContext } from "@/states/toolbar"
    import { aligns, createEditor, headingLevels } from "@/utils/editor"

    import { onMount } from "svelte"
    /*
    * TODO features
    * block quote button, code block
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
        ...createEditor({
            onTransaction({ editor }) {
                state.editor = editor
                state.isBold = editor.isActive("bold")
                state.isItalic = editor.isActive("italic")
                state.isStrike = editor.isActive("strike")
                state.isUnderline = editor.isActive("underline")
                state.isSup = editor.isActive("superscript")
                state.isSub = editor.isActive("subscript")
                state.isHeading = headingLevels.find(level => editor.isActive(`heading`, { level })) || 0
                state.isBulletList = editor.isActive("bulletList")
                state.isTaskList = editor.isActive("taskList")
                state.isTable = editor.isActive("table")
                state.isTextAlign = aligns.find(textAlign => editor.isActive({ textAlign })) || ""
                state.isBlockquote = editor.isActive("blockquote")
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
    <div class="w-full min-h-[52px] px-4 border flex gap-3 items-center bg-background">
        <div class="flex-1"></div>
        <ToggleSparkLine/>
        <ThemeMode/>
    </div>
    <Toolbar/>
    <hr/>
</div>
<div class="size-full pt-[120px] pb-4 bg-accent">
    <div class="size-full overflow-y-auto px-4">
        <div class="max-w-[826px] min-h-full mx-auto bg-white dark:bg-neutral-700 shadow-xl"
             bind:this={divRef}></div>
    </div>
</div>
