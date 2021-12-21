/**
 * @file 首页内容
 */

import React, { createContext, useState, useContext, useEffect } from 'react'
import { InferGetStaticPropsType } from 'next'
import cls from 'classnames'

import Carousel from 'react-icecream-2/lib/Carousel'

import Layout from 'components/Layout'
import PageBanner from 'components/pages/index/PageBanner'

import { useApiWithParams } from 'hooks/api'
import { isDark } from 'utils/color'

import { headerThemeContext } from 'components/Header/Pc'
import Activities from 'components/pages/index/Activities'
import CloudProduct from 'components/pages/index/CloudProduct'
import Solutions from 'components/pages/index/Solutions'
import Cases from 'components/pages/index/Cases'
import Certs from 'components/pages/index/Certs'
import UsageGuide from 'components/pages/index/UsageGuide'
import Services from 'components/pages/index/Services'
import { getBanners, Banner, getActivities, Activity } from 'apis/admin/homepage'

import styles from './style.less'

export type ContextValue = {
  dark?: boolean
  setDark: (dark: boolean) => void
}

export const context = createContext<ContextValue | null>(null)

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback context & ua context 等信息（由 `<Layout>` 提供）
function PageContent(
  { preBanners, preActivities }: { preBanners: Banner[], preActivities: Activity[] }
) {
  const { $: currentActivities } = useApiWithParams(
    getActivities,
    { params: [] }
  )
  const { $: currentBanners } = useApiWithParams(
    getBanners,
    { params: [] }
  )
  const contextValue = useContext(context)
  const banners = currentBanners || preBanners
  const [currentSlide, setCurrentSlide] = useState(0)
  useEffect(() => {
    if (contextValue) {
      const bgColor = banners[currentSlide]?.backgroundColor
      contextValue.setDark(bgColor !== undefined ? isDark(bgColor) : false)
    }
  }, [banners, contextValue, currentSlide])
  const dark = !!(contextValue?.dark)

  return (
    <>
      <Carousel
        rootHtmlProps={{ className: cls(styles.headerBanner, dark && styles.dark) }}
        beforeChange={(_, current) => setCurrentSlide(current)}
        autoplaySpeed={5000}
        autoplay
      >
        {
          banners.map((banner, index) => (
            <PageBanner {...banner} key={index} dark={dark} />
          ))
        }
      </Carousel>

      <Activities activities={currentActivities || preActivities} />

      <CloudProduct />

      <Solutions />

      <Cases />

      <Certs />

      <UsageGuide />

      <Services />
    </>
  )
}

export default function IndexPage({ preBanners, preActivities }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [dark, setDark] = useState<boolean>(false)
  return (
    <context.Provider value={{ dark, setDark }}>
      <headerThemeContext.Provider value={dark ? 'dark' : 'light'} >
        <Layout
          title=""
          keywords="七牛, 七牛云, 七牛云存储, 七牛直播云, 七牛CDN加速, 七牛短视频, 七牛智能视频云, 七牛实时音视频云, 七牛数据分析平台"
          description="七牛云（隶属于上海七牛信息技术有限公司）是国内知名的云计算及数据服务提供商， 七牛云持续在海量文件存储、CDN 内容分发、视频点播、互动直播及大规模异构数据的智能分析与处理等领域的核心技术进行深度投入，致力于以数据科技全面驱动数字化未来，赋能各行各业全面进入数据时代。"
        >

          <PageContent preBanners={preBanners} preActivities={preActivities} />
        </Layout>
      </headerThemeContext.Provider>
    </context.Provider >
  )
}

export async function getStaticProps() {
  return {
    props: {
      preBanners: await getBanners(),
      preActivities: await getActivities()
    }
  }
}
