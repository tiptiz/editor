import configBase, { combine, configShared } from "./.configs/eslint.config.base.mjs"
import configDevFiles, { devFiles } from "./.configs/eslint.config.dev.mjs"
import configPackages, { packagesFiles } from "./.configs/eslint.config.packages.mjs"
import configStylistic from "./.configs/eslint.config.stylistic.mjs"

// packages
/** @type {import('eslint').Linter.Config[]} */
export default [
    ...configShared,
    ...combine(devFiles)(
        configBase,
        configStylistic,
        configDevFiles
    ),
    ...combine(packagesFiles)(
        configBase,
        configStylistic,
        configPackages
    )
]
