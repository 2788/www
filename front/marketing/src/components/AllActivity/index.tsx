/**
 * @file component All Activity
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { forwardRef } from 'react'
import { observer } from 'mobx-react'
import Spin from 'react-icecream/lib/spin'
import Row from 'react-icecream/lib/row'
import Col from 'react-icecream/lib/col'
import Tabs from 'react-icecream/lib/tabs'
import Empty from 'react-icecream/lib/empty'
import Button from 'react-icecream/lib/button'
import Carousel from 'react-icecream/lib/carousel'

import { useLocalStore } from 'qn-fe-core/local-store'

import Subscript, { IProps as ISubscriptProps } from 'components/common/Subscript'

import { campaignTypeMap } from 'constants/campaign-type'

import { IActivityNavInfo, ISubscriptInfo, IListActivityBannerInfo } from 'apis/all-activity'

import AllActivityStore from './store'

import * as styles from './style.m.less'

export default observer(forwardRef(function AllActivity() {
  // 使用局部 store
  const allActivityStore = useLocalStore(AllActivityStore)

  function renderBanner() {
    if (allActivityStore.loadings.isLoading(allActivityStore.Loading.FetchBannerList)) {
      return null
    }

    const { activityBannerList } = allActivityStore

    if (!activityBannerList || !activityBannerList.length) {
      return (
        <div className={styles.bannerFeatures}>
          <div className={`${styles.bannerContainer} ${styles.defaultBanner}`}>
            <Row
              className={styles.bannerTitle}
              gutter={48}>
              <Col span={24}>
                <h1>七牛云活动</h1>
                <p>产品优惠活动、免费云服务套餐、新手福利等，助力用户轻松上云</p>
              </Col>
            </Row>
          </div>
        </div>
      )
    }

    return (
      <Carousel autoplay={true}>
        {activityBannerList.map((data: IListActivityBannerInfo, index: number) => {
          const { title, image_src, link } = data
          const bgImageStyle = {
            backgroundImage: `url('${image_src}')`
          }
          const bannerContainer: JSX.Element = (
            <div
              key={`activity-banner-${index}`}
              className={styles.bannerContainer}
              style={bgImageStyle}
              {...title && { title }}>
            </div>
          )

          if (!link) {
            return <div>{bannerContainer}</div>
          }

          return (
            <a
              key={`activity-banner-${index}`}
              href={link}
              target="_blank"
              {...title && { title }}>
              {bannerContainer}
            </a>
          )
        })}
      </Carousel>
    )
  }

  function renderTabs() {
    const { campaignType, updateCampaignType } = allActivityStore

    return (
      <Tabs
        className={styles.tabs}
        type="no-line"
        activeKey={campaignType}
        onChange={(type: string) => {
          updateCampaignType(type)
        }}>
        <Tabs.TabPane
          tab="全部活动"
          key={campaignTypeMap.UNKNOWN}
          disabled={allActivityStore.loadings.isLoading(allActivityStore.Loading.FetchNavList)}>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="特惠促销"
          key={campaignTypeMap.PROMOTION}
          disabled={allActivityStore.loadings.isLoading(allActivityStore.Loading.FetchNavList)}>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="新手福利"
          key={campaignTypeMap.BEGINNER}
          disabled={allActivityStore.loadings.isLoading(allActivityStore.Loading.FetchNavList)}>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="其他"
          key={campaignTypeMap.OTHER}
          disabled={allActivityStore.loadings.isLoading(allActivityStore.Loading.FetchNavList)}>
        </Tabs.TabPane>
      </Tabs>
    )
  }

  function renderSubscript(subscript: ISubscriptInfo) {
    if (!subscript || !subscript.name) {
      return null
    }

    const { text, color } = subscript
    const props: ISubscriptProps = {
      text, color
    }
    return (
      <Subscript {...props} />
    )
  }

  function renderCardsOrEmpty() {
    const { activityNavList } = allActivityStore

    if (!activityNavList || !activityNavList.length) {
      return <Empty className={styles.empty} />
    }

    return (
      <Row gutter={48}>
        {activityNavList.map((data: IActivityNavInfo, index: number) => {
          const { nav_item: {
            title, subtitle, background_image, button_text, url
          }, subscript } = data

          const titleBgImageStyle = {
            backgroundImage: `url('${background_image}')`
          }

          return (
            <Col
              key={`activity-nav-col-${index}`}
              className={styles.cardWrapper}
              span={24}
              sm={{ span: 12 }}
              lg={{ span: 8 }}>
              <div className={styles.card}>
                {renderSubscript(subscript)}
                <div className={styles.cardTitle} style={titleBgImageStyle}>
                  <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
                </div>
                <div className={styles.cardContent}>
                  <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>
                  <Button
                    className={styles.jumpBtn}
                    href={`${url}?entry=gather-page`}
                    target="_blank">
                    {button_text}
                  </Button>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
    )
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.bannerWrapper}>
        {renderBanner()}
      </div>
      <div className={styles.tabsWrapper}>
        <div className={styles.tabsFeatures}>
          <div className={styles.tabsContainer}>
            {renderTabs()}
          </div>
        </div>
      </div>
      <Spin
        size="large"
        className={styles.spinWrapper}
        spinning={allActivityStore.loadings.isLoading(allActivityStore.Loading.FetchNavList)}>
        <div className={styles.cardsFeatures}>
          <div className={styles.cardsContainer}>
            {renderCardsOrEmpty()}
          </div>
        </div>
      </Spin>
    </div>
  )
}))
