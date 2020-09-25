import React from 'react'
import Section from 'components/Product/Section'
import Arch from './images/architecture.svg'
import style from './index.less'

const architectures = [
  {
    title: '方案架构优势',
    content: [
      '一站式解决方案快速接入上线',
      '视频传输低延时高画质。通过实时音频（RTC），提供兼容度更高、超低延时的传输服务、支持全高清画面采集',
      '白板教学、低码率、强互动。平均码率低于 10Kbps，大幅度降低白板的带宽占用量。提供多人白板互动组件，让在线教学更有趣',
      '智能人脸核验提升教学质量。基于七牛的人脸核验可实现人脸匹配签到、学员离开告警等，有效监控教学质量。',
      '服务端合流极大降低成本。解决主流混流方案的上下行带宽瓶颈问题和编解码问题，降低计算资源和网络带宽成本'
    ]
  },
  {
    title: '客户痛点',
    content: [
      '服务器搭建及维护耗时费力',
      '音视频直播课、白板教学、学员互动开发周期较长',
      '网络安全及课程版权',
      '支付、AI 大数据分析用户行为需要单独开发等'
    ]
  }
]

export default function Architecture() {
  return (
    <Section name="architecture" title="方案架构">
      <Arch className={style.icon} />
      <div className={style.container}>
        {
          architectures.map((architecture, index) => (
            <div className={style.content} key={index}>
              <h3 className={style.title}>{architecture.title}</h3>
              <ul className={style.list}>
                {
                  architecture.content.map((item, i) => (
                    <li className={style.item} key={`${index}-${i}`}>
                      <p>{item}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </Section>
  )
}
