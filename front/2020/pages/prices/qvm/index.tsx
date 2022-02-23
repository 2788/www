import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from 'components/Price/Layout'
import Tabs from 'components/Price/Tabs'
import DocumentPane, { mdTextToHTMLAst, HTMLRootNode } from 'components/Price/Tabs/DocumentPane'
import CalcPane from 'components/Price/qvm/Calc'
import { Product } from 'constants/products'
import { getPriceFileContent } from 'apis/admin/product'

function Page({ htmlAst }: { htmlAst: HTMLRootNode | null }) {
  return (
    <>
      <Tabs product="价格 | 云主机">
        <DocumentPane htmlAst={htmlAst} />
        <CalcPane />
      </Tabs>
    </>
  )
}

export default function Main({ htmlAst }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="价格 | 云主机"
      keywords="qvm价格, qvm费用, qvm多少钱, qvm价格计算, 云主机价格, 云主机费用, 云主机多少钱, 云主机价格计算"
      description=""
    >
      <Page htmlAst={htmlAst} />
    </Layout>
  )
}

export async function getStaticProps() {
  const fileContent = await getPriceFileContent(Product.Qvm)
  const htmlAst = await mdTextToHTMLAst(fileContent)
  return {
    props: {
      htmlAst
    }
  }
}
