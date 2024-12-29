import { Icon, Stack } from "@mdi/react"
import { Button, Tooltip } from "@mui/material"
import { ediColorHelper, ediColorText } from "@tiptiz/editor-icons"

interface ColorTextProps {
    color?: string
}

export default function ColorText({ color }: ColorTextProps) {
    return (
        <Tooltip title="Text Color">
            <Button
                className="size-7 min-w-7 p-0 rounded-[2px]"
                variant="text"
                size="small"
                color="inherit"
            >
                <Stack size={0.7}>
                    <Icon path={ediColorText} />
                    <Icon path={ediColorHelper} color={color} />
                </Stack>
            </Button>
        </Tooltip>
    )
}
