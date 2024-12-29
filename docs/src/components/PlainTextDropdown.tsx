import type { ForwardedRef, ReactNode } from "react"

import useMenuTrigger from "@/hooks/useMenuTrigger"
import { mdiMenuDown } from "@mdi/js"
import { Icon } from "@mdi/react"
import { ButtonBase, ClickAwayListener, Menu, MenuList } from "@mui/material"
import cn from "clsx"
import { forwardRef, useImperativeHandle } from "react"

interface PlainTextSelectProps {
    className?: string
    Label: ReactNode
    children: ReactNode
}

export interface PlainTextDropdownExposed {
    close: () => void
}

function PlainTextDropdown(
    props: PlainTextSelectProps,
    ref: ForwardedRef<PlainTextDropdownExposed>
) {
    const { className, Label, children } = props
    const { anchor, open, handleClick, handleClose } = useMenuTrigger()

    useImperativeHandle(ref, () => ({
        close: handleClose
    }))
    return (
        <>
            <ButtonBase
                className={cn("bar-menu-selector px-1 rounded-[2px]", className)}
                onClick={handleClick}
            >
                {Label}
                <Icon path={mdiMenuDown} rotate={open ? 180 : 0} size={1} />
            </ButtonBase>
            <Menu open={open} anchorEl={anchor}>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                        {children}
                    </MenuList>
                </ClickAwayListener>
            </Menu>
        </>
    )
}

export default forwardRef(PlainTextDropdown)
