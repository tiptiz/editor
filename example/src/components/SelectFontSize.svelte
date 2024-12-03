<script lang="ts">
    import AutoComplete, { type SelectOption } from "@/components/AutoComplete.svelte"
    import EditorTransactionEvent from "@/components/EditorTransactionEvent.svelte"
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { css } from "@/utils/config"

    const ctx = getEditorContext()
    const sizes = [12, 14, 15, 16, 17, 18, 20, 22, 24, 26]
    const items: SelectOption[] = sizes.map((size) => {
        const label = `${size}px`
        return { label, value: label }
    })

    const handleSelect = (item: SelectOption) => {
        ctx.editor.chain().focus().setFontSize(item.value).run()
    }
    let currentFontSize: string
    const handleTr = () => {
        currentFontSize = ctx.editor.getAttributes("textStyle")?.fontSize
    }
    const currentColor = (fontSize: string) => {
        return currentFontSize === fontSize ? "hsl(var(--primary))" : "inherit"
    }
</script>

{#snippet label(item: SelectOption)}
    <p style={css`
            font-size: ${item.label};
            color: ${currentColor(item.label)}
       `}>
        {item.label}
    </p>
{/snippet}
<EditorTransactionEvent handler={handleTr}/>
<Tooltip label="select font-size">
    <AutoComplete class="w-[100px]" items={items} {label} {handleSelect} placeholder={currentFontSize || "Font Size"}/>
</Tooltip>
