import React from 'react'
import { Product } from 'constants/products'
import Scene, { Panel as ScenePanel, Block as SceneBlock } from 'components/Product/Scene'

import Related, { Item, ProductItem } from 'components/Solution/Scene/Related'

import Icon1 from './images/scene-1.svg'
import Icon2 from './images/scene-2.svg'
import Icon3 from './images/scene-3.svg'
import Icon4 from './images/scene-4.svg'
import Icon5 from './images/scene-5.svg'
import JxbbIcon from './images/jxbb.svg'
import ImIcon from './images/im.svg'
import style from './style.less'

const JxbbItem = <Item icon={<JxbbIcon />}>教学白板</Item>
const ImItem = <Item icon={<ImIcon />}>IM</Item>

const panels = [
  {
    icon: <Icon1 />,
    title: '点播教学',
    desc: '提供端到端的点播技术服务，帮助用户高效上传各类教学内容至海量存储，同时对内容进行审核、处理及智能识别，通过遍布全球的 CDN 网络高效分发内容至学生终端。',
    use: '课程点播、考试培训、财经讲座、技能培训、直播课回放等',
    advantages: [
      '提供内容上传、审核、存储、分发、播放、质量分析全链路解决方案。',
      '全球 2000+ 的 CDN 节点覆盖，保障稳定、流畅的课程播放体验。',
      '多终端播放器 SDK，支持倍速播放、滑屏调节、多清晰度支持、HLS 自适应码率切换、防盗链策略、水印等功能。',
      '支持 DRM 版权保护，防止数字媒体非法复制，有效保护课程资源。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.Cdn} />
        <ProductItem product={Product.QnPlayer} />
      </Related>
    )
  },
  {
    icon: <Icon2 />,
    title: '一对一教学',
    desc: '一对一教学指的是一位老师对一位学生，通过超低延时的音视频互动服务进行线上专属辅导教学，让在线教学如同面对面沟通一样简单。',
    use: '外语培训、音乐陪练、舞蹈教学、心理咨询等',
    advantages: [
      '150 ms 超低延迟音视频服务，保证师生高质量在线互动体验。',
      '适配 iOS、Android、Windows、Web、微信小程序等多种平台。',
      '提供教学白板、美颜特效、屏幕共享、实时录制等功能，增强教学体验。',
      '全球网络节点覆盖，提供稳定、高可靠的实时音视频服务保障。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.QnPlayer} />
        <ProductItem product={Product.Beautysdk} />
        {JxbbItem}
        {ImItem}
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.Dora} />
      </Related>
    )
  },
  {
    icon: <Icon3 />,
    title: '互动直播课',
    desc: '一名老师面向多位学生进行授课，学生可以申请上麦进行音视频互动，师生之间还可以通过教学白板、IM 等工具进行实时交流互动。',
    use: '线上沙龙、少儿编程、小班课、大班课等',
    advantages: [
      '全球实时流网络 LiveNet，支持无上限的直播观看人数。',
      '支持老师与学生多人连麦互动。服务端合流，极大改善合流效率、稳定性和画面质量。',
      '提供多人白板互动、涂鸦、AI 特效、IM 聊天等丰富教学功能，有效提升课堂氛围。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Pili} />
        <ProductItem product={Product.Beautysdk} />
        <ProductItem product={Product.Dora} />
        {JxbbItem}
        {ImItem}
        <ProductItem product={Product.Cdn} />
      </Related>
    )
  },
  {
    icon: <Icon4 />,
    title: '双师课堂',
    desc: '老师在线上远程授课，助教在线下课堂辅助管理，通过音视频技术实现线上线下实时互动，有效提升教学质量，促使不同地域学生享受同等的优质教育资源。',
    use: '兴趣培训、职业教育、偏远地区教学、公立学校教育等',
    advantages: [
      '去中心化的实时流网络 LiveNet，满足跨地域、大规模的教师和学生同时接入。',
      '中小城市网络优化，超强的弱网抗丢包能力、减少卡顿率，保证授课和听课优质体验。',
      '直播课程实时云端保存，提供点播、下载、转码等功能，助力二次教学。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Pili} />
        {JxbbItem}
        {ImItem}
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.Cdn} />
        <ProductItem product={Product.Dora} />
      </Related>
    )
  },
  {
    icon: <Icon5 />,
    title: '线上监考',
    desc: '考生登录考试系统，七牛云提供实时音视频监控、人脸识别、视频抓拍等功能，保证考生随时随地都能参加考试，并保障考试秩序。',
    use: '基础教育考试、证书认证、知识竞赛、企业培训考试等',
    advantages: [
      '多终端支持，支持随时随地进行大规模线上考试。',
      '监考老师与学生可实时互动，解答考试过程中的突发问题。',
      '精准的人脸识别，对考生进行身份审核验证、违规抓拍，防止考试作弊。'
    ],
    relatedComponent: (
      <Related>
        <ProductItem product={Product.Rtn} />
        <ProductItem product={Product.Dora} />
        <ProductItem product={Product.FaceID} />
        <ProductItem product={Product.Kodo} />
        <ProductItem product={Product.Cdn} />
      </Related>
    )
  }
]

export default function EduScene() {
  return (
    <Scene name="scene" title="应用场景" defaultActive="scene-tab-0">
      {
        panels.map((panel, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={panel.title} key={index}>
            <div className={style.iconContainer}>{panel.icon}</div>
            <SceneBlock className={style.block} shadow withoutMargin>
              <h4 className={style.title}>场景描述</h4>
              <p className={style.content}>{panel.desc}</p>
              <h4 className={style.title}>应用场景</h4>
              <p className={style.content}>{panel.use}</p>
              <h4 className={style.title}>方案优势</h4>
              <ul className={style.list}>
                {
                  panel.advantages.map((advantage, i) => (
                    <li className={style.item} key={i}>{advantage}</li>
                  ))
                }
              </ul>
              <h4 className={style.title}>相关产品</h4>
              {panel.relatedComponent}
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene >
  )
}
