/**
 * 七牛云产品
 */
import React, { createElement } from 'react'
import classnames from 'classnames'
import Layout from 'components/Layout'
import Link from 'components/Link'
import MpBanner from 'components/mp/Banner'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Category, categoryNameMap, nameMap, urlMap, categorySolutionsMap, Solution, iconMap } from 'constants/solutions'
import { MpPage } from 'constants/mp'

import banner from './banner.png'
import bannerContact from './banner_contact.png'
import style from './index.less'

export default function Main() {
  return (
    <Layout title="七牛云解决方案" keywords="" description="">
      <div style={{ padding: '16px' }}>
        <MpBanner banner={banner} />
        <h1 className={style.title}>全部解决方案</h1>
        <Tabs value={Category.Scene} size="middle" className={style.tabs} contentClassName={style.tabsContent}>
          <TabPane value={Category.Scene} tab={categoryNameMap[Category.Scene]}>
            {
              categorySolutionsMap[Category.Scene]
                .map(solution => <Card key={solution} category={Category.Scene} solution={solution} />)
            }
          </TabPane>
          <TabPane value={Category.Industry} tab={categoryNameMap[Category.Industry]}>
            {
              categorySolutionsMap[Category.Industry]
                .map(solution => <Card key={solution} category={Category.Industry} solution={solution} />)
            }
          </TabPane>
        </Tabs>
        <MpBanner
          title="更多方案咨询"
          subtitle={<>使用场景和行业的更多咨询<br />欢迎联系我们</>}
          banner={bannerContact}
          style={{ marginTop: 24 }}
          onClick={() => wx.miniProgram.navigateTo({ url: MpPage.ServiceAndConsult })}
        />
      </div>
    </Layout>
  )
}

type CardProps = {
  solution: Solution
  category: Category
}

function Card({ solution, category }: CardProps) {
  const styleMap = {
    [Category.Scene]: style.scene,
    [Category.Industry]: style.industry
  }
  return (
    <Link className={classnames(style.card, styleMap[category])} href={urlMap[solution] as string}>
      <div className={style.cardIcon}>{createElement(iconMap[solution])}</div>
      <div className={style.cardTitle}>{nameMap[solution]}</div>
    </Link>
  )
}
