import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Price/Layout'
import Tabs from 'components/Price/Tabs'
import DocumentPane, { mdTextToHTMLAst, HTMLRootNode } from 'components/Price/Tabs/DocumentPane'
import CalcPane from 'components/Price/qcdn/Calc'
import { Product } from 'constants/products'
import { getPriceFileContent } from 'apis/admin/product'
import { getGlobalBanners } from 'apis/admin/global-banners'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page({ htmlAst }: { htmlAst: HTMLRootNode | null }) {
  return (
    <>
      <Tabs product="价格 | CDN">
        <DocumentPane htmlAst={htmlAst} />
        <CalcPane />
      </Tabs>
    </>
  )
}

export default function Main({ htmlAst, globalBanners }: Props) {
  return (
    <Layout
      title="价格 | CDN"
      keywords="cdn价格, cdn费用, cdn多少钱, cdn价格计算"
      description=""
      globalBanners={globalBanners}
    >
      <Page htmlAst={htmlAst} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const fileContent = await getPriceFileContent(Product.Cdn)
  const htmlAst = await mdTextToHTMLAst(fileContent)
  const globalBanners = await getGlobalBanners()
  return {
    props: {
      htmlAst,
      globalBanners
    }
  }
}
