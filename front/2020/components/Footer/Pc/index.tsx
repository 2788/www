/**
 * @file 页面底部内容
 * @description 包含各种链接、公安备案信息等内容
 */

import React, { PropsWithChildren } from 'react'
import Link from 'components/Link'
import { getCurrentYear } from 'utils'
import { nameMap, Product, urlMap } from 'constants/products'
import { Activity, nameMap as activityNameMap, urlMap as activityUrlMap } from 'constants/activity'
import { urlForPrice } from 'utils/route'
import QiniuLogo from './images/qiniu_logo.svg'
import Github from './images/github.svg'
import Weibo from './images/sina_weibo.svg'
import Wechat from './images/wechat.svg'
import Qrcode from './images/qrcode.png'
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

function LinkGroups() {
  const productItems = [
    Product.Kodo, Product.Cdn, Product.Pili, Product.DoraAudio, Product.Censor, Product.Qvm, Product.Express
  ] as const
  const productItemsView = productItems.map(product => (
    <LinkItem key={product} url={urlMap[product]}>
      {/** pandora 因文字较多所以特殊处理一下
       * todo：以后考虑改为多出显示省略号？ */}
      {product === Product.Express ? 'Pandora' : nameMap[product]}
    </LinkItem>
  ))

  return (
    <section className={style.linkGroups}>
      <LinkGroup title="快速入口">
        <LinkItem url="https://portal.qiniu.com/financial/overview">充值开票</LinkItem>
        <LinkItem url="https://portal.qiniu.com/user/profile">账号管理</LinkItem>
        <LinkItem url="https://portal.qiniu.com/home">控制台</LinkItem>
        <LinkItem url="https://qmall.qiniu.com">资源包购买</LinkItem>
        <LinkItem url={urlForPrice(Product.Kodo)}>产品报价</LinkItem>
      </LinkGroup>

      <LinkGroup title="热门产品">
        {productItemsView}
      </LinkGroup>

      <LinkGroup title="服务支持">
        <LinkItem url="https://support.qiniu.com/tickets/new">工单系统</LinkItem>
        <LinkItem url="https://developer.qiniu.com">文档中心</LinkItem>
        <LinkItem url="/user-agreement">用户协议</LinkItem>
        <LinkItem url="/sla-kodo">产品 SLA</LinkItem>
        <LinkItem url="https://status.qiniu.com">服务状态</LinkItem>
        <LinkItem url="https://developer.qiniu.com/sdk#official-tool">开发者工具</LinkItem>
      </LinkGroup>

      <LinkGroup title="合作伙伴">
        <LinkItem url={`${urlMap[Product.OpenAPI]}/partner`}>{nameMap[Product.OpenAPI]}</LinkItem>
        <LinkItem url="/cps">CPS 返现</LinkItem>
        <LinkItem url="/partner">代理合作伙伴</LinkItem>
        <LinkItem url="/cooperations">工具插件 SDK 合作</LinkItem>

      </LinkGroup>

      <LinkGroup title="关于我们">
        <LinkItem url="/company">公司介绍</LinkItem>
        <LinkItem url="https://jobs.qiniu.com">社会招聘</LinkItem>
        <LinkItem url="https://campus.qiniu.com">校园招聘</LinkItem>
        <LinkItem url="/contact">联系我们</LinkItem>
        <LinkItem url="https://blog.qiniu.com/archives/category/1">最新动态</LinkItem>
        <LinkItem url={activityUrlMap[Activity.Main]}>{activityNameMap[Activity.Main]}</LinkItem>
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
      <Link href="/"><QiniuLogo /></Link>
      <p className={style.copyright}>Copyright © {getCurrentYear()} Qiniu Cloud.</p>
      <p className={style.phone}>产品及服务咨询：400-808-9176</p>
      <div className={style.contact}>
        <a className={style.icon} href="http://weibo.com/qiniutek" target="_blank" rel="noopener">
          <Weibo />
        </a>
        <a className={style.icon} href="https://github.com/qiniu" target="_blank" rel="noopener">
          <Github />
        </a>
        <div className={style.icon}>
          <Wechat />
          <Tooltip>
            <img className={style.qrcode} src={Qrcode} />
          </Tooltip>
        </div>
      </div>
    </section>
  )
}

function Icp() {
  return (
    <section className={style.icp}>
      <p>
        <a href="https://www.12377.cn/" target="_blank" rel="noopener">
          <i className={style.report} />
          违法和不良信息举报中心 &gt;&gt;
        </a>
      </p>
      <p>
        24 小时违法和不良信息举报热线：021-20703838，举报邮箱：jubao@qiniu.com
        <br />
        沪公网安备31011502000961号&nbsp;
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noreferrer noopener">沪ICP备11037377号-5</a>
      </p>
    </section>
  )
}

export default function FooterForPc() {
  return (
    <footer className={style.footer}>
      <div className={style.content}>
        <div className={style.row}>
          <Contact />
          <LinkGroups />
        </div>
        <div className={style.row}>
          <Icp />
        </div>
      </div>
    </footer>
  )
}
