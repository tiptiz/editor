import globals from "globals"
import { builtinModules } from "module"

import parserSvelte from "eslint-parser-svelte"
import pluginImportSort from "eslint-plugin-import-sort"
import pluginJavaScript from "eslint-plugin-javascript"
import pluginStylistic from "eslint-plugin-stylistic"
import pluginTypeScript from "eslint-plugin-typescript"

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        languageOptions: { globals: globals.browser }
    },
    {
        files: ["**/*.{js,mjs,ts,mts,tsx}", "eslint.config.mjs"],
        languageOptions: {
            parser: pluginTypeScript.parser,
            sourceType: "module",
            parserOptions: {
                extraFileExtensions: [".svelte"]
            }
        }
    },
    {
        files: ["*.svelte", "**/*.svelte"],
        languageOptions: {
            parser: parserSvelte,
            parserOptions: {
                parser: pluginTypeScript.parser
            }
        }
    },
    pluginJavaScript.configs.recommended, // css eslint rules
    {
        plugins: {
            "@typescript-eslint": pluginTypeScript.plugin
        },
        rules: {
            ...pluginTypeScript.configs
                .recommended
                .find(c => c.name === "typescript-eslint/recommended")
                ?.rules,
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    prefer: "type-imports",
                    fixStyle: "separate-type-imports"
                }
            ]
        }
    },
    {
        plugins: {
            "simple-import-sort": pluginImportSort
        },
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
                        ["^@/"],
                        // Parent imports. Put `..` last.
                        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                        // Other relative imports. Put same-folder imports and `.` last.
                        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
                    ]
                }
            ]

        }
    },
    // see: https://eslint.style/guide/getting-started
    // see: https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/disable-legacy.ts
    pluginStylistic.configs["disable-legacy"],
    {
        plugins: {
            "@stylistic": pluginStylistic
        },
        rules: {
            ...pluginStylistic.configs.customize({
                indent: 4,
                quotes: "double",
                semi: false,
                commaDangle: "never",

                jsx: true
            }).rules,
            "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
            "@stylistic/indent": ["error", 4, { offsetTernaryExpressions: false }]
        }
    },
    {
        ignores: [
            "**/node_modules",
            "**/components/ui"
        ]
    }
]
