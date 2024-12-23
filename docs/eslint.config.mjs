import globals from "globals"
import { builtinModules } from "module"

import pluginReactJsxA11y from "eslint-plugin-jsx-a11y"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"

import configBase, { combine, configShared } from "../.configs/eslint.config.base.mjs"
import configStylistic from "../.configs/eslint.config.stylistic.mjs"

const files = ["./**/*.{js,mjs,ts,mts,tsx}"]

// from remix init
/** @type {import('eslint').Linter.Config[]} */
export default [
    ...configShared,
    ...combine(files)(
        configBase,
        configStylistic,
        {
            languageOptions: {
                globals: { ...globals.browser, ...globals.node }
            }
        },
        pluginReactJsxA11y.flatConfigs.recommended,
        { rules: pluginReact.configs.flat["jsx-runtime"].rules },
        { rules: pluginReact.configs.recommended.rules },
        { rules: pluginReactHooks.configs.recommended.rules },
        {
            ignores: ["!**/.server", "!**/.client"],
            settings: {
                "react": {
                    version: "detect"
                },
                "formComponents": ["Form"],
                "linkComponents": [
                    { name: "Link", linkAttribute: "to" },
                    { name: "NavLink", linkAttribute: "to" }
                ],
                "import/resolver": {
                    node: {
                        extensions: [".ts", ".tsx"]
                    },
                    typescript: {
                        alwaysTryTypes: true
                    }
                },
                "import/internal-regex": "^@/"
            }
        },
        {
            rules: {
                "react/react-in-jsx-scope": "off",
                "simple-import-sort/imports": [
                    "error",
                    {
                        groups: [
                            // Side effect imports.
                            ["^\\u0000"],
                            // Node.js builtins prefixed with `node:`.
                            [
                                "globals",
                                `node:`,
                                `^(${builtinModules.join("|")})(/|$)`
                            ],
                            // remix infrastructure and envs
                            ["^@remix", "^remix", "^i18n", "i18next$"],
                            // Packages.
                            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                            ["^@?\\w"],
                            // Absolute imports and other imports such as Vue-style `@/foo`.
                            // Anything not matched in another group.
                            ["^"],
                            // Relative imports.
                            // Anything that starts with a dot.
                            ["^\\."]
                        ]
                    }
                ]
            }
        }
    )
]
