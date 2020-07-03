/**
 * @file 公司介绍 公司荣誉
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren } from 'react'
import Section from 'components/Product/Section'
import styles from './style.less'

export type ItemProps = PropsWithChildren<{
  issuer: string
}>

function Item({ children, issuer }: ItemProps) {
  return (
    <li className={styles.item}>
      <p className={styles.content}>「 {children} 」</p>
      <p className={styles.issuer}>{issuer}</p>
    </li>
  )
}

export default function Honor() {
  return (
    <Section title="公司荣誉" name="honor" withTailPadding>
      <ul className={styles.list}>
        <Item issuer="36 Kr">2020 荣获云服务最佳解决方案</Item>
        <Item issuer="中国科学院《互联网周刊》">2019 云计算领域最具领导力企业</Item>
        <Item issuer="投资界">2019 中国科创企业百强</Item>
        <Item issuer="中国企业家">2019 中国科创企业百强</Item>
        <Item issuer="胡润研究院">2019 一季度胡润中国潜力独角兽</Item>
        <Item issuer="2019 混合云世界论坛组委会">2019 最佳混合云存储解决方案奖</Item>
        <Item issuer="中国科学院《互联网周刊》">2018 年度智能视频云领导力品牌</Item>
        <Item issuer="赛迪研究院">2018 中国云计算领军企业</Item>
        <Item issuer="36 Kr">2018 新经济之王 - 企业服务之王</Item>
        <Item issuer="中国信息通信研究院">2017 - 2018 年度可信云技术创新奖 - 存储类</Item>
        <Item issuer="财经网">2017 年度最具创新力企业</Item>
        <Item issuer="中国企业家">2017 年度最具成长性新兴企业</Item>
      </ul>
    </Section>
  )
}
