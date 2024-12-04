<script lang="ts">
    import type { SelectOption } from "@/components/AutoComplete.svelte"

    import AutoComplete from "@/components/AutoComplete.svelte"
    import EditorTransactionEvent from "@/components/EditorTransactionEvent.svelte"
    import Tooltip from "@/components/Tooltip.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { css } from "@/utils/config"

    const fonts = ["Inter", "Roboto", "sans-serif", "serif", "monospace", "cursive", "Arial", "Helvetica", "fantasy"]
    const items: SelectOption[] = fonts.map((font) => {
        return { label: font, value: font }
    })

    const ctx = getEditorContext()
    const handleSelect = (item: SelectOption) => {
        ctx.editor.chain().focus().setFontFamily(item.value).run()
    }
    let currentFontFamily: string
    const handleTr = () => {
        currentFontFamily = ctx.editor.getAttributes("textStyle")?.fontFamily
    }

    const currentColor = (fontFamily: string) => {
        return currentFontFamily === fontFamily ? "hsl(var(--primary))" : "inherit"
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
<Tooltip label="select font-family">
    <AutoComplete class="w-[129px]"
                  items={items} {label} {handleSelect}
                  placeholder={ currentFontFamily || "Font Family"}/>
</Tooltip>
