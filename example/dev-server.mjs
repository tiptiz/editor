import fs from "node:fs"
import path from "node:path"
import URL from "node:url"

import express from "express"

const __dirname = URL.fileURLToPath(path.dirname(import.meta.url))

const app = express()
const content = express.Router()

const fileTarget = path.resolve(__dirname, "./src/assets/explain.html")
content.get("/content", (_, res) => {
    res.sendFile(fileTarget)
})
content.put("/content", (req, res) => {
    const stream = fs.createWriteStream(fileTarget)
    req.pipe(stream)
    stream.once("error", () => res.status(500).send("error"))
    stream.once("finish", () => res.send("done"))
})

const viteDevServer = await import("vite").then(vite =>
    vite.createServer({
        server: {
            middlewareMode: true, watch: {
                ignored: [fileTarget]
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
