import globals from "globals"

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: [".configs/**/*.{js,mjs}"],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node }
        }
    }
]
