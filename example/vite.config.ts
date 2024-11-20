import { svelte } from "@sveltejs/vite-plugin-svelte"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-plugin-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        tsconfigPaths()
    ]
})
