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
        let from = block.pos + 1
        let language = block.node.attrs.language || defaultLanguage
        let theme = block.node.attrs.theme || defaultTheme

        const highlighter = getShiki()

        if (!highlighter) return

        if (!highlighter.getLoadedLanguages().includes(language)) {
            language = "plaintext"
        }

        const themeToApply = highlighter.getLoadedThemes().includes(theme)
            ? theme
            : highlighter.getLoadedThemes()[0]

        const tokens = highlighter.codeToTokensBase(block.node.textContent, {
            lang: language,
            theme: themeToApply
        })

        for (const line of tokens) {
            for (const token of line) {
                const to = from + token.content.length

                const decoration = Decoration.inline(from, to, {
                    style: `color: ${token.color}`
                })

                decorations.push(decoration)

                from = to
            }

            from += 1
        }
    })

    return DecorationSet.create(doc, decorations)
}
