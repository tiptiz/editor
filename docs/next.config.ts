import type { NextConfig } from "next"

import nextra from "nextra"

const nextConfig: NextConfig = {
    i18n: {
        locales: ["en", "zh"],
        defaultLocale: "zh"
    }
}

const withNextra = nextra({
    theme: "nextra-theme-docs",
    themeConfig: "./theme.config.tsx"
})

export default withNextra(nextConfig)
