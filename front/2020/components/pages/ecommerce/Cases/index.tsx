import React, { ReactNode } from 'react'
import Section from 'components/Product/Section'
import { Row, Card, Img, Desc, Title } from 'components/UI/Card'

import case1 from './images/case1.png'
import case2 from './images/case2.png'
import case3 from './images/case3.png'

import style from './index.less'

const cases = [
  {
    icon: case1,
    customer: '蘑菇街',
    remark: '蘑菇街是女性时尚媒体和时尚消费平台，围绕“内容+社区+电商”这一核心策略，蘑菇街通过买手直播等更年轻化的业务形式，为用户带来了最潮流的产品，更时尚的消费生活体验。'
  },
  {
    icon: case2,
    customer: '寺库',
    remark: '寺库主要业务涉及奢侈品网上销售、奢侈品实体体验会所、奢侈品鉴定、养护服务等主营业务。致力于依托数字化打造最具实力的全球领先奢侈品一站式服务平台，为追求高品质生活人士提供交流平台。'
  },
  {
    icon: case3,
    customer: '小红书',
    remark: '在小红书社区，用户通过文字、图片、视频笔记的分享，记录了这个时代年轻人的正能量和美好生活，背后是强大数据处理能力和视频解决方案的支撑。同时小红书通过机器学习对海量信息和人进行精准、高效匹配。'
  }
]

interface CustomerRemarkProps {
  icon: ReactNode
  customer: string
  remark: string
}

function CustomerRemark({ icon, customer, remark }: CustomerRemarkProps) {
  return (
    <Card>
      {
        typeof icon === 'string'
          ? <Img className={style.image} src={icon} />
          : icon
      }
      <Title className={style.title}>{customer}</Title>
      <Desc className={style.desc}>{remark}</Desc>
    </Card>
  )
}

export default function Scene() {
  return (
    <Section name="cases" title="客户案例">
      <Row>
        {
          cases.map((item, index) => (
            <CustomerRemark {...item} key={index} />
          ))
        }
      </Row>
    </Section>
  )
}
