<script lang="ts">
    import SvgBrush from "@/icons/toolbars/SvgBrush.svelte"
    import SvgClear from "@/icons/toolbars/SvgClear.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const ctx = getEditorContext()
    const clear = () => {
        ctx.editor.chain().focus().clearNodes().run()
        ctx.editor.chain().focus().unsetAllMarks().run()
    }
</script>

<SvgClear onclick={clear}/>
<SvgBrush class="cursor-not-allowed"/>
