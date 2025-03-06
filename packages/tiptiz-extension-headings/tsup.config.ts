import { defineConfig } from "tsup"

export default defineConfig({
    entry: {
        index: "src/index.ts"
    },
    splitting: false,
    shims: true,
    clean: true,
    sourcemap: true
})
