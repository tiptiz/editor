import type { DocsThemeConfig } from "nextra-theme-docs"

import React from "react"

const config: DocsThemeConfig = {
    i18n: [
        { locale: "en", name: "English" },
        { locale: "zh", name: "中文" }
    ],
    logo: <span>My Project</span>,
    project: {
        link: ""
    },
    chat: {
        link: ""
    },
    docsRepositoryBase: "",
    footer: {
        content: "Nextra Docs Template"
    }
}

export default config
