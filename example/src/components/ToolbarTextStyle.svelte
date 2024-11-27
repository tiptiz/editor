<script lang="ts">
    import type { HeadingLevel } from "@/utils/editor"

    import HeadingSelect from "@/components/HeadingSelect.svelte"
    import SvgTextBgStyle from "@/components/toolbars/SvgTextBgStyle.svelte"
    import SvgTextMinus from "@/components/toolbars/SvgTextMinus.svelte"
    import SvgTextPlugs from "@/components/toolbars/SvgTextPlugs.svelte"
    import SvgTextStyle from "@/components/toolbars/SvgTextStyle.svelte"
    import { getToolbarContext } from "@/states/toolbar"

    const state = getToolbarContext()
    const editor = () => state.editor

    const setupHeading = (level: HeadingLevel) => {
        editor().chain().focus().toggleHeading({ level }).run()
    }
    const updateFontSize = (size: number) => {
        const editor = state.editor
        const { fontSize = "16px" } = editor.getAttributes("textStyle") ?? {}
        editor.chain().focus()
            .setFontSize(`${parseInt(fontSize) + size}px`)
            .run()
    }
</script>

<SvgTextMinus onclick={() => updateFontSize(-2)}/>
<SvgTextPlugs onclick={() => updateFontSize(2)}/>
<HeadingSelect class={state.isHeading ? "active" : ""}
               level={state.isHeading}
               onselect={setupHeading}/>
<SvgTextStyle/>
<SvgTextBgStyle/>
