import { builtinModules } from "module"
import { dirname }        from "path"
import { fileURLToPath }  from "url"

import { FlatCompat }       from "@eslint/eslintrc"
import { combine, ignores } from "@aolyang/eslint-config"
import importExport from "@aolyang/eslint-config/import-export"
import stylistic    from "@aolyang/eslint-config/stylistic"
import typescript   from "@aolyang/eslint-config/typescript"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname
})

export default combine(
    compat.extends("next/core-web-vitals"),
    stylistic(),
    typescript(),
    importExport(),
    importExport({
        files: ["eslint.config.mjs"],
        rules: {
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        ["globals", "module", "node:", `^(${builtinModules.join("|")})(/|$)`],
                        ["^@eslint", "^eslint-*", "^@?\\w"],
                        ["^"]
                    ]
                }
            ]
        }
    }),
    { ignores: ignores.concat(["**/_meta.ts"]) }
)
