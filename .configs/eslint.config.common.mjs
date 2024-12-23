import pluginJavaScript from "eslint-plugin-javascript"
import pluginTypeScript from "eslint-plugin-typescript"
import pluginImportSort from "eslint-plugin-import-sort"
import pluginStylistic from "eslint-plugin-stylistic"

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        plugins: {
            "@stylistic": pluginStylistic,
            "@typescript-eslint": pluginTypeScript.plugin,
            "simple-import-sort": pluginImportSort
        }
    },
    pluginJavaScript.configs.recommended,
    pluginTypeScript.configs.base,
    {
        rules: {
            ...pluginTypeScript.configs.recommended
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
        ignores: [
            "**/node_modules",
            "**/components/ui",
            "**/dist*",
            "^."
        ]
    }
]
