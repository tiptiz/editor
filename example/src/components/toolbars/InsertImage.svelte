<script lang="ts">
    import { Button } from "@/components/ui/button"
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import { Input } from "@/components/ui/input"
    import { getEditorContext } from "@/states/toolbar"
    import { t } from "@/utils/i18n"

    import SvgImage from "@/icons/toolbars/SvgImage.svelte"

    let value = ""
    const ctx = getEditorContext()
    const insertImage = () => {
        ctx.editor.chain().focus().setImage({ src: value }).run()
    }
</script>
<DropdownMenu>
    <DropdownMenuTrigger>
        <SvgImage/>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-[400px] flex items-center gap-2 p-2">
        <Input placeholder="URL" class="w-full h-8" bind:value/>
        <Button size="sm" on:click={insertImage}>{$t("Insert image")}</Button>
    </DropdownMenuContent>
</DropdownMenu>
