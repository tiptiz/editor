export const enum EditorKeymap {
    Undo = "Mod+Z",
    Redo = "Mod+Shift+Z/Mod+Y",
    // UnsetAllMarks = ...
    SelectHeadingLevel = "Mod+Alt+{Level}",

    Bold = "Mod+B",
    Italic = "Mod+I",
    Underline = "Mod+U",
    Strike = "Mod+Shift+X",
    Superscript = "Mod+.",
    Subscript = "Mod+,",

    AlignLeft = "Mod+Shift+L",
    AlignCenter = "Mod+Shift+E",
    AlignRight = "Mod+Shift+R",
    AlignJustify = "Mod+Shift+J",

    IncreaseIndent = "Mod+]",
    DecreaseIndent = "Mod+[",

    InsertBulletList = "Mod+Shift+8",
    InsertTaskList = "Mod+Shift+9",
    BreakList = "Enter",
    SinkListItem = "Tab",
    LiftListItem = "Shift+Tab",

    Blockquote = "Mod+Shift+B",
    CodeBlock = "Mod+Shift+C"
}
