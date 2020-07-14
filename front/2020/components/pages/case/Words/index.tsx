/**
 * @file “客户评价”模块
 */

/* eslint-disable max-len */

import React, { PropsWithChildren } from 'react'
import { Row, Card as RawCard } from 'components/UI/Card'
import Swiper from 'components/UI/Swiper'
import { useMobile } from 'hooks/ua'
import logoCamera360 from './images/camera360.png'
import logoZhongxing from './images/中兴.png'
import logoHujiang from './images/沪江.png'
import logoYingshi from './images/海康威视萤石.png'
import logoMeituxiuxiu from './images/美图秀秀.png'
import logoLianmeng from './images/脸萌.png'
import avatarTianbo from './images/田波.png'
import avatarXuhua from './images/徐华.png'
import avatarRuanyongli from './images/阮永丽.png'
import avatarLiuhongwei from './images/刘宏伟.png'
import avatarLixingbo from './images/李兴波.png'
import avatarLinjinlie from './images/林金烈.png'
import style from './style.less'

const lixingbo = {
  name: '李兴波',
  avatar: avatarLixingbo,
  title: '海康威视萤石云平台技术总监'
}

const tianbo = {
  name: '田波',
  avatar: avatarTianbo,
  title: '中兴家庭网络运营总监'
}

const liuhongwei = {
  name: '刘宏伟',
  avatar: avatarLiuhongwei,
  title: 'Camera360 副总裁'
}

const xuhua = {
  name: '徐华',
  avatar: avatarXuhua,
  title: '沪江网副总裁'
}

const ruanyongli = {
  name: '阮永丽',
  avatar: avatarRuanyongli,
  title: '美图秀秀 CTO'
}

const linjinlie = {
  name: '林金烈',
  avatar: avatarLinjinlie,
  title: '后台技术负责人'
}

const cardHaikangweishi = (
  <Card name="海康威视萤石" logo={logoYingshi} teller={lixingbo}>
    在和七牛合作的这几年中，深刻的感受到七牛的的确确是一家做“云服务”的公司。作为技术产品服务供应商，在技术和服务品质上有一贯的追求是七牛的核心竞争力，同时在七牛的各个方面都体现着另一种竞争力——对服务的理解。这就是除技术和产品等硬性表现外，赢得合作伙伴信任更为重要的基础。
  </Card>
)

const cardZhongxing = (
  <Card name="中兴通讯" logo={logoZhongxing} teller={tianbo}>
    中兴智能家居产品依托七牛云服务，向用户提供音视频云存储、检索、分享等衍生增值服务，七牛的专业团队为海量数据的安全性及稳定性提供了有力保障。
  </Card>
)

const cardCamera360 = (
  <Card name="Camera360" logo={logoCamera360} teller={liuhongwei}>
    七牛在图像存储方面做了很多贴心服务，不仅解决了大规模存储问题，也解决了移动互联网对照片浏览和计算的特殊需求。合作过程中，我们也从七牛研发团队里吸取到了前沿的研发流程。
  </Card>
)

const cardHujiang = (
  <Card name="沪江网" logo={logoHujiang} teller={xuhua}>
    七牛为沪江提供了稳定高可用的云端文件大规模存储服务，很好地帮助企业降低了运营成本，提高了响应速度。我们相信，伴随着互联网教育的快速发展，沪江和七牛会有更多深入的合作，让我们能更专注于在线教育用户的核心需求。
  </Card>
)

const cardMeituxiuxiu = (
  <Card name="美图秀秀" logo={logoMeituxiuxiu} teller={ruanyongli}>
    美图有幸见证七牛这一路策马扬鞭的茁壮成长，其可靠云服务亦令美图的发展如虎添翼。回顾走过的历程，七牛攀登的路途上，每个足印都记录着技术的飞跃，每个里程碑都带给我们新的体验。
  </Card>
)

const cardLianmeng = (
  <Card name="脸萌" logo={logoLianmeng} teller={linjinlie}>
    和七牛合作多年，深刻感受到七牛在竞争激烈的云服务市场，是有用心做适合自身定位的差异化竞争力的：除了产品品质过硬，标准化，易用性高之外，七牛的售前售后团队也是在一个较高的标准树立了行业标杆。产品的稳定性，扩展性很高，让合作伙伴可以放心托付。
  </Card>
)

export default function Words() {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <div className={style.wrapper}>
        <Swiper withArrow withPagination>
          <Row>{cardHaikangweishi}</Row>
          <Row>{cardZhongxing}</Row>
          <Row>{cardLianmeng}</Row>
          <Row>{cardCamera360}</Row>
          <Row>{cardHujiang}</Row>
          <Row>{cardMeituxiuxiu}</Row>
        </Swiper>
      </div>
    )
  }

  return (
    <div className={style.wrapper}>
      <Swiper withArrow withPagination>
        <Row>
          {cardHaikangweishi}
          {cardZhongxing}
          {cardLianmeng}
        </Row>
        <Row>
          {cardCamera360}
          {cardHujiang}
          {cardMeituxiuxiu}
        </Row>
      </Swiper>
    </div>
  )
}

type TellerInfo = {
  name: string
  avatar: string
  title: string
}

type CardProps = PropsWithChildren<{
  name: string
  logo: string
  teller: TellerInfo
}>

function Card({ logo, name, children, teller }: CardProps) {
  return (
    <RawCard className={style.card}>
      <img src={logo} alt={name} className={style.logo} />
      <div className={style.content}>
        <h5 className={style.name}>{name}</h5>
        <p className={style.word}>{children}</p>
        <Teller {...teller} />
      </div>
    </RawCard>
  )
}

function Teller({ name, avatar, title }: TellerInfo) {
  return (
    <div className={style.teller}>
      <img src={avatar} alt={name} className={style.avatar} />
      <h5 className={style.name}>{name}</h5>
      <p className={style.title}>{title}</p>
    </div>
  )
}
