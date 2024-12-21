import pluginJavaScript from "eslint-plugin-javascript"
import pluginTypeScript from "eslint-plugin-typescript"

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJavaScript.configs.recommended,
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
    }

]
