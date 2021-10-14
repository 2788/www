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
      <Banner product="价格 | 视频监控">
        <PriceMdPreview htmlAst={htmlAst} />
      </Banner>
    </>
  )
}

export default function Main({ htmlAst }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="价格 | 视频监控"
      keywords="qvs价格, qvs费用, qvs多少钱, qvs价格计算, 视频监控价格, 视频监控费用, 视频监控多少钱, 视频监控价格计算"
      description=""
    >
      <Page htmlAst={htmlAst} />
    </Layout>
  )
}

export async function getStaticProps() {
  const fileContent = await getPriceFileContent(Product.Qvs)
  const htmlAst = await mdTextToHTMLAst(fileContent)
  return {
    props: {
      htmlAst
    }
  }
}
