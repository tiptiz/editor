import $ from "shelljs"

// should publish
const libs = [
    "packages/tiptap-extension-code-block-shiki"
]

Promise.all(libs.map(dir =>
    $.exec(`pnpm --filter ./${dir} run build`)
))
    .then(() => console.log("internal libs build success"))