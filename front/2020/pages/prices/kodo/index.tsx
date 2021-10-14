import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PriceMdPreview, { mdTextToHTMLAst, HTMLRootNode } from 'components/Price/common/MdPreview'
import CalcPane from 'components/Price/kodo/Calc'
import { Product } from 'constants/products'
import { getPriceFileContent } from 'apis/admin/product'

function Page({ htmlAst }: { htmlAst: HTMLRootNode | null }) {

  return (
    <>
      <Banner product="价格 | 对象存储">
        <PriceMdPreview htmlAst={htmlAst} />
        <CalcPane />
      </Banner>
    </>
  )
}

export default function Main({ htmlAst }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="价格 | 对象存储"
      keywords="云存储价格, kodo价格, 对象存储价格, 存储费用, 存储多少钱, kodo价格计算, 存储价格计算"
      description=""
    >
      <Page htmlAst={htmlAst} />
    </Layout>
  )
}

export async function getStaticProps() {
  const fileContent = await getPriceFileContent(Product.Kodo)
  const htmlAst = await mdTextToHTMLAst(fileContent)
  return {
    props: {
      htmlAst
    }
  }
}
