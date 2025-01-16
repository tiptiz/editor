"use client"
import type { ReactNode } from "react"

import { CssBaseline, ThemeProvider } from "@mui/material"

import theme from "@/utils/theme"

export default function ClientThemeProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme} modeStorageKey="theme">
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
