<script lang="ts">
    import SvgIndentDec from "@/icons/toolbars/SvgIndentDec.svelte"
    import SvgIndentInc from "@/icons/toolbars/SvgIndentInc.svelte"
    import { getEditorContext } from "@/states/toolbar"

    const ctx = getEditorContext()

    const handleIndentInc = () => {
        const chain = ctx.editor.chain()
        // const listCanSink = ctx.editor.can().sinkListItem("listItem")
        if (ctx.isBulletList) {
            chain.sinkListItem("listItem").run()
        } else {
            chain.focus().indent().run()
        }
    }
    const handleIndentDec = () => {
        const chain = ctx.editor.chain()
        // const listCanLift = ctx.editor.can().liftListItem("listItem")
        if (ctx.isBulletList) {
            chain.liftListItem("listItem").run()
        } else {
            chain.focus().outdent().run()
        }
    }
</script>

<SvgIndentInc onclick={handleIndentInc}/>
<SvgIndentDec onclick={handleIndentDec}/>
