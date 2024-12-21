import parserSvelte from "eslint-parser-svelte"
import pluginImportSort from "eslint-plugin-import-sort"
import pluginStylistic from "eslint-plugin-stylistic"
import pluginTypeScript from "eslint-plugin-typescript"

import configCommon from "./.configs/eslint.config.common.mjs"
import configExample from "./.configs/eslint.config.example.mjs"
import configDocs from "./.configs/eslint.config.docs.mjs"
import configStylistic from "./.configs/eslint.config.stylistic.mjs"

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        plugins: {
            "@stylistic": pluginStylistic,
            "@typescript-eslint": pluginTypeScript.plugin,
            "simple-import-sort": pluginImportSort
        }
    },
    pluginTypeScript.configs.base,
    {
        files: ["**/*.{js,mjs,ts,mts,tsx}"],
        languageOptions: {
            parser: pluginTypeScript.parser,
            sourceType: "module",
            parserOptions: {
                extraFileExtensions: [".svelte"]
            }
        }
    },
    {
        files: ["*.svelte", "**/*.svelte", "**/*.svelte.ts"],
        languageOptions: {
            parser: parserSvelte,
            parserOptions: {
                parser: pluginTypeScript.parser
            }
        }
    },
    ...configCommon,
    ...configExample,
    ...configDocs,
    ...configStylistic,
    {
        ignores: [
            "**/node_modules",
            "**/components/ui",
            "**/dist*",
            "^."
        ]
    }
]
