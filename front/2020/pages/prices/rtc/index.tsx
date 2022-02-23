import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from 'components/Price/Layout'
import Tabs from 'components/Price/Tabs'
import DocumentPane, { mdTextToHTMLAst, HTMLRootNode } from 'components/Price/Tabs/DocumentPane'
import { Product, nameMap } from 'constants/products'
import { getPriceFileContent } from 'apis/admin/product'

const title = `价格 | ${nameMap[Product.Rtn]}`

function Page({ htmlAst }: { htmlAst: HTMLRootNode | null }) {
  return (
    <>
      <Tabs product={title}>
        <DocumentPane htmlAst={htmlAst} />
      </Tabs>
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

