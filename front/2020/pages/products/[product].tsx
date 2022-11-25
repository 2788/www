import React from 'react'
import { GetServerSidePropsContext } from 'next'

import { getProductPageInfo, listAllProductPagePaths, ProductPageInfo } from 'apis/admin/product'
import { getGlobalBanners, GlobalBanner } from 'apis/admin/global-banners'
import { AdvertInfo, getProductPageNotices, productCodeMap, ProductPageNotice } from 'apis/thallo'
import { useAdminBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'
import { getProduct, priceUrlMap } from 'constants/products'
import { IconMap } from 'components/LibIcon'

import Layout from 'components/Product/Layout'
import Navigator from 'components/Product/Navigator'
import Section from 'components/Product/Section/v2'
import PageBanner from 'components/Product/PageBanner'
import ProductNotice from 'components/Product/common/ProductNotice'
import { getIconIdsFromJson, getIconMap } from 'apis/admin/icon-lib'
import { ComponentMap } from 'constants/products/components'
import { useMobile } from 'hooks/ua'
import NotFoundPage from 'pages/404'

export interface ProductPageProps {
  notices?: {
    news: Array<AdvertInfo<ProductPageNotice>>
    mkts: Array<AdvertInfo<ProductPageNotice>>
  }
  productInfo: ProductPageInfo | null
  iconMap?: IconMap
  globalBanners?: GlobalBanner[]
}

type PageContentProps = Omit<ProductPageProps, 'iconMap' | 'globalBanners'> & { productInfo: ProductPageInfo }

function PageContent({ notices, productInfo }: PageContentProps) {
  const isMobile = useMobile()

  const { path, name, desc, banner, sections } = productInfo
  const product = getProduct(path)

  const priceUrl = product ? priceUrlMap[product] || undefined : undefined

  const btns = useAdminBtns(banner!.buttons, banner?.light)
  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: notices ? [product as keyof typeof productCodeMap] : null
  })

  return (
    <>
      {banner && (
        <PageBanner
          title={name}
          desc={desc.detail}
          bgImgUrl={isMobile ? (banner.bgImgUrl.small || banner.bgImgUrl.large) : banner.bgImgUrl.large}
          bgColor={banner.bgColor}
          btns={btns.banner}
          light={banner.light} />
      )}

      {(currentNotices && notices) && <ProductNotice {...(currentNotices || notices)} />}

      <Navigator priceLink={priceUrl}>{btns.nav}</Navigator>

      {sections.map(section => {
        const { name: sectionName, title: sectionTitle, component } = section
        const Component = ComponentMap[component.name]
        if (!Component) {
          return null
        }
        return (
          <Section key={sectionName} name={sectionName} title={sectionTitle} withTailPadding>
            <Component {...component.props as any} />
          </Section>
        )
      })}
    </>
  )
}

export default function ProductPage({
  globalBanners, iconMap, productInfo, ...otherProps
}: ProductPageProps) {
  if (productInfo == null) {
    return <NotFoundPage globalBanners={globalBanners} />
  }

  const { title, keywords, desc } = productInfo
  const metaInfo = {
    title,
    keywords: keywords.join(','),
    description: desc.detail
  }

  return (
    <Layout {...metaInfo} globalBanners={globalBanners || []} iconMap={iconMap}>
      <PageContent productInfo={productInfo} {...otherProps} />
    </Layout>
  )
}

export async function getServerSideProps({ params, res }: GetServerSidePropsContext<{ product: string }>) {
  const path = params!.product

  const productInfo = await getProductPageInfo(path)

  if (productInfo == null) {
    // TODO：暂时这么处理，升级 next 后可以：return { notFound: true }
    // 参考：https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#notfound
    res.statusCode = 404
    return { props: {} }
  }

  const icons = getIconIdsFromJson(productInfo)
  const product = getProduct(path)

  return {
    props: {
      notices: product
        ? (await getProductPageNotices(product as keyof typeof productCodeMap))
        : null,
      productInfo,
      globalBanners: await getGlobalBanners(),
      iconMap: await getIconMap(icons)
    }
  }
}

export async function getServerSidePaths() {
  const paths = await listAllProductPagePaths()
  return {
    paths: paths.map(path => ({ params: { path } })),
    fallback: false
  }
}
