import parserSvelte from "eslint-parser-svelte"
import pluginTypeScript from "eslint-plugin-typescript"

import configCommon from "../.configs/eslint.config.common.mjs"
import configExample from "../.configs/eslint.config.example.mjs"
import configStylistic from "../.configs/eslint.config.stylistic.mjs"

/** @type {import('eslint').Linter.Config[]} */
export default [
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
    ...configStylistic
]
