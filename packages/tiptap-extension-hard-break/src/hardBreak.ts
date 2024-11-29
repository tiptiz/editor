import TiptapHardBreak from "@tiptap/extension-hard-break"

export const HardBreak = TiptapHardBreak.extend({
    addKeyboardShortcuts() {
        return {
            "Shift-Enter": () => this.editor.commands.setHardBreak()
        }
    }
})
