import { RemixBrowser } from "@remix-run/react"

import { CacheProvider } from "@emotion/react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import * as React from "react"
import * as ReactDOM from "react-dom/client"

import ClientStyleContext from "@/src/ClientStyleContext"
import createEmotionCache from "@/src/emotionCache"
import theme from "@/src/theme"

interface ClientCacheProviderProps {
    children: React.ReactNode
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
    const [cache, setCache] = React.useState(createEmotionCache())

    const clientStyleContextValue = React.useMemo(
        () => ({
            reset() {
                setCache(createEmotionCache())
            }
        }),
        []
    )

    return (
        <ClientStyleContext.Provider value={clientStyleContextValue}>
            <CacheProvider value={cache}>{children}</CacheProvider>
        </ClientStyleContext.Provider>
    )
}

const hydrate = () => {
    React.startTransition(() => {
        ReactDOM.hydrateRoot(
            document,
            <ClientCacheProvider>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <RemixBrowser />
                </ThemeProvider>
            </ClientCacheProvider>
        )
    })
}

if (window.requestIdleCallback) {
    window.requestIdleCallback(hydrate)
} else {
    // Safari doesn't support requestIdleCallback
    // https://caniuse.com/requestidlecallback
    setTimeout(hydrate, 1)
}
