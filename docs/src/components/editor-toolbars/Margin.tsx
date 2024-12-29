import PlainTextDropdown from "@/components/PlainTextDropdown"
import { Icon, Stack } from "@mdi/react"
import { ediMarginStack } from "@tiptiz/editor-icons"

export default function Margin() {
    return (
        <PlainTextDropdown
            tooltip="Margin"
            Label={(
                <Stack size={0.8}>
                    {ediMarginStack.map((path, i) => <Icon path={path} key={i} />)}
                </Stack>
            )}
        >
            Margin panel
        </PlainTextDropdown>
    )
}
