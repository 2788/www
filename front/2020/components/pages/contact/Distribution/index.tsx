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

import style from './index.less'

export default function Distribution() {
  return (
    <Section name="distri" title="公司分布" withTailPadding>
      <Row>
        <LayoutCard>
          <Img className={style.image} src={shanghai} />
          <Title className={style.title}>上海总部</Title>
          <Desc className={style.desc}>上海市浦东新区博霞路 66 号上海浦东软件园 Q 座</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={beijing} />
          <Title className={style.title}>北京分部</Title>
          <Desc className={style.desc}>北京市朝阳区新源南路 3 号平安国际金融中心 A 座 10-05 单元</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={hangzhou} />
          <Title className={style.title}>杭州分部</Title>
          <Desc className={style.desc}>浙江省杭州市拱墅区上塘路 15 号武林时代商务中心 17 楼</Desc>
        </LayoutCard>
      </Row>
      <Row>
        <LayoutCard>
          <Img className={style.image} src={shenzhen} />
          <Title className={style.title}>深圳分部</Title>
          <Desc className={style.desc}>广东省深圳市南山区粤海街道高新区社区科技南十二路 28 号康佳研发大厦十八层</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={guangzhou} />
          <Title className={style.title}>广州分部</Title>
          <Desc className={style.desc}>广东省广州市天河区黄埔大道中 662 号金融城绿地中心 704 单元</Desc>
        </LayoutCard>
        <LayoutCard>
          <Img className={style.image} src={chengdu} />
          <Title className={style.title}>成都分部</Title>
          <Desc className={style.desc}>四川省成都市高新区希顿国际 C 座 2504 室</Desc>
        </LayoutCard>
      </Row>
      <Row>
        <LayoutCard>
          <Img className={style.image} src={nanjing} />
          <Title className={style.title}>南京分部</Title>
          <Desc className={style.desc}>江苏省南京市雨花区软件大道 106 号极客站</Desc>
        </LayoutCard>
        <LayoutCard />
        <LayoutCard />
      </Row>
    </Section>
  )
}
