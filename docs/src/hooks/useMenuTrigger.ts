import type React from "react"

import { useState } from "react"

export default function useMenuTrigger() {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null)
    const open = Boolean(anchor)

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchor(e.currentTarget)
    }
    const handleClose = () => setAnchor(null)

    return {
        anchor,
        open,
        handleClick,
        handleClose
    }
}
