import type { ReactNode } from "react"
import type { PlainTextDropdownExposed } from "./PlainTextDropdown"

import { MenuItem } from "@mui/material"
import { useRef, useState } from "react"

import PlainTextDropdown from "./PlainTextDropdown"

interface PlainTextSelectProps<T> {
    className?: string
    items: T[]
    tooltip?: string
    renderLabel: ReactNode | ((value: T | null) => ReactNode)
    children: (value: T) => ReactNode
}

export default function PlainTextSelect<T>(
    { className, items, renderLabel, tooltip, children }: PlainTextSelectProps<T>
) {
    const [value, setValue] = useState<T | null>(null)
    const dropdownRef = useRef<PlainTextDropdownExposed>(null)
    const handleMenuClick = (data: T | null) => {
        setValue(data)
        dropdownRef.current?.close()
    }
    return (
        <PlainTextDropdown
            ref={dropdownRef}
            className={className}
            tooltip={tooltip}
            Label={typeof renderLabel === "function" ? renderLabel(value) : renderLabel}
        >
            <MenuItem onClick={() => handleMenuClick(null)}>None</MenuItem>
            {items.map((item, index) => (
                <MenuItem key={index} onClick={() => handleMenuClick(item)}>
                    {children(item)}
                </MenuItem>
            ))}
        </PlainTextDropdown>
    )
}
