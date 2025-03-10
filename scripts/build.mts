import concurrently from "concurrently"
import $ from "shelljs"

const filter = (dirs: string[]) => dirs.filter(dir => !$.test("-d", `packages/${dir}/dist`))

const force = process.argv.some(arg => arg === "--force" || arg === "-F")

const build = async (dirs: string[], color = "green") => {
    return Promise
        .resolve(force ? dirs : filter(dirs))
        .then((dirs) => {
            return dirs.map(dir => ({
                name: dir,
                command: `pnpm --filter ./packages/${dir} build`
            }))
        })
        .then((tasks) => {
            if (!tasks.length) {
                console.log("Nothing need to build")
                return
            }
            return concurrently(tasks, {
                prefix: "build",
                prefixColors: color
            }).result
        })
}

const libs = $.ls("packages").filter(dir => dir.startsWith("tiptiz-extension"))

await build(libs)
await build(["tiptiz-editor-icons", "tiptiz-editor-components"])
