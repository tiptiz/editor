<script lang="ts">
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import SvgIndentDec from "@/icons/toolbars/SvgIndentDec.svelte"
    import SvgIndentInc from "@/icons/toolbars/SvgIndentInc.svelte"

    const ctx = getEditorContext()

    const handleIndentInc = () => {
        ctx.editor.chain().focus().indent().run()
    }
    const handleIndentDec = () => {
        ctx.editor.chain().focus().outdent().run()
    }
</script>

<Tooltip label="increase indent">
    <SvgIndentInc onclick={handleIndentInc}/>
</Tooltip>
<Tooltip label="decrease indent">
    <SvgIndentDec onclick={handleIndentDec}/>
</Tooltip>
