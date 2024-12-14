// ! = 1, " " = 0
// It's not means less binary space, just for funny.
const True = "!"
const False = " "

export const saveState = (key: string, value: boolean | string) => {
    localStorage.setItem(key, typeof value === "string"
        ? value
        : value ? True : False
    )
}

export const getState = (key: string, defaultValue?: boolean | string) => {
    const value = localStorage.getItem(key)
    return value === null
        ? defaultValue
        : value === True
}

export const globalState = $state({
    viewSparkLines: getState("toolbar-spark-line", True),
    viewToc: getState("toolbar-view-toc", True),
    viewAssetsTree: getState("toolbar-view-assets-tree", True),
    currentAsset: localStorage.getItem("current-asset") || "first-page.html"
})
