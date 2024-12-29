import type { ButtonProps } from "@mui/material"
import type { AriaAttributes, CSSProperties, RefObject } from "react"

import { Icon } from "@mdi/react"
import { Button, Tooltip } from "@mui/material"

export interface HTMLProps extends AriaAttributes {
    className?: string
}

export interface IconProps extends HTMLProps {
    id?: string
    // path: string
    ref?: RefObject<SVGSVGElement>
    title?: string | null
    description?: string | null
    size?: number | string | null
    color?: string | null
    horizontal?: boolean
    vertical?: boolean
    rotate?: number
    spin?: boolean | number
    style?: CSSProperties
    inStack?: boolean
}

export interface IconBarProps extends ButtonProps {
    path: string
    tooltip?: string
    disabled?: boolean
    onClick?: () => void
    iconProps?: IconProps
}

export default function IconBar({ tooltip, iconProps, path, ...btnProps }: IconBarProps) {
    return (
        <Tooltip title={tooltip}>
            <Button
                className="size-7 min-w-7 p-0 rounded-[2px]"
                variant="text"
                size="small"
                color="inherit"
                {...btnProps}
            >
                <Icon size={0.8} path={path} {...iconProps} />
            </Button>
        </Tooltip>
    )
}
