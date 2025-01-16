import globals from "globals"
import { builtinModules } from "module"

import { combine, combineConfig, combineGlobals, ignores } from "@aolyang/eslint-config"
import { importExport, importExportRules } from "@aolyang/eslint-config/import-export"
import { stylistic, stylisticRules }       from "@aolyang/eslint-config/stylistic"
import { typescript, typescriptRules }     from "@aolyang/eslint-config/typescript"

const devFiles = [
    "eslint.config.mjs",
    ".configs/*.mjs"
]

const packagesTsFiles = [
    "packages/**/*.{js,mjs,ts,mts}"
]

const suitsFiles = [
    "packages/tiptiz-rich-suits/**/*.{ts,mts}"
]

export default combine(
    combineConfig({
        files: [...devFiles, ...packagesTsFiles, ...suitsFiles]
    })(
        typescript(),
        stylistic(),
        importExport()
    ),
    combineConfig({ files: devFiles })(
        combineGlobals(globals.node, globals.browser),
        stylisticRules(),
        importExportRules({
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
        typescriptRules(),
        stylisticRules(),
        importExportRules()
    ),
    typescriptRules({
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
    }),
    { ignores }
)
