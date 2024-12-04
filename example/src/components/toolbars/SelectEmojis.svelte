<script lang="ts">
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import { getEditorContext } from "@/states/toolbar"
    import { emojis } from "@/utils/editor-presets"
    import { locale } from "@/utils/i18n"

    import SvgEmoji from "@/icons/toolbars/SvgEmoji.svelte"

    const ctx = getEditorContext()
    const insertEmoji = (emoji: string) => {
        ctx.editor.chain().focus().insertContent(emoji).run()
    }
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        <SvgEmoji/>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-2 w-[276px] h-[280px] overflow-y-auto snap-mandatory">
        {#each emojis as emoji}
            <p>{emoji.label[$locale]}</p>
            <div class="w-full mb-4 flex flex-wrap items-center gap-1 ">
                {#each emoji.items.split(" ") as item}
                    <button class="p-1 h-[28px] flex items-center text-[20px] rounded toolbar-icon-trigger"
                            onclick={() => insertEmoji(item)}>
                        {item}
                    </button>
                {/each}
            </div>
        {/each}
    </DropdownMenuContent>
</DropdownMenu>
