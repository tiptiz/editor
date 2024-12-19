# TipTap Contentful Example

## [[简体中文]](./README.md) | [[Playground & Articles]](https://tiptiz.github.io/editor)

| Light Mode                                              | Dark Mode                                                  |
|---------------------------------------------------------|------------------------------------------------------------|
| ![first view](./example/public/doc-imgs/first-view.png) | ![first view 2](./example/public/doc-imgs/first-view2.png) |

This is a practice project for exploring `Svelte` and `Tiptap` to create a `WYSIWYG` rich text editor.
Yeah, this project is **in prototype phase**.🤣

This project's final goal is to be able to be a `HTML5 Copy/Paste Friendly` & `Email Friendly` & `Markdown Friendly`
feature rich WYSIWYG rich text editor.

Before first public release, I will mainly use Chinese, but, a Q & Issue in English is OK.  
Resources will release a docs with English too, after the first public release.

### [[Goto GitHub.io Playground for the details]](https://tiptiz.github.io/editor)
### [[Goto Issues for the details and records]](https://github.com/tiptiz/editor/issues)

I wrote a post on this demo page to show how I built it. Hopefully, it can help you, and I'm very grateful for your
feedback.

1. basic Marks, Styles(fontFamily, fontSize, ColorPicker, Indent/Outdent, Text Alignment)
2. BulletList/TaskList, Blockquote, Emojis, InlineCode/Code Block, Image, Link, Table...
3. nice toolbars with manually adjusted svg icons (thanks [iconify](https://icon-sets.iconify.design/))
4. table of contents with quick navigation jump
5. builtin light i18n system
6. (dev mode) assets auto save and assets sidebar, deploy to github.io by CI/CD in production

❗️❗️❗ This project is still in the prototype phase, and there are still many features to be implemented, update very
fast. If you have any
suggestions or ideas, please feel free to open an issue (Currently PR not welcome)🙏     
❗️❗️❗ And be careful while saving content, there is no swap file yet.

## Editor feature compatible tables (updating fast 🚀🚀🚀)

Goto collection issue for details: https://github.com/tiptiz/editor/issues/29

+ current practice status:  
  ✅ supported; ❌ not support; ⏳ working on; 🚧 planning;
+ other editors status (mainly paste to):  
  🆗 partially support; 📋 paste support;

| features                 | 本编辑器 | markdown | 微信公众号 | 知乎 | 掘金富文本 |
|--------------------------|------|----------|-------|----|-------|
| Undo/Redo                | ✅    | ✅        | ✅     | ✅  | ✅     |
| clear marks              | ✅    | ❌        | ✅     | ✅  | ❌     |
| bold                     | ✅    | ✅        | ✅     | ✅  | ✅     |
| italic                   | ✅    | ✅        | ✅     | ✅  | ✅     |
| inline code              | ✅    | ✅        | ✅     | ✅  | ✅     |
| strike                   | ✅    | ✅        | ✅     | ✅  | ❌     |
| superscript              | ✅    | ✅        | ❌     | ✅  | ❌     |
| subscript                | ✅    | ✅        | ❌     | ✅  | ❌     |
| underline                | ✅    | ✅        | ✅     | ✅  | ✅     |
| fontFamily               | ✅    | ❌        | ✅     | ❌  | ❌     |
| fontSize                 | ✅    | ❌        | ✅     | ❌  | ❌     |
| HeadingLevel             | ✅    | ✅        | ✅     | ❌  | ✅     |
| link                     | ✅    | ✅        | ❌     | ✅  | ✅     |
| blockquote               | ✅    | ✅        | ✅     | ✅  | ✅     |
| fontColor                | ✅    | ❌        | ✅     | ❌  | ❌     |
| bgColor                  | ✅    | ❌        | ✅     | ❌  | ❌     |
| Clear font/bg color only | ✅    | ❌        | ✅     | ❌  | ❌     |
| Hr                       | ✅    | ✅        | ✅     | ✅  | ❌     |
| BulletList               | ✅    | ✅        | ✅     | ✅  | ✅     |
| TaskList                 | ✅    | ✅        | ❌     | ❌  | ❌     |
| Alignment                | ✅    |          |       |    |       |
| Indent/Outdent           | ✅    |          |       |    |       |
| LineHeight               | ✅    |          |       |    |       |
| Paragraph Margin         | ✅    |          |       |    |       |
| Emoji                    | ✅    |          |       |    |       |
| Table                    | ✅    |          |       |    |       |
| Table Head/Cell Toggle   | ✅    |          |       |    |       |
| Table Cell Merge/Split   | ✅    |          |       |    |       |
| Table Row Add/Delete     | ✅    |          |       |    |       |
| Table Col Add/Delete     | ✅    |          |       |    |       |
| Code Block               | ✅    |          |       |    |       |
| Image                    | ✅    |          |       |    |       |
| Table Layout             | 🚧   |          |       |    |       |
| Float layout             | 🚧   |          |       |    |       |

## Internal classes table (Not done yet)

To compact with other rich text editors, I'm try my best to use inline style.
But using classes to style the editor is can not be avoided. So here is the classes table I'm using in this editor

+ ✅ used classes
+ ❌ not support

| internal classes   | extension            | current | we-chat |
|--------------------|----------------------|---------|---------|
| list-paddingleft-1 | taskList, bulletList | ✅       | ✅       |

## Project structure

This project is a monorepo based on pnpm workspaces.

+ `packages/*`: customized extensions.
+ `example`: this demo page.
+ `example/dev-server.mjs`: provide `/content` api, and serve vite (as middleware mode).
+ `src/App.svelte`: Page layout (editor, toolbars), Editor state context
+ `src/icons/toolbars`: all toolbar SVG icons here are modified to look the same size and support svelte.
+ `src/icons/*`: other SVG icons.
+ `src/components/ui`: shadcn-svelte components, you can see the details in `src/components.josn`
+ `src/components/Toolbar.svelte`: toolbar entry component.
+ `src/components/toolbars/*.svelte`: all toolbar and editor features implemented here.
+ `src/states/*.svelte.ts`: global shared states. (editor state, theme, color picker histories ...)
+ `src/assets/noto-emojis-v16.json`: Google NotoEmoji metadata json file.
+ `public/NotoColorEmoji.ttf`: Google NotoEmoji font file.

## Run this Project

This project based on `Node 21.7.3`, I personally recommend using [fnm](https://github.com/Schniz/fnm) to manager your
node version.

```bash
> git clone https://github.com/tiptiz/editor.git --depth=1
> cd editor
> fnm install/use # optional
> pnpm install
> cd exmaple 
> node dev-server.mjs # also pnpm server, or you can't use local save
```
