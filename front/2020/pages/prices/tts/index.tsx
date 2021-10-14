import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PriceMdPreview, { mdTextToHTMLAst, HTMLRootNode } from 'components/Price/common/MdPreview'
import { Product } from 'constants/products'
import { getPriceFileContent } from 'apis/admin/product'

function Page({ htmlAst }: { htmlAst: HTMLRootNode | null }) {
  return (
    <>
      <Banner product="价格 | 语音合成">
        <PriceMdPreview htmlAst={htmlAst} />
      </Banner>
    </>
  )
}

export default function Main({ htmlAst }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="价格 | 语音合成"
      keywords="语音合成, 语音合成价格, 语音合成费用, 语音合成多少钱, tts"
      description=""
    >
      <Page htmlAst={htmlAst} />
    </Layout>
  )
}

export async function getStaticProps() {
  const fileContent = await getPriceFileContent(Product.Tts)
  const htmlAst = await mdTextToHTMLAst(fileContent)
  return {
    props: {
      htmlAst
    }
  }
}
