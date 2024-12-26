/* eslint-disable react-hooks/rules-of-hooks -- false positive, useMDXComponents are not react hooks */

import { useMDXComponents } from "../../../../mdx-components"

import { generateStaticParamsFor, importPage } from "nextra/pages"

export const generateStaticParams = generateStaticParamsFor("mdxPath")

type PageProps = Readonly<{
    params: Promise<{
        mdxPath: string[]
        lang: string
    }>
}>

export async function generateMetadata(props: PageProps) {
    const params = await props.params
    const { metadata } = await importPage(params.mdxPath, params.lang)
    return metadata
}

const Wrapper = useMDXComponents().wrapper

export default async function Page(props: PageProps) {
    const params = await props.params
    const result = await importPage(params.mdxPath, params.lang)
    const { default: MDXContent, toc, metadata } = result
    return (
        <Wrapper toc={toc} metadata={metadata}>
            <MDXContent {...props} params={params} />
        </Wrapper>
    )
}