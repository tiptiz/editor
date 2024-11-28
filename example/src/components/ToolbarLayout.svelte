<script lang="ts">
import SelectListType from "@/components/SelectListType.svelte"
import SvgIndentDec from "@/components/toolbars/SvgIndentDec.svelte"
import SvgIndentInc from "@/components/toolbars/SvgIndentInc.svelte"
import { getEditorContext } from "@/states/toolbar"

const ctx = getEditorContext()

// TODO indent paragraph
const handleIndentInc = () => {
    const listCanSink = ctx.editor.can().sinkListItem("listItem")
    if (ctx.isBulletList && listCanSink) {
        ctx.editor.chain().focus().sinkListItem("listItem").run()
    }
}
const handleIndentDec = () => {
    const listCanLift = ctx.editor.can().liftListItem("listItem")
    if (ctx.isBulletList && listCanLift) {
        ctx.editor.chain().focus().liftListItem("listItem").run()
    }
}
</script>

<SelectListType />
<SvgIndentInc onclick={handleIndentInc}/>
<SvgIndentDec onclick={handleIndentDec}/>
