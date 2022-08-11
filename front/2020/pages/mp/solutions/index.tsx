/**
 * 七牛云产品
 */
import React, { createElement } from 'react'
import { InferGetServerSidePropsType } from 'next'
import classnames from 'classnames'
import Layout from 'components/Layout'
import Link from 'components/Link'
import MpBanner from 'components/mp/Banner'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Category, categoryNameMapForMp, nameMap, urlMap, categorySolutionsMap, Solution, iconMap, categories } from 'constants/solutions'
import { MpPage } from 'constants/mp'
import { getGlobalBanners } from 'apis/admin/global-banners'

import banner from './banner.png'
import bannerContact from './banner_contact.png'
import style from './index.less'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Main({ globalBanners }: Props) {
  return (
    <Layout title="七牛云解决方案" keywords="" description="" globalBanners={globalBanners}>
      <div style={{ padding: '16px', background: '#FFFFFF' }}>
        <MpBanner banner={banner} />
        <h1 className={style.title}>全部解决方案</h1>
        <Tabs value={categories[0]} size="middle" className={style.tabs} contentClassName={style.tabsContent} shadow={false}>
          {
            categories.map(category => ((
              <TabPane key={category} value={category} tab={categoryNameMapForMp[category]}>
                {
                  categorySolutionsMap[category].map(solution => (
                    <Card key={solution} category={category} solution={solution} />
                  ))
                }
              </TabPane>
            )
            ))
          }
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
  const url = urlMap[solution]
  if (url === null) return null
  const icon = iconMap[solution] ? createElement(iconMap[solution]!) : null
  return (
    <Link
      className={classnames(style.card, category === Category.Industry && style.industry)}
      href={url}
    >
      <div className={style.cardIcon}>{icon}</div>
      <div className={style.cardTitle}>{nameMap[solution]}</div>
    </Link>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
