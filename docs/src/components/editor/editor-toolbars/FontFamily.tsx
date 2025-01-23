import PlainTextSelect from "@/components/PlainTextSelect"

const fonts = ["Inter", "Roboto", "sans-serif", "serif", "monospace", "cursive", "Arial", "Helvetica", "fantasy"]

export default function FontFamily() {
    return (
        <PlainTextSelect
            className="w-[120px]"
            items={fonts}
            renderLabel={value => value || "Font Family"}
        >
            {font => font}
        </PlainTextSelect>
    )
}
