import "../styles/tailwind.css"

import type { Metadata } from "next"
import type { ReactNode } from "react"

import theme from "@/utils/theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { Roboto } from "next/font/google"

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    display: "swap",
    variable: "--font-roboto",
    subsets: ["latin"]
})

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
}

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en">
            <body className={roboto.variable}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
