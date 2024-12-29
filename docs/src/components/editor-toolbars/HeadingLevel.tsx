import { Icon } from "@mdi/react"
import { ediHeading1, ediHeading2, ediHeading3, ediHeading4, ediHeading5, ediHeading6 } from "@tiptiz/editor-icons"

import PlainTextSelect from "@/components/PlainTextSelect"

const headings = [
    { tag: "h1", Icon: ediHeading1 },
    { tag: "h2", Icon: ediHeading2 },
    { tag: "h3", Icon: ediHeading3 },
    { tag: "h4", Icon: ediHeading4 },
    { tag: "h5", Icon: ediHeading5 },
    { tag: "h6", Icon: ediHeading6 }
]

export default function HeadingLevel() {
    return (
        <PlainTextSelect
            items={headings}
            renderLabel={item => (
                <Icon path={item?.Icon || headings[0]!.Icon} size={0.8} />
            )}
        >
            {item => <Icon path={item.Icon} size={0.8} />}
        </PlainTextSelect>
    )
}
