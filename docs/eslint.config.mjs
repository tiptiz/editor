import configCommon from "../.configs/eslint.config.common.mjs"
import configDocs from "../.configs/eslint.config.docs.mjs"
import configStylistic from "../.configs/eslint.config.stylistic.mjs"

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...configCommon,
    ...configDocs,
    ...configStylistic
]
