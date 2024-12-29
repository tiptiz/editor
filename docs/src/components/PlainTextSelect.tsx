import type { ReactNode } from "react"
import type { PlainTextDropdownExposed } from "@/components/PlainTextDropdown"

import PlainTextDropdown from "@/components/PlainTextDropdown"
import { MenuItem } from "@mui/material"
import { useRef, useState } from "react"

interface PlainTextSelectProps<T> {
    className?: string
    items: T[]
    renderLabel: (value: T | null) => ReactNode
    children: (value: T) => ReactNode
}

export default function PlainTextSelect<T>(
    { className, items, renderLabel, children }: PlainTextSelectProps<T>
) {
    const [value, setValue] = useState<T | null>(null)
    const dropdownRef = useRef<PlainTextDropdownExposed>(null)
    const handleMenuClick = (data: T | null) => {
        setValue(data)
        dropdownRef.current?.close()
    }
    return (
        <PlainTextDropdown ref={dropdownRef} className={className} Label={renderLabel(value)}>
            <MenuItem onClick={() => handleMenuClick(null)}>None</MenuItem>
            {items.map((item, index) => (
                <MenuItem key={index} onClick={() => handleMenuClick(item)}>
                    {children(item)}
                </MenuItem>
            ))}
        </PlainTextDropdown>
    )
}
