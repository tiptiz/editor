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

<EditorTransactionEvent {updateHeadings} />

<div class="toc">
    <h2>Table of Contents</h2>
    <ul>
        {#each headings as heading}
            <li class="heading-{heading.level}">
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

    .toc .heading-1 {
        font-weight: bold;
    }

    .toc .heading-2 {
        padding-left: 10px;
    }

    .toc .heading-3 {
        padding-left: 20px;
    }

    .toc .heading-4 {
        padding-left: 30px;
    }

    .toc .heading-5 {
        padding-left: 40px;
    }

    .toc .heading-6 {
        padding-left: 50px;
    }
</style>
