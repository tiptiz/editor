import type { Node as ProseMirrorNode } from "prosemirror-model"
import type { PluginShikiOptions } from "./proseMirrorShikiView"

import { getShiki } from "./highlighter"

import { findChildren } from "@tiptap/core"
import { Decoration, DecorationSet } from "@tiptap/pm/view"

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

        const showLineNumbers = block.node.attrs.showLineNumbers
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
        baseSpan.classList.add("line-number")
        baseSpan.innerText = "\u200B"

        lines.forEach((lineTokens, index) => {
            if (showLineNumbers) {
                const span = baseSpan.cloneNode(true) as HTMLElement
                span.setAttribute("line", String(index + 1))

                const decoration = Decoration.widget(from, () => span, {
                    side: -1,
                    ignoreSelection: true,
                    destroy() {
                        span.remove()
                    }
                })
                decorations.push(decoration)
            }
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
