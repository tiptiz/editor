import { Icon } from "@mdi/react"
import { ediMargin } from "@tiptiz/editor-icons"

import PlainTextDropdown from "@/components/PlainTextDropdown"

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
