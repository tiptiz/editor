# if you familiar with @mdi/js

https://github.com/Templarian/MaterialDesign-JS?tab=readme-ov-file#readme

```jsx
import { mdiIcon } from "@mdi/js"
import { ediUndo, ediRedo } from "@tiptiz/editor-icons"

import { Icon } from "@mdi/react"

console.log(ediUndo) // "M...Z"
export default function Toolbar() {
    return (<>
        <Icon path={ediUndo} />
        <Icon path={ediRedo} />
        <Icon path={mdiIcon} />
    </>)
}
```
