import { Box, Container } from "@mui/material"
import * as React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                {children}
            </Box>
        </Container>
    )
}
