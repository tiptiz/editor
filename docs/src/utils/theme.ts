"use client"

import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    typography: {
        fontFamily: "var(--font-roboto)"
    },
    cssVariables: {
        colorSchemeSelector: "class"
    },
    colorSchemes: { light: true, dark: true },
    components: {
        MuiButton: {
            defaultProps: {
                size: "small",
                disableElevation: true
            }
        }
    }
})

export default theme
