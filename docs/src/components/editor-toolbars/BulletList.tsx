import { Icon } from "@mdi/react"
import { ediBulletList, ediListCircle, ediListDisc, ediListSquare } from "@tiptiz/icons"

import PlainTextSelect from "@/components/PlainTextSelect"

interface ListStyle {
    icon?: string
    label?: string
    name: string
    style: string
}

const listStyles: ListStyle[] = [
    { icon: ediListDisc, name: "Bulleted", style: "disc" },
    { icon: ediListSquare, name: "Squared", style: "square" },
    { icon: ediListCircle, name: "Circle", style: "circle" },
    { label: "1, 2, 3...", name: "Numbered", style: "decimal" },
    { label: "a, b, c...", name: "Lower Alpha", style: "lower-alpha" },
    { label: "A, B, C...", name: "Upper Alpha", style: "upper-alpha" },
    { label: "i, ii, iii...", name: "Lower Roman", style: "lower-roman" }
]

export default function BulletList() {
    return (
        <PlainTextSelect
            items={listStyles}
            tooltip="Bullet List"
            renderLabel={<Icon path={ediBulletList} size={0.8} />}
        >
            {list => (
                <>
                    {list.icon && <Icon className="mr-2" path={list.icon} size={0.5} />}
                    <span style={{ wordSpacing: 8 }}>{list.label || list.name}</span>
                </>
            )}
        </PlainTextSelect>
    )
}
