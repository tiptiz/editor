import { builtinModules } from "module"
import { dirname } from "path"
import { fileURLToPath } from "url"

import configBase, { configShared } from "../.configs/eslint.config.base.mjs"
import configStylistic from "../.configs/eslint.config.stylistic.mjs"

import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname
})

const eslintConfig = [
    ...compat.extends("next/core-web-vitals"),
    {
        plugins: {
            "@stylistic": configShared[0].plugins["@stylistic"],
            "simple-import-sort": configShared[0].plugins["simple-import-sort"]
        }
    },
    ...configBase,
    ...configStylistic,
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
                        // Parent imports. Put `..` last.
                        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                        // Other relative imports. Put same-folder imports and `.` last.
                        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
                    ]
                }
            ]

        }
    },
    {
        ignores: ["\\.next"]
    }
]

export default eslintConfig
