import type { MetaFunction } from "@remix-run/node"

import { Button, Typography } from "@mui/material"
import * as React from "react"

// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
    { title: "Remix Starter" },
    { name: "description", content: "Welcome to remix!" }
]

// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
    return (
        <React.Fragment>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                Material UI Remix in TypeScript example
            </Typography>
            <Button variant="contained" color="primary">Button test</Button>
        </React.Fragment>
    )
}
