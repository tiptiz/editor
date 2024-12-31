import PlainTextDropdown from "@/components/PlainTextDropdown"
import { Icon } from "@mdi/react"
import { ediMargin } from "@tiptiz/editor-icons"

export default function Margin() {
    return (
        <PlainTextDropdown
            tooltip="Margin"
            Label={<Icon path={ediMargin} size={0.8} />}
        >
            Margin panel
        </PlainTextDropdown>
    )
}
