<script lang="ts">
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuTrigger
    } from "@/components/ui/dropdown-menu"
    import googleNotoEmojis from "@/assets/noto-emojis-v16.json"
    import LazyComponent from "@/components/LazyComponent.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import SvgEmoji from "@/icons/toolbars/SvgEmoji.svelte"

    /*
    *
    * this component is deprecated !!!
    *
    * */
    interface EmojiItemMeta {
        base: number[]
        alternates: number[]
        emoticons: string[]
        shortcodes: string[]
        animated: boolean
        directional: boolean
    }

    interface EmojiMetaData {
        group: string
        emoji: EmojiItemMeta[]
    }

    const emojis = googleNotoEmojis as any as EmojiMetaData[]
    const ctx = getEditorContext()
    const insertEmoji = (emoji: string) => {
        ctx.editor.chain().focus().insertContent(emoji).run()
    }

    // TODO consider more efficient emoji-picker https://github.com/ealush/emoji-picker-react
    // TODO deploy a static assets server to replace https://fonts.gstatic.com/s/e/notoemoji/latest/
    function rgi(codepoints: number[]) {
        return codepoints.map(codepoint => codepoint.toString(16).padStart(4, "0")).join("_")
    }

    function render(codepoints: number[]) {
        return codepoints.map(codepoint => String.fromCodePoint(codepoint)).join("")
    }
</script>

<DropdownMenu>
    <DropdownMenuTrigger>
        <SvgEmoji/>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-2 overflow-y-auto snap-mandatory">
        <div class="emoji_grid">
            {#each emojis as meta}
                <div class="grid__group">
                    <h1 class="grid__group-title">{meta.group}</h1>
                    <div class="grid__group-emojis">
                        {#each meta.emoji as { base, shortcodes }, i}
                            <LazyComponent class="size-9" priority={i}>
                                <button class="size-full emoji__button"
                                        title={shortcodes.join(" ")}
                                        onclick={() => insertEmoji(render(base))}>
                                    <img class="grid__emoji"
                                         src="https://fonts.gstatic.com/s/e/notoemoji/latest/{rgi(base)}/emoji.svg"
                                         loading="lazy" alt={render(base)}/>
                                    <!--{render(base)}-->
                                </button>
                            </LazyComponent>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </DropdownMenuContent>
</DropdownMenu>
<style>
    .emoji_grid {
        height: 320px;
        overflow: auto;
        padding: 12px;
        width: 370px;
    }

    .grid__group-title {
        font-size: 12px;
        margin: 0 0 1em;
        text-transform: uppercase;
    }

    .grid__group-emojis {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        content-visibility: auto;
        gap: 0;
    }

    .emoji__button {
        border: 0;
        align-items: center;
        display: inline-flex;
        justify-content: center;
    }

    .emoji__button:hover {
        background: rgba(0, 0, 0, .07);
        cursor: pointer;
    }

    .emoji__button:focus {
        outline: 2px solid hsl(var(--primary));
    }

    .grid__emoji {
        max-width: 28px;
    }
</style>
