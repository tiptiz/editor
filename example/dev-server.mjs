import fs from "node:fs"
import path from "node:path"
import URL from "node:url"

import express from "express"

const __dirname = URL.fileURLToPath(path.dirname(import.meta.url))

const app = express()
const content = express.Router()

/** @param target {string} */
const fileTarget = target => path.resolve(__dirname, "./src/assets", target)

content.get("/content", (req, res) => {
    res.sendFile(fileTarget(req.query.filepath))
})
content.put("/content", (req, res) => {
    const target = req.headers["content-file-path"]
    if (!target) res.status(404).send("Failed!filepath not found")

    const stream = fs.createWriteStream(fileTarget(target))
    req.pipe(stream)
    stream.once("error", () => res.status(500).send("error"))
    stream.once("finish", () => res.status(200).send("done"))
})

const viteDevServer = await import("vite").then(vite =>
    vite.createServer({
        server: {
            middlewareMode: true,
            watch: {
                // ignored: [fileTarget]
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
