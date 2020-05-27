/**
 * @file 友链内容
 */

import React, { PropsWithChildren, ReactNode } from 'react'

import Link from 'components/Link'
import Layout from 'components/Layout'
import Banner, { Title, Desc } from 'components/Banner'
import FriendLinkSection, { IFriendLinkSectionProps } from 'components/pages/friendlink/FriendLinkSection'

import style from './style.less'

import PartnerImg3wcoffice from './_images/partner-img-3wcoffice.png'
import PartnerImgAijiami from './_images/partner-img-aijiami.png'
import PartnerImgApicloud from './_images/partner-img-apicloud.png'
import PartnerImgDnspod from './_images/partner-img-dnspod.png'
import PartnerImgDuobeifen from './_images/partner-img-duobeifen.png'
import PartnerImgGetui from './_images/partner-img-getui.png'
import PartnerImgAimei from './_images/partner-img-aimei.png'
import PartnerImgJiasuhui from './_images/partner-img-jiasuhui.png'
import PartnerImgLeancloud from './_images/partner-img-leancloud.png'
import PartnerImgSegmentfault from './_images/partner-img-segmentfault.png'
import PartnerImgTeambition from './_images/partner-img-teambition.png'
import PartnerImgShisuyun from './_images/partner-img-shisuyun.png'
import PartnerImgGizwits from './_images/partner-img-gizwits.png'
import PartnerImgXunfei from './_images/partner-img-xunfei.png'
import PartnerImgYoumi from './_images/partner-img-youmi.png'
import PartnerImgYunzhixun from './_images/partner-img-yunzhixun.png'
import PartnerImgJuzi from './_images/partner-img-juzi.png'
import PartnerImgMingdao from './_images/partner-img-mingdao.png'
import PartnerImgJisiwei from './_images/partner-img-jisiwei.png'
import PartnerImgTestin from './_images/partner-img-testin.png'
import PartnerImgJinshuju from './_images/partner-img-jinshuju.png'
import PartnerImg51idc from './_images/partner-img-51idc.png'
import PartnerImgDevstore from './_images/partner-img-devstore.png'
import PartnerImgCoding from './_images/partner-img-coding.png'
import PartnerImgYunpian from './_images/partner-img-yunpian.png'
import PartnerImgRongyun from './_images/partner-img-rongyun.png'
import PartnerImgChaojibiaoge from './_images/partner-img-chaojibiaoge.png'
import PartnerImgXiangxiangpai from './_images/partner-img-xiangxiangpai.png'
import PartnerImgW3cschool from './_images/partner-img-w3cschool.png'

import BannerIcon from './_images/banner.file.svg'

interface IPartnerItemProps {
  pic: ReactNode
  alt: string
}

function PartnerItem({ pic, alt }: PropsWithChildren<IPartnerItemProps>) {
  return (
    <li className={style.itemContainer}>
      <div className={style.item}>
        {
          typeof pic === 'string'
            ? <img className={style.pic} src={pic} alt={alt} />
            : pic
        }
      </div>
    </li>
  )
}

function PartnerGroup({
  children,
  ...FriendLinkSectionProps
}: PropsWithChildren<IFriendLinkSectionProps>) {
  return (
    <div className={style.grey}>
      <FriendLinkSection {...FriendLinkSectionProps}>
        <ul className={style.partnerGroup}>
          {children}
        </ul>
      </FriendLinkSection>
    </div>
  )
}

interface IFriendLinkItemProps {
  url: string
}

function FirendLinkItem({ url, children }: PropsWithChildren<IFriendLinkItemProps>) {
  return (
    <li className={style.link}>
      <Link href={url}>{children}</Link>
    </li>
  )
}

function FriendLinkGroup({
  children,
  ...FriendLinkSectionProps
}: PropsWithChildren<IFriendLinkSectionProps>) {
  return (
    <FriendLinkSection {...FriendLinkSectionProps}>
      <ul className={style.friendLinkGroup}>
        {children}
      </ul>
    </FriendLinkSection>
  )
}

