import type { Node as ProseMirrorNode } from "prosemirror-model"
import type { PluginShikiOptions } from "./proseMirrorPluginShiki"

import { findChildren } from "@tiptap/core"
import { Decoration, DecorationSet } from "@tiptap/pm/view"

import { getShiki } from "./highlighter"

type DecorationsOptions = PluginShikiOptions & {
    doc: ProseMirrorNode
}

export function getDecorations({
    doc,
    name,
    defaultTheme,
    defaultLanguage
}: DecorationsOptions) {
    const decorations: Decoration[] = []

    const codeBlocks = findChildren(doc, node => node.type.name === name)

    codeBlocks.forEach((block) => {
        const highlighter = getShiki()

        if (!highlighter) return

        const highlightLines = new Set<string>(block.node.attrs.highlightLines)
        let language = block.node.attrs.language || defaultLanguage

        if (!highlighter.getLoadedLanguages().includes(language)) {
            language = "plaintext"
        }

        let theme = block.node.attrs.theme || defaultTheme
        const themeToApply = highlighter.getLoadedThemes().includes(theme)
            ? theme
            : highlighter.getLoadedThemes()[0]

        const lines = highlighter.codeToTokensBase(block.node.textContent, {
            lang: language,
            theme: themeToApply
        })

        let from = block.pos + 1

        const baseSpan = document.createElement("span")
        baseSpan.innerText = "\u200B"

        lines.forEach((lineTokens, index) => {
            const lineIndex = String(index + 1)
            const span = baseSpan.cloneNode(true) as HTMLElement
            span.classList.add("line-number")
            span.setAttribute("line", lineIndex)

            if (highlightLines.has(lineIndex)) span.classList.add("highlighted")

            const decoration = Decoration.widget(from, () => span, {
                side: -1,
                ignoreSelection: true,
                destroy() {
                    span.remove()
                }
            })
            decorations.push(decoration)

            for (const token of lineTokens) {
                const to = from + token.content.length

                const decoration = Decoration.inline(from, to, {
                    style: `color: ${token.color}`
                })

                decorations.push(decoration)

                from = to
            }

            from += 1
        })
    })

    return DecorationSet.create(doc, decorations)
}
