// ! = 1, " " = 0
// It's not means less binary space, just for funny.
const True = "!"
const False = " "

export const globalState = $state({
    viewSparkLines: localStorage.getItem("toolbar-spark-line") === True,
    viewToc: localStorage.getItem("toolbar-view-toc") === True,
    viewAssetsTree: localStorage.getItem("toolbar-view-assets-tree") === True,
    currentAsset: localStorage.getItem("current-asset")
})

export const saveState = (key: string, value: boolean | string) => {
    localStorage.setItem(key, typeof value === "string"
        ? value
        : value ? True : False
    )
}
