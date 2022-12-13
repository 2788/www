/**
 * @file 校园开发者成长计划 页面
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { useMobile } from 'hooks/ua'
import { getActivities } from 'apis/admin/activity'
import { getGlobalBanners } from 'apis/admin/global-banners'
import { getProductInfoMap } from 'apis/admin/product'
import { getIconIdsFromJson, getIconMap } from 'apis/admin/icon-lib'

import Layout from 'components/Product/Layout'
import { ActivityList } from 'components/pages/activity/main/List'
import Section from 'components/Product/Section/v2'
import Link from 'components/Link'
import PageBanner from 'components/Product/PageBanner'
import { headerThemeContext } from 'components/Header/Pc'
import { YouCanDo, allProductIds as youCanDoProductIds } from 'components/pages/student/YouCanDo'
import { Resources, allProductIds as resourcesProductIds } from 'components/pages/student/Resources'
import { StudyCenter, allProductIds as studentCenterProductIds } from 'components/pages/student/StudyCenter'
import useActivityRuleModal from 'components/pages/student/useActivityRuleModal'
import CertificationProcess, { Step } from 'components/pages/student/CertificationProcess'
import Button from 'components/UI/Button'

import bannerImg from './images/banner.jpg'
import bannerMobileImg from './images/banner_mobile.jpg'
import step1Url from './images/step1.png'
import step2Url from './images/step2.png'
import step3Url from './images/step3.png'
import step4Url from './images/step4.png'
import step5Url from './images/step5.png'

import styles from './style.less'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export type ProductInfoMap = Props['productInfoMap']

function Page({ activities, productInfoMap }: Omit<Props, 'globalBanners' | 'iconMap'>) {
  const isMobile = useMobile()
  const { showModal, activityRuleView } = useActivityRuleModal()

  return (
    <>
      <PageBanner
        title="校园开发者成长计划"
        desc="助力开发者全生命周期成长，培育数字时代的创新人才。七牛云校园开发者成长几计划免费提供音视频资源，助力云上实践、云上成长，创建生产及应用。"
        bgColor="#F4F6FB"
        bgImgUrl={isMobile ? bannerMobileImg : bannerImg} />

      <Section title="校园认证流程" name="certification" withTailPadding>
        <CertificationProcess>
          <Step number={1} iconUrl={step1Url} url="https://portal.qiniu.com/signup">注册/登录</Step>
          <Step number={2} iconUrl={step2Url} url="https://portal.qiniu.com/user/security">绑定校园邮箱</Step>
          <Step number={3} iconUrl={step3Url} url="https://portal.qiniu.com/user/profile">实名认证</Step>
          <Step number={4} iconUrl={step4Url} url="https://portal.qiniu.com/financial/coupons/coupon">查看抵用券</Step>
          <Step number={5} iconUrl={step5Url} url="https://marketing.qiniu.com/activity/student_growth">0 元下单资源包</Step>
        </CertificationProcess>
        <Button type="link" className={styles.certificationLink} onClick={showModal}>活动细则 {'>'}</Button>
      </Section>

      <Section title="你可以实现" name="you-can-do" withTailPadding>
        <YouCanDo productInfoMap={productInfoMap} />
        <div className={styles.youCanDoText}>更多场景等你创造</div>
      </Section>

      <Section title="海量云资源免费领取" name="resources" subTitle={isMobile ? undefined : '完成校园邮箱绑定和实名认证后即可获取'} withTailPadding>
        <Resources productInfoMap={productInfoMap} />
      </Section>

      <Section title="学习中心" name="study-center" withTailPadding>
        <StudyCenter productInfoMap={productInfoMap} />
      </Section>

      {activities && !!activities.length && (
        <Section title="精彩活动" name="activities" withTailPadding>
          <div className={styles.activities}>
            <ActivityList activities={activities} />
          </div>

          <Link href="/activity" className={styles.activityLink} blue>查看全部活动 {'>'}</Link>
        </Section>
      )}

      {activityRuleView}
    </>
  )
}

export default function Main({ globalBanners, activities, iconMap, ...otherProps }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title="校园开发者成长计划"
        keywords="校园开发者成长计划"
        description="助力开发者全生命周期成长，培育数字时代的创新人才。七牛云校园开发者成长几计划免费提供音视频资源，助力云上实践、云上成长，创建生产及应用"
        globalBanners={globalBanners || []}
        iconMap={iconMap}
      >
        <Page activities={activities} {...otherProps} />
      </Layout>
    </headerThemeContext.Provider>
  )
}

export async function getServerSideProps() {
  const productIds = [...youCanDoProductIds, ...studentCenterProductIds, ...resourcesProductIds]
  const productInfoMap = await getProductInfoMap(productIds)

  const [activitiesRes, globalBanners, iconMap] = await Promise.all([
    getActivities({ page: 1, pageSize: 2 }),
    getGlobalBanners(),
    getIconMap(getIconIdsFromJson(productInfoMap))
  ])
  return {
    props: {
      activities: activitiesRes.data,
      globalBanners,
      productInfoMap,
      iconMap
    }
  }
}
