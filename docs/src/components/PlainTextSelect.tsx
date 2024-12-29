import type { ReactNode } from "react"

import useMenuTrigger from "@/hooks/useMenuTrigger"
import { mdiMenuDown } from "@mdi/js"
import { Icon } from "@mdi/react"
import { ButtonBase, ClickAwayListener, Menu, MenuItem, MenuList } from "@mui/material"
import cn from "clsx"
import React, { useState } from "react"

interface PlainTextSelectProps<T> {
    className?: string
    items: T[]
    renderLabel: (value: T | null) => ReactNode
    children: (value: T) => React.ReactNode
}

export default function PlainTextSelect<T>(
    { className, items, renderLabel, children }: PlainTextSelectProps<T>
) {
    const [value, setValue] = useState<T | null>(null)
    const { anchor, open, handleClick, handleClose } = useMenuTrigger()
    const handleMenuClick = (data: T | null) => {
        setValue(data)
        handleClose()
    }
    return (
        <>
            <ButtonBase
                className={cn("bar-menu-selector px-1 rounded-[2px]", className)}
                onClick={handleClick}
            >
                {renderLabel(value)}
                <Icon path={mdiMenuDown} rotate={open ? 180 : 0} size={1} />
            </ButtonBase>
            <Menu open={open} anchorEl={anchor}>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                        <MenuItem onClick={() => handleMenuClick(null)}>None</MenuItem>
                        {items.map((item, index) => (
                            <MenuItem key={index} onClick={() => handleMenuClick(item)}>
                                {children(item)}
                            </MenuItem>
                        ))}
                    </MenuList>
                </ClickAwayListener>
            </Menu>
        </>
    )
}
