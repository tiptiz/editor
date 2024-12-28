import type { AriaAttributes, CSSProperties, RefObject } from "react"

import { Icon } from "@mdi/react"
import type { IconButtonProps } from "@mui/material"
import { IconButton, Tooltip } from "@mui/material"

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
export interface IconBarProps extends IconButtonProps {
    path: string
    tooltip?: string
    disabled?: boolean
    onClick?: () => void
    iconProps?: IconProps
}

export default function IconBar({ tooltip, iconProps, path, ...btnProps }: IconBarProps) {
    return (
        <Tooltip title={tooltip}>
            <IconButton size="small" {...btnProps}>
                <Icon size={0.8} path={path} {...iconProps} />
            </IconButton>
        </Tooltip>
    )
}
