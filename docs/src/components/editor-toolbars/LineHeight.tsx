import { Icon } from "@mdi/react"
import { ediLineHeight } from "@tiptiz/icons"

import PlainTextDropdown from "../PlainTextDropdown"

export default function LineHeight() {
    return (
        <PlainTextDropdown
            tooltip="Line Height"
            Label={<Icon path={ediLineHeight} size={0.8} />}
        >
            menu
        </PlainTextDropdown>
    )
}
