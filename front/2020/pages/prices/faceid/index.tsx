import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Price/Layout'
import Tabs from 'components/Price/Tabs'
import DocumentPane, { mdTextToHTMLAst, HTMLRootNode } from 'components/Price/Tabs/DocumentPane'
import { Product } from 'constants/products'
import { getPriceFileContent } from 'apis/admin/product'
import { getGlobalBanners } from 'apis/admin/global-banners'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page({ htmlAst }: { htmlAst: HTMLRootNode | null }) {
  return (
    <>
      <Tabs product="价格 | 人脸核验">
        <DocumentPane htmlAst={htmlAst} />
      </Tabs>
    </>
  )
}

export default function Main({ htmlAst, globalBanners }: Props) {
  return (
    <Layout
      title="价格 | 人脸核验"
      keywords="人脸核验价格, 人脸核验费用, 人脸核验多少钱"
      description=""
      globalBanners={globalBanners}
    >
      <Page htmlAst={htmlAst} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const fileContent = await getPriceFileContent(Product.FaceID)
  const htmlAst = await mdTextToHTMLAst(fileContent)
  const globalBanners = await getGlobalBanners()
  return {
    props: {
      htmlAst,
      globalBanners
    }
  }
}
