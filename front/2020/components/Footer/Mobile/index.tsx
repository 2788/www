import React, { PropsWithChildren } from 'react'
import Menu, { SubMenu } from 'components/UI/Menu'
import Link from 'components/Link'
import { Product, nameMap, urlMap, categories, categoryNameMap, categoryProductsMap } from 'constants/products'
import { urlMap as solutionUrlMap, nameMap as solutionNameMap, allAvailableSolutions } from 'constants/solutions'
import Button from 'components/UI/Button'

import Github from './images/github.svg'
import Weibo from './images/sina_weibo.svg'
import Qrcode from './images/qrcode.png'

import style from './style.less'

function MenuItem({ children }: PropsWithChildren<{}>) {
  return <div className="menu-item">{children}</div>
}

function getProductItems(products: readonly Product[]) {
  return products.filter(
    product => urlMap[product] != null
  ).map(product => (
    <MenuItem key={product}>
      <Link href={urlMap[product]!}>{nameMap[product]}</Link>
    </MenuItem>
  ))
}

export default function FooterForMobile() {
  const productSubMenusView = categories.map(category => (
    <SubMenu key={category} title={categoryNameMap[category]}>
      {getProductItems(categoryProductsMap[category])}
    </SubMenu>
  ))
  const solutionMenuItemsView = allAvailableSolutions.map(solution => (
    <MenuItem key={solution}>
      <Link href={solutionUrlMap[solution]!}>{solutionNameMap[solution]}</Link>
    </MenuItem>
  ))
  return (
    <div className={style.footer}>
      <div className={style.nav}>
        <Menu mode="inline" inlineIndent={15}>
          {productSubMenusView}
          <SubMenu title="解决方案">
            {solutionMenuItemsView}
          </SubMenu>
          <SubMenu title="合作伙伴">
            <MenuItem><Link href="/partner">合作伙伴与生态</Link></MenuItem>
            <MenuItem><Link href="/products/kodo/goglobal">出海企业扶持</Link></MenuItem>
            <MenuItem><Link href="/invite">邀请好友</Link></MenuItem>
          </SubMenu>
          <SubMenu title="服务与支持">
            <MenuItem><a href="https://developer.qiniu.com/">开发文档</a></MenuItem>
            <MenuItem><a href="https://support.qiniu.com">技术支持</a></MenuItem>
            <MenuItem><a href="https://segmentfault.com/qiniu?ref=portal.qiniu.com">问答社区</a></MenuItem>
            <MenuItem><a href="https://support.qiniu.com/tickets">工单系统</a></MenuItem>
            <MenuItem><a href="https://status.qiniu.com">服务健康状态</a></MenuItem>
          </SubMenu>
          <SubMenu title="开发者">
            <MenuItem><a href="https://developer.qiniu.com">开发者中心</a></MenuItem>
            <MenuItem><a href="https://blog.qiniu.com/archives/category/5">技术博客</a></MenuItem>
            <MenuItem><a href="https://www.ecug.org/">ECUG 技术大会</a></MenuItem>
            <MenuItem><Link href="/cooperations">工具/插件/SDK 合作</Link></MenuItem>
          </SubMenu>
          <SubMenu title="关于我们">
            <MenuItem><a href="https://campus.qiniu.com">校园招聘</a></MenuItem>
            <MenuItem><a href="https://career.qiniu.com/social">社会招聘</a></MenuItem>
            <MenuItem><Link href="/company">公司介绍</Link></MenuItem>
            <MenuItem><Link href="/contact">联系我们</Link></MenuItem>
            <MenuItem><Link href="https://blog.qiniu.com/archives/category/1">最新动态</Link></MenuItem>
          </SubMenu>
        </Menu>
      </div>
      <div className={style.icons}>
        <a href="https://github.com/qiniu" target="_blank" rel="noopener"><Github className={style.icon} /></a>
        <a href="http://weibo.com/qiniutek" target="_blank" rel="noopener"><Weibo className={style.icon} /></a>
      </div>
      <div className={style.qrCode}>
        <img className={style.image} src={Qrcode} />
        扫描二维码关注七牛云公众号
      </div>
      <div className={style.buy}>
        <Button type="primary" className={style.buyBtn} href="tel:4008089176">购买咨询：400-808-9176</Button>
      </div>
      <div className={style.icp}>
        沪公网安备31011502000961号<br />
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noreferrer noopener">
          沪ICP备11037377号-5
        </a>
      </div>
    </div>
  )
}
