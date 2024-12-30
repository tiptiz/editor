"use client"
import PlainTextSelect from "@/components/PlainTextSelect"

const sizes = [12, 14, 15, 16, 17, 18, 20, 22, 24, 26]

export default function FontSize() {
    return (
        <PlainTextSelect
            className="w-[100px]"
            items={sizes}
            renderLabel={value => value ? value + " px" : "Font Size"}
        >
            {size => <span style={{ fontSize: size }}>{size} px</span>}
        </PlainTextSelect>
    )
}
