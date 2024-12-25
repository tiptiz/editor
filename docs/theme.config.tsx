import type { DocsThemeConfig } from "nextra-theme-docs"

const config: DocsThemeConfig = {
    i18n: [
        { locale: "en", name: "English" },
        { locale: "zh", name: "中文" }
    ],
    logo: <span>Tiptiz Editor</span>,
    project: {
        link: ""
    },
    docsRepositoryBase: "",
    footer: {
        content: ""
    }
}

export default config
