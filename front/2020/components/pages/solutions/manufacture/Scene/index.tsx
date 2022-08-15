import React from 'react'
import Section, { SectionArrowLink } from 'components/Product/Section'
import { Card, Row, Img, Content, Title, Desc } from 'components/UI/Card'

import scene1 from './images/scene1.jpg'
import scene2 from './images/scene2.jpg'
import scene3 from './images/scene3.jpg'
import scene4 from './images/scene4.jpg'
import scene5 from './images/scene5.jpg'
import scene6 from './images/scene6.jpg'

interface Props {
  onConsult: () => void
}

export default function TypicalScene({ onConsult }: Props) {
  return (
    <Section title="典型应用场景" name="scene">
      <Row>
        <Card>
          <Img src={scene1} />
          <Content>
            <Title>生产监控诊断</Title>
            <Desc>一站式收集、分析各维度机器数据，获得复杂数据的简单视图，实时监控工厂整体生产健康度，诊断生产质量。</Desc>
          </Content>
        </Card>
        <Card>
          <Img src={scene2} />
          <Content>
            <Title>生产效能提升</Title>
            <Desc>实施层面与客户系统深度结合，充分挖掘不同工艺阶段的多种参数对产量与质量的影响，提升产量、减少损耗。</Desc>
          </Content>
        </Card>
        <Card>
          <Img src={scene3} />
          <Content>
            <Title>故障根因分析</Title>
            <Desc>通过数据钻取和关联，全链路追踪，从数据中挖掘分析出系统故障失败的根因，给专业人员提供客观决策依据。</Desc>
          </Content>
        </Card>
      </Row>
      <Row>
        <Card>
          <Img src={scene4} />
          <Content>
            <Title>安全信息管理</Title>
            <Desc>聚合海量不同来源的数据并整合分析，实现数据的多层级管理，满足合规要求，洞察安全风险，防范于未然。</Desc>
          </Content>
        </Card>
        <Card>
          <Img src={scene5} />
          <Content>
            <Title>设备预测性维护</Title>
            <Desc>基于设备历史运转数据和实时状态，通过强大的计算分析能力结合专业模型，预测风险，维护优化，降本增效。</Desc>
          </Content>
        </Card>
        <Card>
          <Img src={scene6} />
          <Content>
            <Title>快速恢复响应</Title>
            <Desc>实时诊断警报和异常，知识库沉淀排障处理经验，标准化、自动化响应，系统恢复时间从小时级提升至分钟级。</Desc>
          </Content>
        </Card>
      </Row>
      <SectionArrowLink onClick={onConsult}>立即咨询</SectionArrowLink>
    </Section>
  )
}
