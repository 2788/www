import React, { PropsWithChildren } from 'react'
import { getCurrentYear } from 'utils'
import Menu, { SubMenu } from 'components/UI/Menu'
import Link from 'components/Link'
import Button from 'components/UI/Button'
import { nameMap, Product, urlMap } from 'constants/products'
import { Activity, nameMap as activityNameMap, urlMap as activityUrlMap } from 'constants/activity'
import { urlForPrice } from 'utils/route'
import Github from './images/github.svg'
import Weibo from './images/sina_weibo.svg'
import Qrcode from './images/qrcode.png'
import style from './style.less'

function MenuItem({ children }: PropsWithChildren<{}>) {
  return <div className="menu-item">{children}</div>
}

export default function FooterForMobile() {
  const productItems = [
    Product.Kodo, Product.Cdn, Product.Pili, Product.DoraAudio, Product.Censor, Product.Qvm, Product.Express
  ] as const
  const productItemsView = productItems.map(product => (
    <MenuItem key={product}><Link href={urlMap[product]}>{nameMap[product]}</Link></MenuItem>
  ))

  return (
    <div className={style.footer}>
      <div className={style.nav}>
        <Menu mode="inline" inlineIndent={15}>
          <SubMenu title="快速入口">
            <MenuItem><Link href="https://portal.qiniu.com/financial/overview">充值开票</Link></MenuItem>
            <MenuItem><Link href="https://portal.qiniu.com/user/profile">账号管理</Link></MenuItem>
            <MenuItem><Link href="https://portal.qiniu.com/home">控制台</Link></MenuItem>
            <MenuItem><Link href="https://qmall.qiniu.com">资源包购买</Link></MenuItem>
            <MenuItem><Link href={urlForPrice(Product.Kodo)}>产品报价</Link></MenuItem>
          </SubMenu>

          <SubMenu title="热门产品">
            {productItemsView}
          </SubMenu>

          <SubMenu title="服务支持">
            <MenuItem><Link href="https://support.qiniu.com/tickets/new">工单系统</Link></MenuItem>
            <MenuItem><Link href="https://developer.qiniu.com">文档中心</Link></MenuItem>
            <MenuItem><Link href="/user-agreement">用户协议</Link></MenuItem>
            <MenuItem><Link href="/sla-kodo">产品 SLA</Link></MenuItem>
            <MenuItem><Link href="https://status.qiniu.com">服务状态</Link></MenuItem>
            <MenuItem><Link href="https://developer.qiniu.com/sdk#official-tool">开发者工具</Link></MenuItem>
          </SubMenu>

          <SubMenu title="合作伙伴">
            <MenuItem><Link href={`${urlMap[Product.OpenAPI]}/partner`}>{nameMap[Product.OpenAPI]}</Link></MenuItem>
            <MenuItem><Link href="/cps">CPS 返现</Link></MenuItem>
            <MenuItem><Link href="/partner">代理合作伙伴</Link></MenuItem>
            <MenuItem><Link href="/cooperations">工具插件 SDK 合作</Link></MenuItem>
          </SubMenu>

          <SubMenu title="关于我们">
            <MenuItem><Link href="/company">公司介绍</Link></MenuItem>
            <MenuItem><Link href="https://jobs.qiniu.com">社会招聘</Link></MenuItem>
            <MenuItem><Link href="https://campus.qiniu.com">校园招聘</Link></MenuItem>
            <MenuItem><Link href="/contact">联系我们</Link></MenuItem>
            <MenuItem><Link href="/pgc">七牛资料库</Link></MenuItem>
            <MenuItem><Link href={activityUrlMap[Activity.Main]}>{activityNameMap[Activity.Main]}</Link></MenuItem>
          </SubMenu>
        </Menu>
      </div>
      <div className={style.icons}>
        <a href="http://weibo.com/qiniutek" target="_blank" rel="noopener"><Weibo className={style.icon} /></a>
        <a href="https://github.com/qiniu" target="_blank" rel="noopener"><Github className={style.icon} /></a>
      </div>
      <div className={style.qrCode}>
        <img className={style.image} src={Qrcode} />
        扫描二维码关注七牛云公众号
      </div>
      <div className={style.buy}>
        <Button type="primary" className={style.buyBtn} href="tel:4008089176">购买咨询：400-808-9176</Button>
      </div>
      <div className={style.icp}>
        Copyright © 2011-{getCurrentYear()} Qiniu Cloud.
      </div>
    </div>
  )
}
