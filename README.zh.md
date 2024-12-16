# TipTap Contentful Example

![first view](./example/public/doc-imgs/first-view.png)
![first view 2](./example/public/doc-imgs/first-view2.png)

当前项目刚结束探索阶段，基于`Svelte`和`Tiptap`实现一个`WYSIWYG`富文本编辑器，目前能通过
技术手段实现再github pages部署静态文档，但不够开箱即用，还处于很原型的阶段。

项目的目标是实现一个`HTML5 Copy/Paste`友好 & `Email`格式友好 & `Markdown`友好的WYSIWYG富文本编辑器。
编辑器将用于个人博客、邮件编辑器、博客文章快速复制粘贴到微信公众号、掘金、知乎等平台发布。

## [前往 GitHub.io Demo Playground 体验现有功能](https://aolyang.github.io/tiptap-contentful)

我在playground里持续补充文档和新的，希望能帮助到各位想入门编辑器开发的开发者。目前实现的功能：

1. 基本的标记（Marks)，文本样式（TextStyl: 字体、字号、颜色、背景色、缩进、对齐等）
2. 列表（无序、有序、任务列表），引用，表情，行内代码、代码块，图片，链接，表格等
3. 已经初具规模的工具栏，（没有UI）图标完全手工调整对齐的svg icon一套，感谢 [iconify](https://icon-sets.iconify.design/)
4. 目录，快速跳转
5. 简单实现的一个i18n功能
6. （开发模式）自动保存功能，资源管理侧边栏，CI/CD部署到github.io

❗️❗️❗ 项目仍处于原型阶段，还有许多功能需要实现。如果您有任何建议或想法，请随时提出问题（目前变动很大很快，暂不接受PR）🙏
❗️❗️❗ Dev Mode下的自动保存目前仅Swap文件，打包前记得手动复制过去（实在是没实现自动交换和保存，后面会做桌面应用）

## 编辑器功能对比（持续完善中）

目标是实现开发使用的主流平台能尽可能复制过去就能保持格式，
基于此编辑器实现个人博客系统之后，开发者能直接将文章复制到微信公众号等平台快速发布

但同时，此编辑器还会支持普通富文本原不能支持的： 代码playground，MDX等高级功能

+ 当前实践状态:  
  ✅ 支持; ❌ 不支持; ⏳ 正在开发; 🚧 计划中;
+ 其他编辑器状态:  
  🆗 部分支持; 📋 粘贴支持;

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
| code-block             | ✅                | ✅ 📋 (paste)    |
| image                  | ✅                | ✅               |

## 项目结构（欢饮交流）

+ `packages/*`: 自定义组件、公共库都在这里（暂无发布npm计划）.
+ `example`: demo playground实现的完整代码.
+ `example/dev-server.mjs`: 开发模式下提供 `/content` api 进行文件读取保存的能力，vite通过middleware mode集成.
+ `src/App.svelte`: 主页面（就这一个），编辑器和工具栏，编辑器状态上下文
+ `src/icons/toolbars`: 所有工具栏用到svg icon，整套手工调整对齐
+ `src/icons/*`: 其他SVG icon.
+ `src/components/ui`: shadcn-svelte components, 配置文件 `src/components.josn`
+ `src/components/Toolbar.svelte`: 工具栏的入口文件.
+ `src/components/toolbars/*.svelte`: 所有的工具栏交互按钮、调用Editor实现的功能代码文件都在这里.
+ `src/states/*.svelte.ts`: 全局状态，参照vue的store理解. (editor state, theme, color picker  histories ...)
+ `src/assets/noto-emojis-v16.json`: Google Emoji图标元数据文件（NotoEmoji metadata json file）.
+ `public/NotoColorEmoji.ttf`: Google Emoji字体（NotoEmoji font file），没有这个字体，有些emoji在windows上不可渲染，有其他字体实现也可以的.
