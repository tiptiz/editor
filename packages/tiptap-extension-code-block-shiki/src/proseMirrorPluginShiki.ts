import type { PluginShikiOptions } from "./proseMirrorShikiView"

import { getDecorations } from "./getDecorations"
import { ShikiPluginView } from "./proseMirrorShikiView"

import { findChildren } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"

export function proseMirrorPluginShiki(options: PluginShikiOptions) {
    const { name, defaultLanguage, defaultTheme } = options

    const shikiPlugin: Plugin = new Plugin({
        key: new PluginKey("codeBlockShiki"),

        view(view) {
            return new ShikiPluginView(view, options)
        },

        state: {
            init: (_, { doc }) => {
                return getDecorations({ doc, ...options })
            },
            apply: (transaction, decorationSet, oldState, newState) => {
                const oldNodeName = oldState.selection.$head.parent.type.name
                const newNodeName = newState.selection.$head.parent.type.name

                const oldNodes = findChildren(oldState.doc, node => node.type.name === name)
                const newNodes = findChildren(newState.doc, node => node.type.name === name)

                const didChangeSomeCodeBlock = transaction.docChanged && (
                    // Apply decorations if:
                    // selection includes named node,
                    [oldNodeName, newNodeName].includes(name)
                    // OR transaction adds/removes named node,
                    || newNodes.length !== oldNodes.length
                    // OR transaction has changes that completely encapsulate a node
                    // (for example, a transaction that affects the entire document).
                    // Such transactions can happen during collaboration syncing via y-prosemirror, for example.
                    // FIXME: any is not expected, type didn't have a good way to express this.
                    || transaction.steps.some((step: any) => {
                        return (step.from !== undefined && step.to !== undefined
                            && oldNodes.some((node) => {
                                return (
                                    node.pos >= step.from
                                    && node.pos + node.node.nodeSize <= step.to
                                )
                            })
                        )
                    }))

                // only create code decoration when it's necessary to do so
                if (transaction.getMeta("shikiPluginForceDecoration") || didChangeSomeCodeBlock) {
                    return getDecorations({
                        doc: transaction.doc,
                        name,
                        defaultLanguage,
                        defaultTheme
                    })
                }

                return decorationSet.map(transaction.mapping, transaction.doc)
            }
        },

        props: {
            decorations(state) {
                return shikiPlugin.getState(state)
            }
        }
    })

    return shikiPlugin
}
