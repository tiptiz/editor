import { Code } from '@tiptap/extension-code'

export const InlineCodeBlock = Code.extend({
  name: 'inlineCodeBlock',

  addCommands() {
    return {
      ...this.parent?.(),
      toggleInlineCodeBlock: () => ({ commands, state }) => {
        const { selection } = state
        const { from, to } = selection

        if (selection.empty) {
          return commands.toggleMark(this.name)
        }

        return commands.toggleMark(this.name, { from, to })
      },
    }
  },

  addKeyboardShortcuts() {
    // override original Code extension keymap
    return {
      "Mod-e": () => this.editor.commands.toggleInlineCodeBlock(),
    }
  }
})

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    inlineCodeBlock: {
      toggleInlineCodeBlock: () => ReturnType
    }
  }
}
