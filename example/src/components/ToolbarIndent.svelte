<script lang="ts">
    import SvgIndentDec from "@/icons/toolbars/SvgIndentDec.svelte"
    import SvgIndentInc from "@/icons/toolbars/SvgIndentInc.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const ctx = getEditorContext()

    const handleIndentInc = () => {
        ctx.editor.chain().focus().indent().run()
    }
    const handleIndentDec = () => {
        ctx.editor.chain().focus().outdent().run()
    }
</script>

<SvgIndentInc onclick={handleIndentInc}/>
<SvgIndentDec onclick={handleIndentDec}/>
