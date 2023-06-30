import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Price/Layout'
import Tabs from 'components/Price/Tabs'
import DocumentPane, { mdTextToHTMLAst, HTMLRootNode } from 'components/Price/Tabs/DocumentPane'
import { Product, nameMap } from 'constants/products'
import { getPriceFileContent } from 'apis/admin/product'
import { getGlobalBanners } from 'apis/admin/global-banners'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page({ htmlAst }: { htmlAst: HTMLRootNode | null }) {
  return (
    <>
      <Tabs product={`价格 | ${nameMap[Product.Qnvs]}`}>
        <DocumentPane htmlAst={htmlAst} />
      </Tabs>
    </>
  )
}

export default function Main({ htmlAst, globalBanners }: Props) {
  return (
    <Layout
      title={`价格 | ${nameMap[Product.Qnvs]}`}
      keywords={`${nameMap[Product.Qnvs]}价格, ${nameMap[Product.Qnvs]}费用, ${nameMap[Product.Qnvs]}多少钱, ${nameMap[Product.Qnvs]}价格计算，一键认证SDK，一键登录，号码认证`}
      description="七牛云号码认证服务为您提供的包含一键登录和本机认证服务，一键登录功能支持自动获取手机号码，用户一键通过验证，无需号码手动输入和短信验证；本机认证功能在用户输入手机号码后，自动校验与当前本机卡号的一致性，无需发送短信验证码。"
      globalBanners={globalBanners}
    >
      <Page htmlAst={htmlAst} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const fileContent = await getPriceFileContent(Product.Qnvs)
  const htmlAst = await mdTextToHTMLAst(fileContent)
  const globalBanners = await getGlobalBanners()
  return {
    props: {
      htmlAst,
      globalBanners
    }
  }
}
