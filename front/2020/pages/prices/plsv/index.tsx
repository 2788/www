import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from 'components/Price/Layout'
import Banner from 'components/Price/Banner'
import PriceMdPreview, { mdTextToHTMLAst, HTMLRootNode } from 'components/Price/common/MdPreview'
import { Product, nameMap } from 'constants/products'
import { getPriceFileContent } from 'apis/admin/product'

function Page({ htmlAst }: { htmlAst: HTMLRootNode | null }) {
  return (
    <>
      <Banner product={`价格 | ${nameMap[Product.Plsv]}`}>
        <PriceMdPreview htmlAst={htmlAst} />
      </Banner>
    </>
  )
}

export default function Main({ htmlAst }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title={`价格 | ${nameMap[Product.Plsv]}`}
      keywords={`${nameMap[Product.Plsv]}价格, ${nameMap[Product.Plsv]}费用, ${nameMap[Product.Plsv]}多少钱, ${nameMap[Product.Plsv]}价格计算`}
      description=""
    >
      <Page htmlAst={htmlAst} />
    </Layout>
  )
}

export async function getStaticProps() {
  const fileContent = await getPriceFileContent(Product.Plsv)
  const htmlAst = await mdTextToHTMLAst(fileContent)
  return {
    props: {
      htmlAst
    }
  }
}
