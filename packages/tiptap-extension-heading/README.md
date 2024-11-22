## tiptap-extension-heading

This package extends [@tiptap/extension-heading](https://tiptap.dev/docs/editor/extensions/nodes/heading) extension.

provide style initialize for heading node.

## Usage

```typescript
import Heading from "tiptap-extension-heading"

const editor = new Editor({
    element,
    extensions: [
        // ...
        // this is builtin default configuration
        Heading.configure({
            HTMLAttributes: {
                h1: { style: "font-size: 1.625em; font-weight: bolder; margin-top: 0.5em" },
                h2: { style: "font-size: 1.250em; font-weight: bold; margin-top: 0.5em" },
                h3: { style: "font-size: 1.125em; font-weight: bold; margin-top: 0.3em" },
                h4: { style: "font-size: 1.000em; font-weight: bold; margin-top: 0.3em" }
            }
        })
    ]
})
```

## Options

`HTMLAttributes` type now is:
```typescript
type Level = 1 | 2 | 3 | 4 | 5 | 6
type HTMLAttributes = Record<`h${Level}` | "all", any>
```

you can apply configs to all heading nodes:
```typescript
Heading.configure({
    HTMLAttributes: {
        all: { class: "heading-node", style: "font-family: 'Arial', sans-serif" }
    }
})
```
