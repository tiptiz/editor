# TipTap Contentful Example

This is a guide project for exploring `Svelte` and `Tiptap` to create a WYSIWYG rich text editor,
so , this project is **in prototype phase**.

The project final goal is to create a `free` & `open source` & `HTML5 Copy/Paste Friendly`
& `Email Friendly` & `Markdown Friendly` feature rich WYSIWYG rich text editor.

## Features Table

To build a feature rich editor is not easy. Features table collected those features I have done.  
And also the features others editor not supported. Maybe some day supported with paste hook.

+ current practice status:
  ✅ supported; ❌ not support; ⏳ working on; 🚧 planning;
+ other editors status:
  🆗 partially support; 📋 paste support;

| features               | current practice | we-chat editor  |
|------------------------|------------------|-----------------|
| undo/redo              | ✅                | ✅               |
| clear marks            | ✅                | ✅               |
| heading                | ✅                | ❌ 📋            |
| fontFamily             | ✅                | ❌ 📋            |
| fontSize               | ✅                | 🆗 (options) 📋 |
| bold                   | ✅                | ✅               |
| italic                 | ✅                | ✅               |
| underline              | ✅                | ✅               |
| strike                 | ✅                | ✅               |
| Sup/sub                | ✅                | ❌ 📋            |
| font-color             | ✅                | ✅               |
| background-color       | ✅ (mark)         | ✅               |
| clear color/bg only    | ✅                | ✅               |
| alignment              | ✅                | ✅               |
| indent                 | ✅                | ✅               |
| line-height            | ✅                | ✅               |
| paragraph margin       | ✅                | ✅               |
| Emoji                  | ✅                | ✅               |
| list                   | ✅                | ✅               |
| TaskList               | ✅                | ❌               |
| list lift/sink         | ✅                | ✅ (margin)      |
| Table                  | ✅                | ❌               |
| Table Head/Cell Toggle | ✅                | ❌ 📋            |
| Table Cell Merge/Split | ✅                | ❌ 📋            |
| Table Row Add/Delete   | ✅                | ❌ 📋            |
| Table Col Add/Delete   | ✅                | ❌ 📋            |
| block-quote            | ✅                | ❌ 📋            |
| code-block             | ⏳                |                 |

## Internal classes table (using)

I'm try my best to use inline style, but using classes to style the editor is can not be avoided.  
So here is the classes table I'm using in this editor

+ ✅ used classes
+ ❌ not support

| internal classes   | extension            | current | we-chat |
|--------------------|----------------------|---------|---------|
| list-paddingleft-1 | taskList, bulletList | ✅       | ✅       |
