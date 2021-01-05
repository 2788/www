/**
 * @file 页面底部内容
 * @description 包含各种链接、公安备案信息等内容
 */

import React, { PropsWithChildren } from 'react'
import Link from 'components/Link'

import { getCurrentYear } from 'utils'
import { Product, nameMap, urlMap, categories, categoryNameMap, categoryProductsMap } from 'constants/products'
import { urlMap as solutionUrlMap, nameMap as solutionNameMap, allAvailableSolutions } from 'constants/solutions'

import Github from './images/github.svg'
import Weibo from './images/sina_weibo.svg'
import Wechat from './images/wechat.svg'
import Qrcode from './images/qrcode.png'
import imgCertCloudNative from './images/cert/cloud-native.png'
import imgCertCmmi3 from './images/cert/cmmi3.png'
import imgCertDjcp from './images/cert/djcp.png'
import imgCertIso9001 from './images/cert/iso9001.png'
import imgCertIso20000 from './images/cert/iso20000.png'
import imgCertIso27001 from './images/cert/iso27001.png'
import imgCertIso27701 from './images/cert/iso27701.png'
import imgCertKexin from './images/cert/kexin.png'

import style from './style.less'

interface ILinkItemProps {
  url: string
}

function LinkItem({ url, children }: PropsWithChildren<ILinkItemProps>) {
  return (
    <li className={style.link}>
      <Link href={url}>{children}</Link>
    </li>
  )
}

interface ILinkGroupProps {
  title: string
}

function LinkGroup({ title, children }: PropsWithChildren<ILinkGroupProps>) {
  return (
    <div className={style.linkGroup}>
      <div className={style.title}>{title}</div>
      <ul>{children}</ul>
    </div>
  )
}

function ProductItems({ products }: { products: readonly Product[] }) {
  const itemsView = products.filter(
    product => urlMap[product] != null
  ).map(product => (
    <LinkItem key={product} url={urlMap[product]!}>{nameMap[product]}</LinkItem>
  ))
  return <>{itemsView}</>
}

function LinkGroups() {
  const productLinkGroupsView = categories.map(category => (
    <LinkGroup key={category} title={categoryNameMap[category]}>
      <ProductItems products={categoryProductsMap[category]} />
    </LinkGroup>
  ))
  const solutionLinksView = allAvailableSolutions.map(solution => (
    <LinkItem key={solution} url={solutionUrlMap[solution]!}>{solutionNameMap[solution]}</LinkItem>
  ))
  return (
    <section className={style.linkGroups}>
      {productLinkGroupsView}
      <LinkGroup title="解决方案">
        {solutionLinksView}
      </LinkGroup>
      <LinkGroup title="服务与支持">
        <LinkItem url="https://developer.qiniu.com/">开发文档</LinkItem>
        <LinkItem url="https://support.qiniu.com">技术支持</LinkItem>
        <LinkItem url="https://segmentfault.com/qiniu?ref=portal.qiniu.com">问答社区</LinkItem>
        <LinkItem url="https://support.qiniu.com/tickets">工单系统</LinkItem>
        <LinkItem url="/user-agreement">用户协议</LinkItem>
        <LinkItem url="/privacy-right">隐私权政策</LinkItem>
        <LinkItem url="https://status.qiniu.com">服务状态</LinkItem>
      </LinkGroup>
      <LinkGroup title="开发者">
        <LinkItem url="https://developer.qiniu.com">开发者中心</LinkItem>
        <LinkItem url="https://blog.qiniu.com/archives/category/5">技术博客</LinkItem>
        <LinkItem url="https://www.ecug.org/">ECUG 技术大会</LinkItem>
        <LinkItem url="/events/arch">架构师实践日</LinkItem>
        <LinkItem url="/cooperations">工具插件 SDK 合作</LinkItem>
      </LinkGroup>
      <LinkGroup title="关于我们">
        <LinkItem url="/company">公司介绍</LinkItem>
        {/* <LinkItem url="/case">客户案例</LinkItem> */}
        <LinkItem url="/contact">联系我们</LinkItem>
        <LinkItem url="https://blog.qiniu.com/archives/category/1">最新动态</LinkItem>
        <LinkItem url="https://career.qiniu.com/social">加入我们</LinkItem>
        <LinkItem url="https://blog.qiniu.com/archives/category/5">技术博客</LinkItem>
      </LinkGroup>
    </section>
  )
}

function Tooltip({ children }: PropsWithChildren<{}>) {
  return (
    <div className={style.tooltip}>{children}</div>
  )
}

function Contact() {
  return (
    <section className={style.contact}>
      <div className={style.pic}>
        © {getCurrentYear()} 七牛云
      </div>
      <div className={style.contact}>
        <span className={style.title}>产品及服务咨询</span>
        <span className={style.phone}>400-808-9176</span>
        <div className={style.icon}>
          <Wechat />
          <Tooltip>
            <img className={style.qrcode} src={Qrcode} />
          </Tooltip>
        </div>
        <a className={style.icon} href="https://github.com/qiniu" target="_blank" rel="noopener">
          <Github />
        </a>
        <a className={style.icon} href="http://weibo.com/qiniutek" target="_blank" rel="noopener">
          <Weibo />
        </a>
      </div>
    </section>
  )
}

function Icp() {
  return (
    <section className={style.icp}>
      <div className={style.info}>
        <a href="https://www.12377.cn/" target="_blank" rel="noopener"><i className={style.report} />违法和不良信息举报中心 &gt;&gt;</a> <br />
        24 小时违法和不良信息举报热线：021-20703838，举报邮箱：jubao@qiniu.com <br />
        沪公网安备31011502000961号 <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noreferrer noopener">沪ICP备11037377号-5</a>
      </div>
      <div className={style.certIconsWrapper}>
        <a target="_blank" rel="noopener" href="http://www.djbh.net/webdev/web/HomeWebAction.do?p=init"><img className={style.certIcon} src={imgCertDjcp} /></a>
        <a target="_blank" rel="noopener" href="https://www.cncf.io/"><img className={style.certIcon} src={imgCertCloudNative} /></a>
        <img className={style.certIcon} src={imgCertIso20000} />
        <img className={style.certIcon} src={imgCertIso9001} />
        <img className={style.certIcon} src={imgCertIso27001} />
        <img className={style.certIcon} src={imgCertIso27701} />
        <img className={style.certIcon} src={imgCertCmmi3} />
        <a target="_blank" rel="noopener" href="https://www.kexinyun.org.cn/"><img className={style.certIcon} src={imgCertKexin} /></a>
      </div>
    </section>
  )
}

export default function FooterForPc() {
  return (
    <footer className={style.footer}>
      <div className={style.content}>
        <LinkGroups />
        <Contact />
        <Icp />
      </div>
    </footer>
  )
}
