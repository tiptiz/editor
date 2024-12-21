import globals from "globals"
import { builtinModules } from "module"

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["example/**/*.{js,mjs,ts,mts,tsx,svelte}"],
        languageOptions: {
            globals: globals.browser
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
]
