import React, { ReactNode } from 'react'
import Section from 'components/Product/Section'
import { Card, Row } from 'components/UI/Card'
import { useMobile } from 'hooks/ua'

import case1 from './images/case1.jpg'
import Case1svg from './images/case1.svg'
import case2 from './images/case2.jpg'
import case3 from './images/case3.jpg'

import style from './index.less'

export default function Case() {
  return (
    <Section title="典型客户案例" name="case">
      <Row><MyCard imgUrl={case1} title="晶盛机电" text="七牛云与晶盛机电依托彼此在行业领域的先进技术和深厚沉淀，将大数据技术与半导体、光伏领域紧密结合，直面单晶硅生产企业最棘手的问题，充分挖掘出设备各个硬件子系统的健康程度，以及各工艺阶段的多种参数对最终产量与质量的影响，实现监测生产设备的健康状况、提升单晶硅产量、减少生产中的各项工艺损耗。" extra={<Case1svg />} /></Row>
      <Row><MyCard imgUrl={case2} title="VIVO" text="七牛云机器数据分析平台 Pandora 可实时、高效的收集、分析各维度机器数据，创建复杂数据的简单视图，帮助客户工程师远程监控整体生产健康度，诊断生产质量，并通过数据钻取和关联，对产线次品率、测试项测试结果成功率等指标进行根因分析，为提高良品率提供数据支持，通过独有的知识库积累排障处理手段，实现标准化、自动化响应流程，将系统恢复时间从小时级提速至分钟级，最大限度减少意外停机时间及运维成本。" /></Row>
      <Row><MyCard imgUrl={case3} title="上海电气" text="七牛云机器数据分析平台 Pandora 为客户构建了多源异构的态势感知平台，实现客户现场数百种设备机器数据的标准化，结合关联分析引擎、流量分析引擎和异常检测引擎，对边界层风险进行监控，集中展示 IPS/WAF设备的安全风险，统计分析攻击源，并对流量使用、资产使用、用户异常行为、邮件安全、应用监控等典型场景进行分析，完成了被动防御到主动防御的战略升级，实现风险可知、事件可控、态势可见、效率提升。" /></Row>
    </Section>
  )
}

type Props = {
  imgUrl: string
  title: string
  text: string
  extra?: ReactNode
}

function MyCard({ imgUrl, title, text, extra }: Props) {
  const isMobile = useMobile()
  return (
    <Card className={style.cardWrapper}>
      <div className={style.card}>
        <img className={style.img} src={imgUrl} />
        <div className={style.content}>
          <div className={style.title}>{title}</div>
          <div className={style.text}>{text}</div>
        </div>
      </div>
      {!isMobile && extra && <div className={style.extra}>{extra}</div>}
    </Card>
  )
}
