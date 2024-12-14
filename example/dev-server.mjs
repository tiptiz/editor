import fs from "node:fs"
import path from "node:path"
import URL from "node:url"

import express from "express"

const __dirname = URL.fileURLToPath(path.dirname(import.meta.url))

const app = express()
const content = express.Router()

/** @param target {string} */
const fileTarget = target => path.resolve(__dirname, "./src/assets", target)

/** @param target {string} */
const fileSwapTarget = (target) => {
    let swap = target
    if (!target.endsWith(".swap.html")) swap = target.replace(".html", ".swap.html")
    return swap
}

/** @param target {string} */
const promiseSwapFile = (target) => {
    let swap = fileSwapTarget(target)
    fs.copyFileSync(target, swap)
    return swap
}

content.get("/content", (req, res) => {
    let target = fileTarget(req.query.filepath)
    let swap = fileSwapTarget(target)

    if (fs.existsSync(swap)) res.sendFile(swap)
    else res.sendFile(target)
})
content.put("/content", (req, res) => {
    let relativePath = req.headers["content-file-path"]
    if (relativePath instanceof Array && relativePath.length) relativePath = relativePath[0]
    if (!relativePath) res.status(404).send("Failed! filepath not found")

    const swap = promiseSwapFile(fileTarget(relativePath))

    const stream = fs.createWriteStream(swap)
    req.pipe(stream)
    stream.once("error", () => res.status(500).send("error"))
    stream.once("finish", () => res.status(200).send("done"))
})

const viteDevServer = await import("vite").then(vite =>
    vite.createServer({
        server: {
            middlewareMode: true,
            watch: {
                ignored: [path.resolve(__dirname, "./src/assets") + "/**/*.html"]
            }
        }
    })
)

app.use(content)
app.use(viteDevServer.middlewares)

const port = 6173
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})
