<script lang="ts">
    import { onMount } from "svelte";
    import { getEditorContext } from "@/states/toolbar";
    import EditorTransactionEvent from "@/components/EditorTransactionEvent.svelte";

    const ctx = getEditorContext();

    let headings: { level: number; text: string }[] = [];

    const updateHeadings = () => {
        const doc = ctx.editor.state.doc;
        const newHeadings: { level: number; text: string }[] = [];

        doc.descendants((node) => {
            if (node.type.name === "heading") {
                newHeadings.push({
                    level: node.attrs.level,
                    text: node.textContent,
                });
            }
        });

        headings = newHeadings;
    };

    onMount(() => {
        updateHeadings();
    });
</script>

<EditorTransactionEvent handler={updateHeadings} />

<div class="toc">
    <h2>Table of Contents</h2>
    <ul>
        {#each headings as heading}
            <li style="font-size: 14px; font-weight: {heading.level === 1 ? 'bold' : 'normal'};">
                <a href="#">{heading.text}</a>
            </li>
        {/each}
    </ul>
</div>

<style>
    .toc {
        position: fixed;
        top: 120px;
        right: 20px;
        width: 200px;
        background: white;
        border: 1px solid #ccc;
        padding: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .toc h2 {
        margin-top: 0;
    }

    .toc ul {
        list-style: none;
        padding-left: 0;
    }

    .toc li {
        margin-bottom: 5px;
    }
</style>
