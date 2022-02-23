import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Layout from 'components/Price/Layout'
import Tabs from 'components/Price/Tabs'
import DocumentPane, { mdTextToHTMLAst, HTMLRootNode } from 'components/Price/Tabs/DocumentPane'
import { Product } from 'constants/products'
import { getPriceFileContent } from 'apis/admin/product'

function Page({ htmlAst }: { htmlAst: HTMLRootNode | null }) {
  return (
    <>
      <Tabs product="价格 | SSL 证书">
        <DocumentPane htmlAst={htmlAst} />
      </Tabs>
    </>
  )
}

export default function Main({ htmlAst }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="价格 | SSL 证书"
      keywords="ssl证书价格, ssl证书费用, ssl证书多少钱"
      description=""
    >
      <Page htmlAst={htmlAst} />
    </Layout>
  )
}

export async function getStaticProps() {
  const fileContent = await getPriceFileContent(Product.Ssl)
  const htmlAst = await mdTextToHTMLAst(fileContent)
  return {
    props: {
      htmlAst
    }
  }
}
