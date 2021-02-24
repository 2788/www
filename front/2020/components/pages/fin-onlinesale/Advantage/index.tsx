import React from 'react'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'
import { useMobile } from 'hooks/ua'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import MobileIcon2 from './images/mobileIcon2.svg'
import Icon3 from './images/icon3.svg'

const advantages = [
  {
    icon: <Icon1 />,
    title: '直播行为基层化',
    descs: [
      '赋能百万保险代理人。通过业务直播系统，将集团要直播变为保险代理人要直播。保险代理人可申请直播，也可通过微信分发总部直播链接。潜在客户观看直播后，相关观看行为数据、需求偏好、目标客户列表等报告，通过保险代理人账号可一键查看，进而对需求客户进行针对性跟踪及商务洽谈，推动业务成交',
      '适合大中型企业的组织架构管理，赋能各分支机构/门店开展直播，总部进行在线管控'
    ]
  },
  {
    icon: <Icon2 />,
    mobileIcon: <MobileIcon2 />,
    title: <>创建代理人体系，<br />激活代理人传播热情</>,
    mobileTitle: '创建代理人体系，激活代理人传播热情',
    descs: [
      '由“代理人”作为传播节点。在直播分享过程中，代理人的微信号、手机、头像等联系方式会自动呈现在直播观看页。通过分享总部的直播链接，代理人的个人信息也得到大幅传播，提升销售可行性'
    ]
  },
  {
    icon: <Icon3 />,
    title: <>私聊及一键音视频咨询，<br />实现零距离销售</>,
    mobileTitle: '私聊及一键音视频咨询，实现零距离销售',
    descs: [
      '潜在客户观看时，不仅可以在公共区域文字聊天，也可直接与保险代理人 1 V 1 私聊，有利于提高保险成单概率',
      '如果私聊不满足要求，客户也可在观看页点击“视频”按键，一键与代理人音频或视频交流，增强沟通的可信度与效率，提升成交概率'
    ]
  }
]

export default function Advantage() {
  const isMobile = useMobile()

  return (
    <Feature title="方案优势" name="advantage">
      <FeatureGroup>
        {
          advantages.map((item, index) => (
            <FeatureItem pos="top-down" align="left" icon={isMobile && item.mobileIcon || item.icon} title={isMobile && item.mobileTitle || item.title} key={index}>
              {
                item.descs.map((desc, i) => (
                  <FeatureDesc preIcon="check" key={i}>{desc}</FeatureDesc>
                ))
              }
            </FeatureItem>
          ))
        }
      </FeatureGroup>
    </Feature>
  )
}
