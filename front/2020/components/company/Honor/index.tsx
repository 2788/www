/**
 * @file 公司介绍 公司荣誉
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren } from 'react'

import { Row, LayoutCard, Content, Title, Desc } from 'components/UI/Card'
import Section from 'components/Product/Section'

import styles from './style.less'

export interface CardProps {
  title: string
  issuer: string
  time: string
}

function Card({ title, issuer, time }: CardProps) {
  return (
    <div className={styles.card}>
      <Content>
        <Title className={styles.title}>{title}</Title>
        <Desc className={styles.issuer}>{issuer}</Desc>
        <p className={styles.time}>{time}</p>
      </Content>
    </div>
  )
}

export interface YearlyProps {
  year: string
}

function YearlyHonor({ year, children }: PropsWithChildren<YearlyProps>) {
  return (
    <LayoutCard>
      <h3 className={styles.year}>{year}</h3>
      {children}
    </LayoutCard>
  )
}

export default function Honor() {
  return (
    <Section title="公司荣誉" name="honor">
      <Row>
        <YearlyHonor year="2020">
          <Card
            title="荣获 “2019 云计算领域最具领导力企业”"
            issuer="中国科学院《互联网周刊》"
            time="2020 年 03 月"
          />
        </YearlyHonor>
        <YearlyHonor year="2019">
          <Card
            title="荣获 “2019 中国最具投资价值企业 50 强—风云榜”"
            issuer="中国科学院《互联网周刊》"
            time="2019 年 10 月"
          />
          <Card
            title="荣获 “2019 中国科创企业百强”"
            issuer="中国企业家"
            time="2019 年 07 月"
          />
          <Card
            title="荣获 “2019 一季度胡润中国潜力独角兽”"
            issuer="胡润研究院"
            time="2019 年 05 月"
          />
          <Card
            title="荣获 “2019 最佳混合云存储解决方案奖”"
            issuer="2019 混合云世界论坛组委会"
            time="2019 年 03 月"
          />
        </YearlyHonor>
        <YearlyHonor year="2018">
          <Card
            title="荣获 “2018 年度智能视频云领导力品牌”"
            issuer="中国科学院《互联网周刊》"
            time="2018 年 12 月"
          />
          <Card
            title="荣获 “2018 中国云计算领军企业”"
            issuer="赛迪研究院"
            time="2018 年 12 月"
          />
          <Card
            title="荣获 “2018 新经济之王—企业服务之王”"
            issuer="36 Kr"
            time="2018 年 11 月"
          />
          <Card
            title="荣获 “2017 - 2018 年度可信云技术创新奖—存储类”"
            issuer="中国信息通信研究院"
            time="2018 年 08 月"
          />
          <Card
            title="荣获 “2017 年度最具创新力企业”"
            issuer="财经网"
            time="2018 年 02 月"
          />
        </YearlyHonor>
        <YearlyHonor year="2017">
          <Card
            title="荣获 “2017 年度最具成长性新兴企业”"
            issuer="中国企业家"
            time="2017 年 06 月"
          />
        </YearlyHonor>
      </Row>
    </Section>
  )
}
