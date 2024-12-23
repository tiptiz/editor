import globals from "globals"
import { builtinModules } from "module"

import parserSvelte from "eslint-parser-svelte"
import pluginTypeScript from "eslint-plugin-typescript"

import configBase, { combine, configShared } from "../.configs/eslint.config.base.mjs"
import configStylistic from "../.configs/eslint.config.stylistic.mjs"

const tsFiles = ["./**/*.{js,mjs,ts,mts,tsx}"]
const svelteFiles = ["./**/*.svelte", "./**/*.svelte", "./**/*.svelte.ts"]

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...configShared,
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
    },
    ...combine([...tsFiles, ...svelteFiles])(
        {
            languageOptions: {
                globals: globals.browser
            }
        },
        configBase,
        configStylistic,
        {
            rules: {
                "simple-import-sort/imports": [
                    "error",
                    {
                        groups: [
                            [
                                "globals",
                                `node:`,
                                `^(${builtinModules.join("|")})(/|$)`
                            ],
                            // style less,scss,css
                            ["^.+\\.(l|s)?css$"],
                            // Side effect imports.
                            ["^\\u0000"],
                            ["^@?\\w.*\\u0000$", "^[^.].*\\u0000$", "^\\..*\\u0000$"],
                            ["^@/icons"],
                            ["^@/components/ui", "^@/"],
                            ["^@/icons/toolbars", "^@/components/toolbars"],
                            // Parent imports. Put `..` last.
                            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                            // Other relative imports. Put same-folder imports and `.` last.
                            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
                        ]
                    }
                ]

            }
        }
    )
]
