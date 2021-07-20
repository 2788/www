/**
 * @file 页面底部内容
 * @description 包含各种链接、公安备案信息等内容
 */

import React, { PropsWithChildren } from 'react'
import Link from 'components/Link'
import { getCurrentYear } from 'utils'
import { nameMap, Product, urlMap } from 'constants/products'
import { urlForPrice } from 'utils/route'
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

function LinkGroups() {
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
        <LinkItem url={urlMap[Product.Kodo]}>{nameMap[Product.Kodo]}</LinkItem>
        <LinkItem url={urlMap[Product.Cdn]}>{nameMap[Product.Cdn]}</LinkItem>
        <LinkItem url={urlMap[Product.Pili]}>{nameMap[Product.Pili]}</LinkItem>
        <LinkItem url={`${urlMap[Product.Dora]}#functions`}>{nameMap[Product.DoraAudio]}</LinkItem>
        <LinkItem url={urlMap[Product.Censor]}>{nameMap[Product.Censor]}</LinkItem>
        <LinkItem url={urlMap[Product.Qvm]}>{nameMap[Product.Qvm]}</LinkItem>
        <LinkItem url={urlMap[Product.Express]}>{nameMap[Product.Express]}</LinkItem>
      </LinkGroup>

      <LinkGroup title="服务支持">
        <LinkItem url="https://support.qiniu.com/tickets/new">工单系统</LinkItem>
        <LinkItem url="https://developer.qiniu.com">文档中心</LinkItem>
        <LinkItem url="/user-agreement">用户协议</LinkItem>
        <LinkItem url="/sla-kodo">产品 SLA</LinkItem>
        <LinkItem url="https://status.qiniu.com">服务状态</LinkItem>
      </LinkGroup>

      <LinkGroup title="开发者">
        <LinkItem url="/activity">开发者活动</LinkItem>
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
