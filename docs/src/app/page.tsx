import ToggleTheme from "@/components/ToggleTheme"
import { Button, Link } from "@mui/material"

export default function Home() {
    return (
        <div>
            <Button variant="contained">button</Button>
            <ToggleTheme />
            <Link href="/zh/docs">Docs</Link>
        </div>
    )
}
