import { MenuItem, Select } from "@mui/material"

const fonts = ["Inter", "Roboto", "sans-serif", "serif", "monospace", "cursive", "Arial", "Helvetica", "fantasy"]

export default function FontFamily() {
    return (
        <Select<string>
            className="w-[140px]"
            size="small"
            displayEmpty
            renderValue={value => value || "Font Family"}
        >
            <MenuItem value="">None</MenuItem>
            {fonts.map(font => <MenuItem key={font} value={font}>{font}</MenuItem>)}
        </Select>
    )
}
