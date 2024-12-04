<script lang="ts">
    import { getEditorContext } from "@/states/toolbar"

    import SvgBrush from "@/icons/toolbars/SvgBrush.svelte"
    import SvgClear from "@/icons/toolbars/SvgClear.svelte"

    const ctx = getEditorContext()
    const clear = () => {
        ctx.editor.chain().focus().clearNodes().run()
        ctx.editor.chain().focus().unsetAllMarks().run()
    }
</script>

<SvgClear onclick={clear}/>
<SvgBrush class="cursor-not-allowed"/>
