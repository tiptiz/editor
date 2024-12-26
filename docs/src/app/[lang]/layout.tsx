/* eslint-env node */
// import "@/styles/tailwind.css"
import "@/styles/global.css"

import type { Metadata } from "next"
import type { ReactNode } from "react"

import { i18n } from "@/utils/i18n"
import { Head } from "nextra/components"
import { getPageMap } from "nextra/page-map"
import { Footer, LastUpdated, Layout, LocaleSwitch, Navbar, ThemeSwitch } from "nextra-theme-docs"

export const { viewport } = Head

export const metadata: Metadata = {
    description: "Tiptiz is a WYSIWYG editor based on Tiptap",
    keywords: ["tiptiz", "tiptap", "prosemirror", "wysiwyg", "rich text editor", "markdown"],
    title: {
        absolute: "",
        template: "%s | Tiptiz"
    },
    metadataBase: new URL("https://tiptiz.dev")
}

type Props = {
    children: ReactNode
    params: Promise<{ lang: string }>
}

export default async function RootLayout({ children, params }: Props) {
    const { lang } = await params
    let pageMap = await getPageMap(`/${lang}`)
    const dictionary = await i18n(lang as any)

    const navbar = (
        <Navbar
            logo={(<>Tiptiz</>)}
            projectLink="https://github.com/tiptiz/editor"
        >
            <div>
                <LocaleSwitch />
                <ThemeSwitch />
            </div>
        </Navbar>
    )
    const footer = (
        <Footer>
            <a
                rel="noreferrer"
                target="_blank"
                className="x:focus-visible:nextra-focus flex items-center gap-2 font-semibold"
                href={dictionary.link.vercel}
            >
                {dictionary.poweredBy} God
            </a>
        </Footer>
    )
    return (
        <html lang={lang} suppressHydrationWarning>
            <Head />
            <body>
                <Layout
                    navbar={navbar}
                    footer={footer}
                    docsRepositoryBase="https://github.com/shuding/nextra/blob/main/examples/swr-site"
                    i18n={[
                        { locale: "en", name: "English" },
                        { locale: "zh", name: "简体中文" }
                    ]}
                    sidebar={{
                        defaultMenuCollapseLevel: 1,
                        autoCollapse: true
                    }}
                    toc={{
                        backToTop: dictionary.backToTop,
                        extraContent: (
                            // eslint-disable-next-line @next/next/no-img-element -- we can't use with external urls
                            <img alt="placeholder cat" src="https://placecats.com/300/200" />
                        )
                    }}
                    pageMap={pageMap}
                    lastUpdated={<LastUpdated>{dictionary.lastUpdated}</LastUpdated>}
                >
                    {children}
                </Layout>
            </body>
        </html>
    )
}
