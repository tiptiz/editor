import globals from "globals"

import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import pluginReactJsxA11y from "eslint-plugin-jsx-a11y"
import pluginImport from "eslint-plugin-import"

const files = ["docs/**/*.{js,mjs,ts,mts,tsx}"]

// from remix init
/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        plugins: {
            "react": pluginReact.configs.flat.recommended.plugins.react,
            "react-hooks": pluginReactHooks,
            "import": pluginImport
        },
        languageOptions: {
            globals: { ...globals.browser, ...globals.node }
        }
    },
    { files, rules: pluginReact.configs.flat["jsx-runtime"].rules },
    { files, rules: pluginReact.configs.recommended.rules },
    { files, rules: pluginReactHooks.configs.recommended.rules },
    { files, ...pluginReactJsxA11y.flatConfigs.recommended },
    {
        files,
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
        files,
        rules: {
            "react/react-in-jsx-scope": "off"
        }
    },
    {
        files,
        rules: {
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        // Side effect imports.
                        ["^\\u0000"],
                        // Node.js builtins prefixed with `node:`.
                        ["^node:"],
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
]
