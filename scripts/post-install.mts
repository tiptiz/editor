import concurrently from "concurrently"
import $ from "shelljs"

const libs = $.ls("packages").filter(dir => dir.startsWith("tiptiz-extension"))

const checked = libs.filter(dir => !$.test("-d", `packages/${dir}/dist`))

const force = process.argv.some(arg => arg === "--force" || arg === "-F")

concurrently((force ? libs : checked).map(dir => ({
    name: dir,
    command: `pnpm --filter ./packages/${dir} build`
})), {
    prefix: "build extension",
    prefixColors: "green"
})
