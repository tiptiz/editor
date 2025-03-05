import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/index.ts", "src/components.ts"],
    sourcemap: true
})
