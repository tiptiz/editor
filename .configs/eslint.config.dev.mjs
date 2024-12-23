import globals from "globals"
import { builtinModules } from "module"

/** @type string[] */
export const devFiles = [
    "eslint.config.mjs",
    ".configs/*.mjs",

    "example/*.config.{js,ts,mjs,mts}",
    "docs/*.config.{js,ts,mjs,mts}"
]

// base ../
/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node }
        }
    },
    {
        rules: {
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        // Side effect imports.
                        ["^\\u0000"],
                        // Node.js builtins prefixed with `node:`.
                        ["globals", "module", `node:`, `^(${builtinModules.join("|")})(/|$)`],
                        ["^@eslint", "^eslint-*", "^@?\\w"]
                    ]
                }
            ]
        }
    }
]
