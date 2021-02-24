/**
 * @file 智能视频云应用场景 index.tsx
 * @description 包含智能视频云应用场景
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

/* eslint-disable max-len */

import React from 'react'

import { useMobile } from 'hooks/ua'

import Section from 'components/Product/Section'
import * as Cards from 'components/UI/Card'
import Button from 'components/UI/Button'

import scene1 from './scene1.png'
import scene2 from './scene2.png'
import scene3 from './scene3.png'
import scene4 from './scene4.png'
import scene5 from './scene5.png'
import scene6 from './scene6.png'
import scene7 from './scene7.png'

import styles from './style.less'

export default function QavsScene() {
  const isMobile = useMobile()

  return (
    <Section name="scene" title="应用场景" header="典型应用场景">
      <Cards.Row>
        <Cards.Card className={styles.card}>
          <Cards.Img className={styles.img} src={scene1} />
          <Cards.Content className={styles.content}>
            <Cards.Title>新零售</Cards.Title>
            <Cards.Desc className={styles.desc}>
              新零售时代的来临促使传统零售业将生产、流通、销售等环节进行数字化改造。七牛云基于智能视频云技术打造「新零售在线销售解决方案」，赋能新零售行业从无到有的起步和发展，有针对性的为商家和消费者之间建立连接，实现商家和消费者的双向互动。
            </Cards.Desc>
            <Button className={styles.btn} href="/solutions/retailing-onlinesale" type="hollow" withBorder>了解更多</Button>
          </Cards.Content>
        </Cards.Card>
        <Cards.Card className={styles.card}>
          <Cards.Img className={styles.img} src={scene2} />
          <Cards.Content className={styles.content}>
            <Cards.Title>金融产品</Cards.Title>
            <Cards.Desc className={styles.desc}>
              保险、基金等产品面临销售渠道线上化运营，如何依托线上流量与私域流量进行裂变转化，维护存量客户、提高客户质量对企业的发展至关重要。七牛云基于智能视频云技术打造「金融产品在线营销解决方案」，为金融产品在线营销提供智能、高效、一站式的视频解决方案，并提供完整的数据分析与处理服务，推动业务成交。
            </Cards.Desc>
            <Button className={styles.btn} href="/solutions/fin-onlinesale" type="hollow" withBorder>了解更多</Button>
          </Cards.Content>
        </Cards.Card>
        <Cards.Card className={styles.card}>
          <Cards.Img className={styles.img} src={scene3} />
          <Cards.Content>
            <Cards.Title>安防监控</Cards.Title>
            <Cards.Desc>
              视频监控领域正在面临着产业升级，使得安防监控与互联网更加紧密地结合。七牛智能视频云助力用户快速打造道路交通监控、城市安全监控、公共区域监控、家庭安防监控场景下的智能监控平台。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
      </Cards.Row>
      <Cards.Row>
        <Cards.Card className={styles.card}>
          <Cards.Img className={styles.img} src={scene4} />
          <Cards.Content>
            <Cards.Title>在线教育</Cards.Title>
            <Cards.Desc>
              利用互联网音视频技术，在线教育突破了优质教育资源传递的时空限制。七牛智能视频云助力用户打造集直播课堂、实时互动、点播回放、智能视频标签、智能视频推荐等功能为一体的在线教育平台。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
        <Cards.Card className={styles.card}>
          <Cards.Img className={styles.img} src={scene5} />
          <Cards.Content>
            <Cards.Title>广电新媒体</Cards.Title>
            <Cards.Desc>
              面对传统广电媒体向融合媒体转型的需求，七牛智能视频云提供从制作生产、多级审核、媒资管理、传播分发到智能数据采集分析的一站式解决方案。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
        <Cards.Card className={styles.card}>
          <Cards.Img className={styles.img} src={scene6} />
          <Cards.Content>
            <Cards.Title>智慧法院</Cards.Title>
            <Cards.Desc>
              依托七牛智能视频云，司法机构可以充分运用互联网、大数据、云计算、人工智能等先进信息技术，满足海量视频存储、公开开庭案件实时直播、视频及文书内容检索分析等需求。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
      </Cards.Row>
      <Cards.Row>
        <Cards.Card className={styles.card}>
          <Cards.Img className={styles.img} src={scene7} />
          <Cards.Content>
            <Cards.Title>远程医疗</Cards.Title>
            <Cards.Desc>
              当前医疗资源还存在着地区分布不均问题，远程医疗解决了跨区域医疗问题。依托七牛智能视频云，医疗机构可以打造一站式新医疗生态，实现临床交互式会诊、远程影像会诊、远程医疗培训等。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
        {
          isMobile
            ? null
            : (
              <>
                <Cards.InvisibleCard className={styles.placeholder} />
                <Cards.InvisibleCard className={styles.placeholder} />
              </>
            )
        }
      </Cards.Row>
    </Section>
  )
}
