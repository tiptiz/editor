"use client"

import type { ReactNode } from "react"

import theme from "@/utils/theme"
import { CssBaseline, ThemeProvider } from "@mui/material"

export default function ClientThemeProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme} modeStorageKey="theme">
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
