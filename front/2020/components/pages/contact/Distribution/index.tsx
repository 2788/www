import React from 'react'
import Section from 'components/Product/Section'
import { Row, LayoutCard, Img, Desc, Title } from 'components/UI/Card'

import shanghai from './images/shanghai.png'
import beijing from './images/beijing.png'
import chengdu from './images/chengdu.png'
import guangzhou from './images/guangzhou.png'
import hangzhou from './images/hangzhou.png'
import nanjing from './images/nanjing.png'
import shenzhen from './images/shenzhen.png'
import xiamen from './images/xiamen.png'

import style from './index.less'

export default function Distribution() {
  return (
    <Section name="distri" title="公司分布">
      <Row>
        <LayoutCard>
          <Img className={style.image} src={shanghai} />
          <Title className={style.title}>上海总部</Title>
          <Desc className={style.desc}>上海市浦东新区博霞路66号上海浦东软件园Q座</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={beijing} />
          <Title className={style.title}>北京分部</Title>
          <Desc className={style.desc}>北京市朝阳区太阳宫中路12号冠城大厦1503室</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={hangzhou} />
          <Title className={style.title}>杭州分部</Title>
          <Desc className={style.desc}>浙江省杭州市下城区上塘路15号武林时代商务中心21楼04-06室</Desc>
        </LayoutCard>
      </Row>
      <Row>
        <LayoutCard>
          <Img className={style.image} src={shenzhen} />
          <Title className={style.title}>深圳分部</Title>
          <Desc className={style.desc}>广州省深圳市南山区科发路19号华润置地D座1306室</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={guangzhou} />
          <Title className={style.title}>广州分部</Title>
          <Desc className={style.desc}>广东省广州市天河区珠江新城高德置地大厦A座1706B室</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={chengdu} />
          <Title className={style.title}>成都分部</Title>
          <Desc className={style.desc}>四川省成都市高新区天府大道666号希顿国际C座2504室</Desc>
        </LayoutCard>
      </Row>
      <Row>
        <LayoutCard className={style.card}>
          <Img className={style.image} src={nanjing} />
          <Title className={style.title}>南京分部</Title>
          <Desc className={style.desc}>江苏省南京市雨花区软件大道106号极客站2栋1东侧</Desc>
        </LayoutCard>
        <LayoutCard className={style.card}>
          <Img className={style.image} src={xiamen} />
          <Title className={style.title}>厦门分部</Title>
          <Desc className={style.desc}>福建省厦门市思明区软件园二期望海路12号楼3单元211室</Desc>
        </LayoutCard>
      </Row>
    </Section>
  )
}
