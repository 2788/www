import React from 'react'
import Section from 'components/Product/Section'
import { Card, Row } from 'components/UI/Card'
import Button from 'components/UI/Button'

import style from './index.less'

export default function Arch() {
  return (
    <Section title="合作伙伴架构" name="arch">
      <Row>
        <MyCard
          title="代理合作伙伴"
          condition="有一定的客户服务经验，认同七牛品牌服务价值，愿意积极进行七牛云相关产品推广的销售型公司、企业服务商，或者是站长、创服社区、开发者社区等。"
          direction="标准、精英、战略伙伴，区域客户服务中心。"
        />
        <MyCard
          title="SI 合作伙伴"
          condition="具备系统集成资质，长期聚焦某些行业或者垂直领域，具备一定的客户资源以及方案整合能力，能够推广七牛的产品和服务。"
          direction="行业开拓，方案整合。"
        />
        <MyCard
          title="ISV 合作伙伴"
          condition="具备一定的软件开发能力，长期聚焦某些行业或者垂直领域，有能力依托七牛的核心技术和平台优势，开发可规模推广的行业产品或解决方案。"
          direction="行业开拓，合作产品开发。"
        />
      </Row>
    </Section>
  )
}

type Props = {
  title: string
  condition: string
  direction: string
}

function MyCard({ title, condition, direction }: Props) {
  return (
    <Card className={style.card}>
      <div className={style.title}>{title}</div>
      <div className={style.subtitle}>合作条件</div>
      <p className={style.text1}>{condition}</p>
      <div className={style.subtitle}>合作方向</div>
      <p className={style.text2}>{direction}</p>
      <Button href="https://jinshuju.net/f/ueonw5" type="hollow" style={{ width: '100%' }} withBorder>立即加入</Button>
    </Card>
  )
}
