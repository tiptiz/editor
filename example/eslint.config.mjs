import globals from "globals"
import { builtinModules } from "node:module"

import { combine, combineGlobals, ignores } from "@aolyang/eslint-config"
import importExport from "@aolyang/eslint-config/import-export"
import stylistic    from "@aolyang/eslint-config/stylistic"
import svelte       from "@aolyang/eslint-config/svelte"
import typescript   from "@aolyang/eslint-config/typescript"

export default combine(
    combineGlobals(globals.browser),
    svelte(),
    typescript(),
    stylistic(),
    importExport({
        rules: {
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        ["globals", "node:", `^(${builtinModules.join("|")})(/|$)`],
                        // style less,scss,css
                        ["^.+\\.(l|s)?css$"],
                        // Side effect imports.
                        ["^\\u0000"],
                        ["^@?\\w.*\\u0000$", "^[^.].*\\u0000$", "^\\..*\\u0000$"],
                        ["^@/icons"],
                        ["^@/components/ui", "^@/"],
                        ["^@/icons/toolbars", "^@/components/toolbars"],
                        // Parent imports. Put `..` last.
                        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                        // Other relative imports. Put same-folder imports and `.` last.
                        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
                    ]
                }
            ]
        }
    }),
    { ignores: ignores.concat(["src/components/ui"]) }
)
