import pluginImportSort from "eslint-plugin-import-sort"
import pluginJavaScript from "eslint-plugin-javascript"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import pluginStylistic from "eslint-plugin-stylistic"
import pluginTypeScript from "eslint-plugin-typescript"
/**
 * @typedef {import('eslint').Linter.Config} ESLintConfig
 * */
/**
 * @param {string[]} files
 * @return {(...configArray: (ESLintConfig | ESLintConfig[])[]) => ESLintConfig[]}
 * */
export const combine = (files) => {
    return (...configArray) => {
        return configArray.reduce((acc, config) => {
            if (Array.isArray(config)) return acc.concat(combine(files)(...config))
            acc.push(config.files ? config : { files, ...config })
            return acc
        }, [])
    }
}

/** @type {ESLintConfig[]} */
export const configShared = [
    {
        plugins: {
            "react": pluginReact.configs.flat.recommended.plugins.react,
            "react-hooks": pluginReactHooks,
            "@stylistic": pluginStylistic,
            "@typescript-eslint": pluginTypeScript.plugin,
            "simple-import-sort": pluginImportSort
        }
    },
    {
        ignores: [
            "**/public",
            "**/build",
            "**/out",
            "**/.next",
            "**/node_modules",
            "**/components/ui",
            "**/dist*",
            "^."
        ]
    }
]

/** @type {ESLintConfig[]} */
export default [
    pluginJavaScript.configs.recommended,
    pluginTypeScript.configs.base,
    {
        rules: {
            ...pluginTypeScript.configs.recommended
                .find(c => c.name === "typescript-eslint/recommended")
                ?.rules,
            "import/no-anonymous-default-export": "off",
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
