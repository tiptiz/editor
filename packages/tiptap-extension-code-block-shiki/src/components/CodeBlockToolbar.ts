import { html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"

@customElement("code-block-toolbar")
class CodeBlockToolbar extends LitElement {
    render() {
        return html`
            <h1>Hello world</h1>
        `
    }
}

export default CodeBlockToolbar
