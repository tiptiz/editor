import globals from "globals"
import { builtinModules } from "module"

import { combine, combineConfig, combineGlobals, ignores } from "@aolyang/eslint-config"
import importExport from "@aolyang/eslint-config/import-export"
import stylistic    from "@aolyang/eslint-config/stylistic"
import typescript   from "@aolyang/eslint-config/typescript"

const devFiles = [
    "eslint.config.mjs",
    ".configs/*.mjs"
]

const packagesTsFiles = [
    "./packages/**/*.{js,mjs,ts,mts,ts}"
]

const suitsFiles = [
    "./packages/tiptiz-rich-suits/**/*.{ts,mts}"
]

export default combine(
    combineConfig({ files: devFiles })(
        combineGlobals(globals.node, globals.browser),
        stylistic(),
        importExport({
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
        })
    ),
    combineConfig({ files: packagesTsFiles })(
        combineGlobals(globals.browser),
        typescript(),
        stylistic(),
        importExport(),
        typescript({
            files: suitsFiles,
            rules: {
                "@typescript-eslint/consistent-type-imports": [
                    "error",
                    {
                        prefer: "type-imports",
                        fixStyle: "inline-type-imports"
                    }
                ]
            }
        })
    ),
    { ignores }
)
