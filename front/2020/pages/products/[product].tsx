import React, { useState, useEffect, useContext } from 'react'
import { GetServerSidePropsContext } from 'next'

import { getProduct, priceUrlMap } from 'constants/products'
import { isPreviewContext } from 'utils/admin-preview'
import { urlForPrice } from 'utils/route'
import {
  getProductPageInfo, listAllProductPagePaths, ProductPageInfo, getNews, INewsResponse
} from 'apis/admin/product'
import { getGlobalBanners, GlobalBanner } from 'apis/admin/global-banners'
import { AdvertInfo, getProductPageNotices, productCodeMap, ProductPageNotice } from 'apis/thallo'
import { useAdminBtns } from 'hooks/product-btn'
import { IconMap } from 'components/LibIcon'
import { headerThemeContext } from 'components/Header/Pc'
import Layout from 'components/Product/Layout'
import Navigator from 'components/Product/Navigator'
import Section from 'components/Product/Section/v2'
import PageBanner from 'components/Product/PageBanner'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'
import ProductUsageGuide from 'components/Product/common/ProductUsageGuide'
import { getIconIdsFromJson, getIconMap } from 'apis/admin/icon-lib'
import { ComponentName, ComponentMap } from 'constants/products/components'
import { useMobile } from 'hooks/ua'
import NotFoundPage from 'pages/404'

interface PageContentProps {
  productInfo: ProductPageInfo
  notices: {
    news: Array<AdvertInfo<ProductPageNotice>>
    mkts: Array<AdvertInfo<ProductPageNotice>>
  } | null
  news: INewsResponse | null
}

export interface ProductPageProps extends Omit<PageContentProps, 'productInfo'> {
  productInfo: PageContentProps['productInfo'] | null
  iconMap: IconMap
  globalBanners: GlobalBanner[]
}

function PageContent({ productInfo, notices, news }: PageContentProps) {
  const isPreview = useContext(isPreviewContext)
  const isMobile = useMobile()

  const { path, name, desc, banner, usageGuide, sections } = productInfo
  const product = getProduct(path)

  const priceUrl = product && priceUrlMap[product] ? urlForPrice(product) : undefined

  const btns = useAdminBtns(banner.buttons, !banner.light)

  const [currentNotices, setCurrentNotices] = useState(notices)

  useEffect(() => {
    if (product && (notices || isPreview)) {
      getProductPageNotices(product as keyof typeof productCodeMap).then(
        newNotices => { setCurrentNotices(newNotices) },
        // eslint-disable-next-line no-console
        err => { console.error(err) }
      )
    }
  }, [product, notices, isPreview])

  return (
    <>
      {banner && (
        <PageBanner
          title={name}
          desc={desc.detail}
          bgImgUrl={isMobile ? (banner.bgImgUrl.small || banner.bgImgUrl.large) : banner.bgImgUrl.large}
          bgColor={banner.bgColor}
          btns={btns.banner}
          light={banner.light}
        />
      )}

      {currentNotices && (<ProductNotice {...currentNotices} />)}

      <Navigator priceLink={priceUrl}>{btns.nav}</Navigator>

      {sections.map(section => {
        const { name: sectionName, title: sectionTitle, component } = section

        if (component.name === ComponentName.News) {
          return news && (<ProductNews newsRes={news} withTailPadding />)
        }

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

      {usageGuide && (<ProductUsageGuide {...usageGuide} />)}
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

  // eslint-disable-next-line no-nested-ternary
  const theme = productInfo.banner.light == null
    ? 'default'
    : (productInfo.banner.light ? 'light' : 'dark')

  return (
    <headerThemeContext.Provider value={theme}>
      <Layout {...metaInfo} globalBanners={globalBanners} iconMap={iconMap}>
        <PageContent productInfo={productInfo} {...otherProps} />
      </Layout>
    </headerThemeContext.Provider>
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
      news: product
        ? (await getNews({ product }))
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
