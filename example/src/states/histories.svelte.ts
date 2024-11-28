export const colors = $state(localStorage.getItem("color-picker-recently")?.split(",") || [])

export const colorsRecommended = [
    "#FF4545",
    "#FFA500",
    "#FAB12F",
    "#FFFF00",
    "#FFA07A",
    "#FFC0CB",
    "#008000",
    "#006A67",
    "#3D3BF3",
    "#7BD3EA",
    "#800080",
    "#808080",
    "#89A8B2"
]

export const appendColors = (color: string) => {
    colors.unshift(color)
    if (colors.length > 7) colors.pop()
    localStorage.setItem("color-picker-recently", colors.join(","))
}
