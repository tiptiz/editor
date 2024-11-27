<script lang="ts">
    import "@/styles/editor.scss"

    import ThemeMode from "@/components/ThemeMode.svelte"
    import Toolbar from "@/components/Toolbar.svelte"
    import { setEditorContext, type ToolbarState } from "@/states/toolbar"
    import { createEditor, headingLevels } from "@/utils/editor"

    import { onMount } from "svelte"
    /*
    * TODO better reset / clear
    * 1. reset text heading,bold to normal but not clear color & backgroundColor
    * 2. clear color/backgroundColor only
    * TODO features
    * list, table, emoji, text align, resize box, resize image, resize video, codepen
    * */
    const state = $state<ToolbarState>({
        isBold: false,
        isItalic: false,
        isStrike: false,
        isUnderline: false,
        isHeading: 0,
        ...createEditor({
            onTransaction({ editor }) {
                state.editor = editor
                state.isBold = editor.isActive("bold")
                state.isItalic = editor.isActive("italic")
                state.isStrike = editor.isActive("strike")
                state.isUnderline = editor.isActive("underline")
                state.isHeading = headingLevels.find(level => editor.isActive(`heading`, { level })) || 0
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
    <div class="w-full min-h-[52px] px-4 border flex items-center bg-background">
        <div class="flex-1"></div>
        <ThemeMode/>
    </div>
    <Toolbar/>
    <hr/>
</div>
<div class="size-full pt-[120px] pb-4 bg-accent">
    <div class="size-full overflow-y-auto px-4">
        <div class="max-w-[826px] min-h-full mx-auto bg-white dark:bg-neutral-700"
             bind:this={divRef}></div>
    </div>
</div>
