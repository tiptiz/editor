import en_US from "@/locales/en_US.json"
import zh_CN from "@/locales/zh_CN.json"

import { derived, writable } from "svelte/store"

export const locales = ["en_US", "zh_CN"] as const
export type Locale = typeof locales[number]

const defaultLocale = localStorage.getItem("locale") as Locale | undefined
    || locales.find(l => l === navigator.language)
    || locales[0]

export const locale = writable<Locale>(defaultLocale)
locale.subscribe(value => localStorage.setItem("locale", value))

const translations = {
    en_US,
    zh_CN
}

export type TranslationKey = keyof typeof zh_CN

function translate(locale: Locale, key: TranslationKey, vars: Record<string, any>) {
    // Let's throw some errors if we're trying to use keys/locales that don't exist.
    // We could improve this by using Typescript and/or fallback values.
    if (!key) throw new Error("no key provided to $t()")
    if (!locale) throw new Error(`no translation for key "${key}"`)

    // Grab the translation from the translations object.
    let text = translations[locale][key]

    if (!text) {
        // console.warn(`no translation found for ${locale}.${key}`)
        return key
    }

    // Replace any passed in variables in the translation string.
    Object.keys(vars).map((k) => {
        const regex = new RegExp(`{{${k}}}`, "g")
        text = text.replace(regex, vars[k])
    })

    return text
}

export const t = derived(locale, $locale => (key: TranslationKey, vars: Record<string, any> = {}) =>
    translate($locale, key, vars)
)
