import "server-only"

import type EnglishLocale from "../dictionaries/en"

const i18nConfig = {
    defaultLocale: "zh",
    locales: ["en", "zh"]
} as const

export type Locale = (typeof i18nConfig)["locales"][number]

export type Dictionary = typeof EnglishLocale

export type Dictionaries = Record<
    Locale,
    () => Promise<{ default: Dictionary }>
>
// We enumerate all dictionaries here for better linting and TypeScript support
// We also get the default import for cleaner types
const dictionaries: Dictionaries = {
    en: () => import("../dictionaries/en"),
    zh: () => import("../dictionaries/zh")
}

export async function i18n(locale: Locale): Promise<Dictionary> {
    const { default: dictionary } = await (dictionaries[locale] || dictionaries.zh)()

    return dictionary
}
