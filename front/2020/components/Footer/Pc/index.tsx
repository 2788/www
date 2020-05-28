/**
 * @file 页面底部内容
 * @description 包含各种链接、公安备案信息等内容
 */

import React, { PropsWithChildren } from 'react'
import Link from 'components/Link'

import { getCurrentYear } from 'utils'

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
  return (
    <section className={style.linkGroups}>
      <LinkGroup title="存储与数据湖">
        <LinkItem url="/products/kodo">对象存储</LinkItem>
        <LinkItem url="/products/kodo">归档存储</LinkItem>
      </LinkGroup>
      <LinkGroup title="基础服务">
        <LinkItem url="/products/qcdn">CDN</LinkItem>
        <LinkItem url="/products/pili">直播</LinkItem>
        <LinkItem url="/ssl">证书</LinkItem>
        <LinkItem url="/products/qvm">云主机</LinkItem>
        <LinkItem url="/products/sms">云短信</LinkItem>
      </LinkGroup>
      <LinkGroup title="智能视频">
        <LinkItem url="/products/dora">智能多媒体服务</LinkItem>
        <LinkItem url="/products/censor">内容安全</LinkItem>
        <LinkItem url="/products/rtn">实时音视频</LinkItem>
        <LinkItem url="/products/svesdk">短视频</LinkItem>
        <LinkItem url="/products/plesdk">推流</LinkItem>
        <LinkItem url="TODO">播放器</LinkItem>
      </LinkGroup>
      <LinkGroup title="机器数据智能">
        <LinkItem url="/products/insight">智能日志管理平台</LinkItem>
        <LinkItem url="/products/pandora">机器数据分析平台</LinkItem>
      </LinkGroup>
      <LinkGroup title="解决方案">
        <LinkItem url="/products/ess">监控视频边缘存储解决方案</LinkItem>
        <LinkItem url="/products/vcs">视频冷存储解决方案</LinkItem>
        <LinkItem url="TODO">私有云行业解决方案</LinkItem>
        <LinkItem url="/products/plsv">短视频解决方案</LinkItem>
        <LinkItem url="/products/qavs">智能视频云解决方案</LinkItem>
      </LinkGroup>
      <LinkGroup title="服务与支持">
        <LinkItem url="https://developer.qiniu.com/">开发文档</LinkItem>
        <LinkItem url="https://support.qiniu.com">技术支持</LinkItem>
        <LinkItem url="https://segmentfault.com/qiniu?ref=portal.qiniu.com">问答社区</LinkItem>
        <LinkItem url="https://support.qiniu.com/tickets">工单系统</LinkItem>
        <LinkItem url="TODO">用户协议</LinkItem>
        <LinkItem url="TODO">隐私权政策</LinkItem>
        <LinkItem url="https://status.qiniu.com">服务状态</LinkItem>
      </LinkGroup>
      <LinkGroup title="开发者">
        <LinkItem url="https://developer.qiniu.com">开发者中心</LinkItem>
        <LinkItem url="https://blog.qiniu.com/archives/category/5">技术博客</LinkItem>
        <LinkItem url="https://www.ecug.org/">ECUG 技术大会</LinkItem>
        <LinkItem url="TODO">架构师实践日</LinkItem>
        <LinkItem url="TODO">工具插件 SDK 合作</LinkItem>
      </LinkGroup>
      <LinkGroup title="关于我们">
        <LinkItem url="/company">公司介绍</LinkItem>
        <LinkItem url="TODO">客户案例</LinkItem>
        <LinkItem url="/contact">联系我们</LinkItem>
        <LinkItem url="TODO">最新动态</LinkItem>
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
        沪公网安备 31011502000961 号 沪 ICP 备 11037377 号-5
      </div>
      <div className={style.pic}></div>
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
