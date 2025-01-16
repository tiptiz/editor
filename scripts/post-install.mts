import $ from "shelljs"

// should publish
const libs = [
    "packages/tiptap-extension-code-block-shiki",
    "packages/tiptiz-editor-icons"
]

Promise.all(libs.map(dir =>
    $.exec(`pnpm --filter ./${dir} run build`)
))
    .then(() => console.log("internal libs build success"))
