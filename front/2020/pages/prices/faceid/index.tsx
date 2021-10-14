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
      <Banner product="价格 | 人脸核验">
        <PriceMdPreview htmlAst={htmlAst} />
      </Banner>
    </>
  )
}

export default function Main({ htmlAst }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="价格 | 人脸核验"
      keywords="人脸核验价格, 人脸核验费用, 人脸核验多少钱"
      description=""
    >
      <Page htmlAst={htmlAst} />
    </Layout>
  )
}

export async function getStaticProps() {
  const fileContent = await getPriceFileContent(Product.FaceID)
  const htmlAst = await mdTextToHTMLAst(fileContent)
  return {
    props: {
      htmlAst
    }
  }
}
