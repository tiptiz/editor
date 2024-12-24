"use client"
import { IconButton, useColorScheme } from "@mui/material"

export default function ToggleTheme() {
    const { mode, setMode } = useColorScheme()
    return (
        <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
            {mode}
        </IconButton>
    )
}
