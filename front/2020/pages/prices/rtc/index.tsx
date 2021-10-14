import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PriceMdPreview, { mdTextToHTMLAst, HTMLRootNode } from 'components/Price/common/MdPreview'
import { Product, nameMap } from 'constants/products'
import { getPriceFileContent } from 'apis/admin/product'

const title = `价格 | ${nameMap[Product.Rtn]}`

function Page({ htmlAst }: { htmlAst: HTMLRootNode | null }) {
  return (
    <>
      <Banner product={title}>
        <PriceMdPreview htmlAst={htmlAst} />
      </Banner>
    </>
  )
}

export default function Main({ htmlAst }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title={title}
      keywords="RTC价格, RTC费用, RTC多少钱, 实时音视频费用, 实时音视频多少钱"
      description=""
    >
      <Page htmlAst={htmlAst} />
    </Layout>
  )
}

export async function getStaticProps() {
  const fileContent = await getPriceFileContent(Product.Rtn)
  const htmlAst = await mdTextToHTMLAst(fileContent)
  return {
    props: {
      htmlAst
    }
  }
}

