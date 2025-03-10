import type { NextConfig } from "next"

import nextra from "nextra"

import pkg from "./package.json"

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
    ],
    transpilePackages: Object.keys(pkg.dependencies).filter(
        dep => dep.startsWith("@tiptiz") || dep.startsWith("tiptiz-extension")
    ),
    webpack: (config, { isServer, dev }) => {
        if (dev && !isServer) {
            config.watchOptions = {
                ...config.watchOptions,
                ignored: /node_modules\/((?!@tiptiz|tiptiz-extension).*)/
            }
        }
        return config
    }
}

const withNextra = nextra({
    latex: true,
    contentDirBasePath: "/",
    defaultShowCopyCode: true
})

export default withNextra(nextConfig)
