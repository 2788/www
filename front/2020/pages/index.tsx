/**
 * @file 首页内容
 */

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react'
import { InferGetStaticPropsType } from 'next'
import cls from 'classnames'
import { memoize } from 'lodash'

import Carousel from 'react-icecream-2/lib/Carousel'

import Layout from 'components/Layout'
import PageBanner from 'components/pages/index/PageBanner'

import { useApiWithParams } from 'hooks/api'
import { luminanceOf } from 'utils/img'
import { useTrackShow } from 'hooks/thallo'

import { headerThemeContext } from 'components/Header/Pc'
import Activities from 'components/pages/index/Activities'
import CloudProduct from 'components/pages/index/CloudProduct'
import Solutions from 'components/pages/index/Solutions'
import Cases from 'components/pages/index/Cases'
import Certs from 'components/pages/index/Certs'
import UsageGuide from 'components/pages/index/UsageGuide'
import Services from 'components/pages/index/Services'
import { getHomePageBanners, getHomePageActivities, AdvertInfo, HomePageBanner } from 'apis/thallo'

import styles from './style.less'

const luminanceOfWithCache = memoize(
  luminanceOf,
  (...args: Parameters<typeof luminanceOf>) => args.join(' ')
)

type BannerDark = {
  dark: boolean
  setDark: (dark: boolean) => void
}

/** 在整个页面上（主要是 banner 与 header 间）同步当前 banner 是否暗色的信息 */
const bannerDarkCtx = createContext<BannerDark>({
  dark: false,
  setDark: () => null
})

/**
 * 维护 banner 及相关信息，包括：
 * 1. 上报 sensors 广告位展示行为
 * 2. 基于当前 banner 的图片维护“是否 dark banner”信息
 */
function useBanner(banners: Array<AdvertInfo<HomePageBanner>>) {
  const [bannerWrapper, setBannerWrapper] = useState<HTMLDivElement | null>(null)
  const bannerDark = useContext(bannerDarkCtx)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const currentBanner = banners[currentBannerIndex]
  const setBannerDark = bannerDark.setDark

  // banner 可见时上报
  useTrackShow(bannerWrapper, currentBanner)

  // 切换 banner 时维护 bannerDark 信息
  useEffect(() => {
    if (currentBanner == null) return

    let cancelled = false
    luminanceOfWithCache(currentBanner.elements.pPic.value).then(luminanceOfBanner => {
      if (cancelled) return
      const threshold = 0.25 // 对 banner 要求严格一点，亮度小于 0.25 才认为是暗色
      setBannerDark(luminanceOfBanner < threshold)
    })
    return () => {
      cancelled = true
    }
  }, [currentBanner, setBannerDark])

  return {
    dark: bannerDark.dark,
    onBannerChange: setCurrentBannerIndex,
    setBannerWrapper
  }
}

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback context & ua context 等信息（由 `<Layout>` 提供）
function PageContent({ banners, activities }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { $: currentActivities } = useApiWithParams(
    getHomePageActivities,
    { params: [] }
  )

  const { dark, onBannerChange, setBannerWrapper } = useBanner(banners)

  return (
    <>
      <Carousel
        rootHtmlProps={{
          className: cls(styles.headerBanner, dark && styles.dark),
          ref: setBannerWrapper
        } as any}
        beforeChange={(_, current) => onBannerChange(current)}
        autoplaySpeed={5000}
        autoplay
      >
        {banners.map((banner, i) => (
          <PageBanner key={i} dark={dark} {...banner} />
        ))}
      </Carousel>

      <Activities activities={currentActivities || activities} />
      <CloudProduct />
      <Solutions />
      <Cases />
      <Certs />
      <UsageGuide />
      <Services />
    </>
  )
}

export default function IndexPage({ banners, activities }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [dark, setDark] = useState(false)
  const bannerDark = useMemo(() => ({ dark, setDark }), [dark, setDark])
  return (
    <bannerDarkCtx.Provider value={bannerDark}>
      <headerThemeContext.Provider value={dark ? 'dark' : 'light'} >
        <Layout
          title=""
          keywords="七牛, 七牛云, 七牛云存储, 七牛直播云, 七牛CDN加速, 七牛短视频, 七牛智能视频云, 七牛实时音视频云, 七牛数据分析平台"
          description="七牛云（隶属于上海七牛信息技术有限公司）是国内知名的云计算及数据服务提供商， 七牛云持续在海量文件存储、CDN 内容分发、视频点播、互动直播及大规模异构数据的智能分析与处理等领域的核心技术进行深度投入，致力于以数据科技全面驱动数字化未来，赋能各行各业全面进入数据时代。"
        >

          <PageContent banners={banners} activities={activities} />
        </Layout>
      </headerThemeContext.Provider>
    </bannerDarkCtx.Provider >
  )
}

export async function getStaticProps() {
  return {
    props: {
      banners: await getHomePageBanners(),
      activities: await getHomePageActivities()
    }
  }
}
