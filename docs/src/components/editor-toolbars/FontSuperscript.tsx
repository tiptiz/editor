import IconBar from "@/components/IconBar"
import { ediSuperscript } from "@tiptiz/editor-icons"

export default function FontSuperscript() {
    return (
        <IconBar
            path={ediSuperscript}
            tooltip="Font Superscript"
            iconProps={{ style: { stroke: "currentColor", strokeWidth: 0.5 } }}
        />
    )
}