function PageContent() {
  return (
    <>
      <Banner background={BannerIcon}>
        <Title>平等互利 共创双赢</Title>
        <Desc>欢迎与七牛云交换友情链接，交换条件：PR &gt;= 5<br />联系邮箱：marketing@qiniu.com</Desc>
      </Banner>
      <PartnerGroup title="合作伙伴">
        <PartnerItem pic={PartnerImg3wcoffice} alt="3W Coffice" />
        <PartnerItem pic={PartnerImgAijiami} alt="爱加密" />
        <PartnerItem pic={PartnerImgApicloud} alt="APICloud" />
        <PartnerItem pic={PartnerImgDnspod} alt="DNSPOD" />
        <PartnerItem pic={PartnerImgDuobeifen} alt="多备份" />
        <PartnerItem pic={PartnerImgGetui} alt="个推" />
        <PartnerItem pic={PartnerImgAimei} alt="艾媒北极星" />
        <PartnerItem pic={PartnerImgJiasuhui} alt="加速会" />
        <PartnerItem pic={PartnerImgLeancloud} alt="LeanCloud" />
        <PartnerItem pic={PartnerImgSegmentfault} alt="segmentfault" />
        <PartnerItem pic={PartnerImgTeambition} alt="teambition" />
        <PartnerItem pic={PartnerImgShisuyun} alt="时速云" />
        <PartnerItem pic={PartnerImgGizwits} alt="机智云" />
        <PartnerItem pic={PartnerImgXunfei} alt="讯飞开放平台" />
        <PartnerItem pic={PartnerImgYoumi} alt="有米" />
        <PartnerItem pic={PartnerImgYunzhixun} alt="云之讯·开放平台" />
        <PartnerItem pic={PartnerImgJuzi} alt="桔子空间" />
        <PartnerItem pic={PartnerImgMingdao} alt="明道" />
        <PartnerItem pic={PartnerImgJisiwei} alt="极思维" />
        <PartnerItem pic={PartnerImgTestin} alt="Testin" />
        <PartnerItem pic={PartnerImgJinshuju} alt="金数据" />
        <PartnerItem pic={PartnerImg51idc} alt="51IDC" />
        <PartnerItem pic={PartnerImgDevstore} alt="Dev Store" />
        <PartnerItem pic={PartnerImgCoding} alt="Coding" />
        <PartnerItem pic={PartnerImgYunpian} alt="云片" />
        <PartnerItem pic={PartnerImgRongyun} alt="融云" />
        <PartnerItem pic={PartnerImgChaojibiaoge} alt="超级表格" />
        <PartnerItem pic={PartnerImgXiangxiangpai} alt="享象派" />
        <PartnerItem pic={PartnerImgW3cschool} alt="W3Cschool" />
      </PartnerGroup>

      <FriendLinkGroup title="友情链接">
        <FirendLinkItem url="http://36kr.com/">36 Kr</FirendLinkItem>
        <FirendLinkItem url="http://amh.sh/">AMH</FirendLinkItem>
        <FirendLinkItem url="http://www.hostucan.cn/cloud-storage">IDC 点评</FirendLinkItem>
        <FirendLinkItem url="https://www.jpush.cn/">极光推送</FirendLinkItem>
        <FirendLinkItem url="http://www.sdk.cn/">SDK.CN</FirendLinkItem>
        <FirendLinkItem url="http://www.uisdc.com/">优设</FirendLinkItem>
        <FirendLinkItem url="http://www.tingyun.com/">听云</FirendLinkItem>
        <FirendLinkItem url="http://www.oschina.net/">开源中国</FirendLinkItem>
        <FirendLinkItem url="http://www.tuicool.com/">推酷</FirendLinkItem>
        <FirendLinkItem url="http://www.easemob.com/hx/index.html">环信</FirendLinkItem>
        <FirendLinkItem url="http://www.zentao.net/">禅道</FirendLinkItem>
        <FirendLinkItem url="http://www.proginn.com/">程序员客栈</FirendLinkItem>
        <FirendLinkItem url="http://www.managershare.com/">经理人分享</FirendLinkItem>
        <FirendLinkItem url="http://www.pgyer.com/">蒲公英</FirendLinkItem>
        <FirendLinkItem url="http://www.datagrand.com/">达观数据</FirendLinkItem>
        <FirendLinkItem url="https://www.cnblogs.com/">博客园</FirendLinkItem>
        <FirendLinkItem url="http://www.jikexueyuan.com/">极客学院</FirendLinkItem>
        <FirendLinkItem url="http://www.mikecrm.com/">麦客 CRM</FirendLinkItem>
        <FirendLinkItem url="http://www.rongcloud.cn/">融云</FirendLinkItem>
        <FirendLinkItem url="http://www.cocoachina.com/">CocoaChina</FirendLinkItem>
        <FirendLinkItem url="http://www.iheima.com/">创业黑马学院</FirendLinkItem>
        <FirendLinkItem url="https://www.etuan.com/">一团网</FirendLinkItem>
        <FirendLinkItem url="https://www.idcps.com/">IDC 评述网</FirendLinkItem>
        <FirendLinkItem url="http://www.huodongxing.com/">活动行</FirendLinkItem>
        <FirendLinkItem url="https://maka.im/">MAKA 在线设计</FirendLinkItem>
        <FirendLinkItem url="https://www.supremind.com/">闪马智能</FirendLinkItem>
        <FirendLinkItem url="https://worktile.com/">Worktile</FirendLinkItem>
        <FirendLinkItem url="https://www.w3cschool.cn/">W3Cschool</FirendLinkItem>
        <FirendLinkItem url="https://www.sojson.com/">SOJSON 在线工具</FirendLinkItem>
        <FirendLinkItem url="https://www.xinrenxinshi.com/">薪人薪事</FirendLinkItem>
        <FirendLinkItem url="https://www.5kcrm.com/">悟空 CRM</FirendLinkItem>
      </FriendLinkGroup>
    </>
  )
}

export default function FriendLinkPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
