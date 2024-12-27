import type { HTMLAttributes } from "react"

import cn from "clsx"

interface HrProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
}
export default function Hr({ className = "", ...restProps }: HrProps) {
    return (
        <div
            className={cn(
                `border-r border-neutral-400 dark:border-neutral-500`,
                className
            )}
            {...restProps}
        />
    )
}
