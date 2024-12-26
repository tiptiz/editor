import ClientThemeProvider from "@/components/ClientThemeProvider"
import { Button } from "@mui/material"

export default function Index() {
    return (
        <ClientThemeProvider>
            <Button variant="contained">Hello Mui</Button>
        </ClientThemeProvider>
    )
}
