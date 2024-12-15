<script lang="ts">
    import EditorTransactionEvent from "@/components/EditorTransactionEvent.svelte"
    import { globalState } from "@/states/global.svelte"
    import { getEditorContext } from "@/states/toolbar"

    import { onMount } from "svelte"

    const ctx = getEditorContext()

    type Heading = { level: number, text: string, pos: number }

    let headings: Heading[] = []

    const updateHeadings = () => {
        const doc = ctx.editor.state.doc
        const newHeadings: Heading[] = []

        doc.descendants((node, pos) => {
            if (node.type.name === "heading") {
                newHeadings.push({
                    level: node.attrs.level,
                    text: node.textContent,
                    pos
                })
            }
        })

        headings = newHeadings
    }

    const jump2Node = (heading: Heading) => {
        const dom = ctx.editor.view.nodeDOM(heading.pos) as HTMLElement | null
        dom?.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    onMount(() => {
        updateHeadings()
    })
</script>

<EditorTransactionEvent handler={updateHeadings}/>

<div class="toc shadow-xl fixed bg-white dark:bg-neutral-700" class:active={globalState.viewToc}>
    <h1 class="px-4 py-2">Table of Contents</h1>
    <hr/>
    <ul class="overflow-y-auto px-4" style="height: calc(100% - 50px)">
        {#each headings as heading}
            <li class={`my-2 h${heading.level} cursor-pointer`}>
                <button class="text-left" onclick={() => jump2Node(heading)}>
                    <span>{heading.text}</span>
                </button>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    .toc {
        position: fixed;
        z-index: 999;
        top: 120px;
        right: 10px;
        width: 400px;
        height: 70%;
        transform: translateX(400px);
        transition: transform 0.3s;
    }

    .toc.active {
        transform: translateX(0);
    }

    .toc h1 {
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 900;
    }

    .toc ul {
        li {
            border: 1px solid #00000000;

            &:hover {
                border: 1px solid hsl(var(--primary) / 20);
            }
        }

        li.h1 {
            margin-bottom: 16px;
            font-size: 18px;
            font-weight: 900;
        }

        li.h2 {
            font-weight: 600;
        }

        li.h3 {
            font-size: 15px;
            padding-left: 20px;
        }

        li.h4 {
            font-size: 14px;
            padding-left: 40px;
        }
    }

</style>
