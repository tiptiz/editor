<script lang="ts">
    import EditorTransactionEvent from "@/components/EditorTransactionEvent.svelte"
    import AutoComplete, { type SelectOption } from "@/components/SimpleSelect.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"

    import { css } from "../../../../packages/tiptiz-utils-shared"

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
<AutoComplete class="w-[110px]" items={items} {label} {handleSelect} placeholder={currentFontSize || $t("Font Size")}/>
