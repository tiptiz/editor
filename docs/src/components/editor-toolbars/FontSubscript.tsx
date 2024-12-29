import IconBar from "@/components/IconBar"
import { ediSubscript } from "@tiptiz/editor-icons"

export default function FontSubscript() {
    return (
        <IconBar
            path={ediSubscript}
            tooltip="Font Subscript"
            iconProps={{ style: { stroke: "currentColor", strokeWidth: 0.5 } }}
        />
    )
}
