/**
 * @file 智能视频云应用场景 index.tsx
 * @description 包含智能视频云应用场景
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import { useMobile } from 'hooks/ua'

import Section from 'components/Product/Section'
import * as Cards from 'components/UI/Card'

import SceneImgOneURL from './scene-img-one.png'
import SceneImgTwoURL from './scene-img-two.png'
import SceneImgThreeURL from './scene-img-three.png'
import SceneImgFourURL from './scene-img-four.png'
import SceneImgFiveURL from './scene-img-five.png'

import styles from './style.less'

export default function QavsScene() {
  const isMobile = useMobile()

  return (
    <Section name="scene" title="应用场景" header="典型应用场景">
      <Cards.Row>
        <Cards.Card>
          <Cards.Img className={styles.img} src={SceneImgOneURL} />
          <Cards.Content>
            <Cards.Title>安防监控</Cards.Title>
            <Cards.Desc>
              视频监控领域正在面临着产业升级，使得安防监控与互联网更加紧密地结合。
              七牛智能视频云助力用户快速打造道路交通监控、城市安全监控、公共区域监控、家庭安防监控场景下的智能监控平台。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
        <Cards.Card>
          <Cards.Img className={styles.img} src={SceneImgTwoURL} />
          <Cards.Content>
            <Cards.Title>在线教育</Cards.Title>
            <Cards.Desc>
              利用互联网音视频技术，在线教育解决了优质教育资源传递的时空限制。
              七牛智能视频云助力用户打造集直播课堂、实时互动、点播回放、智能视频标签、智能视频推荐等功能为一体的在线教育平台。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
        <Cards.Card>
          <Cards.Img className={styles.img} src={SceneImgThreeURL} />
          <Cards.Content>
            <Cards.Title>广电新媒体</Cards.Title>
            <Cards.Desc>
              面对传统广电媒体向融合媒体转型的需求，七牛智能视频云提供从制作生产、多级审核、媒资管理、传播分发到智能数据采集分析的一站式解决方案。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
      </Cards.Row>
      <Cards.Row>
        <Cards.Card>
          <Cards.Img className={styles.img} src={SceneImgFourURL} />
          <Cards.Content>
            <Cards.Title>智慧法院</Cards.Title>
            <Cards.Desc>
              依托七牛智能视频云，司法机构可以充分运用互联网、大数据、云计算、
              人工智能等先进信息技术实现海量视频存储、公开开庭案件实时直播、视频及文书内容检索分析等场景。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
        <Cards.Card>
          <Cards.Img className={styles.img} src={SceneImgFiveURL} />
          <Cards.Content>
            <Cards.Title>远程医疗</Cards.Title>
            <Cards.Desc>
              当前医疗资源还存在着地区分布不均问题，远程医疗解决了跨区域医疗问题。
              依托七牛智能视频云，医疗机构可以打造一站式新医疗生态，实现临床交互式会诊、远程影像会诊、远程医疗培训等。
            </Cards.Desc>
          </Cards.Content>
        </Cards.Card>
        {isMobile ? null : <Cards.Card className={styles.placeholder} />}
      </Cards.Row>
    </Section>
  )
}
