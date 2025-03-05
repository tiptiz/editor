<script lang="ts">
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import { theme } from "@/states/theme.svelte"
    import { getEditorContext } from "@/states/toolbar"
    import { locale } from "@/utils/i18n"

    import SvgEmoji from "@/icons/toolbars/SvgEmoji.svelte"

    import { css } from "../tiptiz-utils-shared"

    import { Picker } from "emoji-picker-element"
    import en from "emoji-picker-element/i18n/en"
    import zh from "emoji-picker-element/i18n/zh_CN"

    const ctx = getEditorContext()

    const insertEmoji = (emoji: string) => {
        ctx.editor.chain().focus().insertContent(emoji).run()
    }

    const mountPicker = (node: HTMLDivElement) => {
        const picker = new Picker({
            locale: $locale === "zh_CN" ? "zh_CN" : "en",
            i18n: $locale === "zh_CN" ? zh : en
        })
        if (!theme.isDark) picker.classList.add("light")

        picker.style.cssText = css`
            --border-size: 0;
            --background: hsl(var(--background));
            --outline-color: hsl(var(--primary))
        `
        picker.addEventListener("emoji-click", (event: CustomEvent) => {
            insertEmoji(event.detail.unicode)
        })
        node.appendChild(picker)

        $effect(() => () => {
            picker.remove()
        })
    }
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        <SvgEmoji/>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-2">
        <div use:mountPicker></div>
    </DropdownMenuContent>
</DropdownMenu>
