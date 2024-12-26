import type { NextConfig } from "next"

import nextra from "nextra"

const nextConfig: NextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true
    },
    i18n: {
        locales: ["en", "zh"],
        defaultLocale: "zh"
    },
    redirects: async () => [
        { source: "/docs", statusCode: 302, destination: "/docs/getting-started" }
    ]
}

const withNextra = nextra({
    latex: true,
    contentDirBasePath: "/",
    defaultShowCopyCode: true
})

export default withNextra(nextConfig)
