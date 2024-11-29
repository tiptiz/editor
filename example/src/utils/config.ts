export const attrs = (HTMLAttributes: Record<string, any>) => ({ HTMLAttributes })

export const css = function (css: TemplateStringsArray, ...values: any[]) {
    return css.reduce((acc, str, i) => acc + str + (values[i] || ""), "").trim()
}
