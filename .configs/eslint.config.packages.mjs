import globals from "globals"

import parserSvelte from "eslint-parser-svelte"
import pluginTypeScript from "eslint-plugin-typescript"

import configBase from "./eslint.config.base.mjs"
import configStylistic from "./eslint.config.stylistic.mjs"

const tsFiles = ["./**/*.{js,mjs,ts,mts,tsx}"]
const svelteFiles = ["./**/*.svelte", "./**/*.svelte", "./**/*.svelte.ts"]

export const packagesFiles = [
    ...tsFiles,
    ...svelteFiles
]

// base ../
/** @type {import('eslint').Linter.Config[]} */
export default [
    ...configBase,
    ...configStylistic,
    {
        languageOptions: {
            globals: globals.browser
        }
    },
    {
        files: tsFiles,
        languageOptions: {
            parser: pluginTypeScript.parser,
            sourceType: "module",
            parserOptions: {
                extraFileExtensions: [".svelte"]
            }
        }
    },
    {
        files: svelteFiles,
        languageOptions: {
            parser: parserSvelte,
            parserOptions: {
                parser: pluginTypeScript.parser
            }
        }
    }
]
