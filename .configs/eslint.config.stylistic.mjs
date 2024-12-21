import pluginStylistic from "eslint-plugin-stylistic"

// see: https://eslint.style/guide/getting-started
// see: https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/disable-legacy.ts

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginStylistic.configs["disable-legacy"],
    {
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
    }
]
