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

import Subscript, { IProps as ISubscriptProps } from 'components/common/Subscript'

import { useLocalStore } from 'qn-fe-core/local-store'

import { campaignTypeMap } from 'constants/campaign-type'

import { IActivityNavInfo, ISubscriptInfo } from 'apis/all-activity'

import AllActivityStore from './store'

import * as styles from './style.m.less'

export default observer(forwardRef(function AllActivity() {
  // 使用局部 store
  const allActivityStore = useLocalStore(AllActivityStore)

  function renderBannerWrapper() {
    return (
      <div className={styles.bannerWrapper}>
        <div className={`features ${styles.bannerFeatures}`}>
          <div className={`container ${styles.bannerContainer}`}>
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
      </div>
    )
  }

  function renderTabsWrapper() {
    const { campaignType, updateCampaignType } = allActivityStore

    return (
      <div className={styles.tabsWrapper}>
        <div className={`features ${styles.tabsFeatures}`}>
          <div className="container">
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
                disabled={allActivityStore.loadings.isLoading(allActivityStore.Loading.FetchList)}>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="特惠促销"
                key={campaignTypeMap.PROMOTION}
                disabled={allActivityStore.loadings.isLoading(allActivityStore.Loading.FetchList)}>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="新手福利"
                key={campaignTypeMap.BEGINNER}
                disabled={allActivityStore.loadings.isLoading(allActivityStore.Loading.FetchList)}>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="其他"
                key={campaignTypeMap.OTHER}
                disabled={allActivityStore.loadings.isLoading(allActivityStore.Loading.FetchList)}>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
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
            backgroundImage: background_image
          }

          return (
            <Col
              key={`activity-nav-colo-${index}`}
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

  function renderCardsWrapper() {
    return (
      <Spin
        size="large"
        className={styles.spinWrapper}
        spinning={allActivityStore.loadings.isLoading(allActivityStore.Loading.FetchList)}>
        <div className={`features ${styles.cardsFeatures}`}>
          <div className="container">
            {renderCardsOrEmpty()}
          </div>
        </div>
      </Spin>
    )
  }

  return (
    <div className={styles.mainWrapper}>
      {renderBannerWrapper()}
      {renderTabsWrapper()}
      {renderCardsWrapper()}
    </div>
  )
}))
