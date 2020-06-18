import React from 'react'
import Link from 'components/Link'
import { Product, urlMap, nameMap, categories, categoryNameMap, categoryProductsMap } from 'constants/products'
import * as sol from 'constants/solutions'
import Menu, { SubMenu, MenuItem } from 'components/UI/Menu'

import style from './index.less'

function getProductItems(products: readonly Product[]) {
  return products.map(product => (
    <MenuItem key={product}>
      <Link href={urlMap[product] || '#'}>{nameMap[product]}</Link>
    </MenuItem>
  ))
}

function getSolutionItems(solutions: readonly sol.Solution[]) {
  return solutions.map(solution => (
    <MenuItem key={solution}>
      <Link href={sol.urlMap[solution] || '#'}>{sol.nameMap[solution]}</Link>
    </MenuItem>
  ))
}

export default function Overlay() {
  const productSubMenus = categories.map(category => (
    <SubMenu key={category} title={categoryNameMap[category]}>
      {getProductItems(categoryProductsMap[category])}
    </SubMenu>
  ))

  const solutionSubMenus = sol.allCategories.map(category => (
    <SubMenu key={category} title={sol.categoryNameMap[category]}>
      {getSolutionItems(sol.categorySolutionsMap[category])}
    </SubMenu>
  ))

  return (
    <Menu mode="inline" className={style.menu} rootMenus={['sub1', 'sub2', 'sub3', 'sub4', 'sub5']}>
      <SubMenu key="sub1" mode="inline" title="产品">
        {productSubMenus}
      </SubMenu>
      <SubMenu key="sub2" title="方案">
        {solutionSubMenus}
      </SubMenu>
      <MenuItem><Link href="https://qmall.qiniu.com/">商城</Link></MenuItem>
      <SubMenu key="sub3" title="活动与合作">
        <MenuItem><Link href="/products/qvm/partner">云主机合伙人计划</Link></MenuItem>
        <MenuItem><Link href="/products/kodo/goglobal">出海企业扶持</Link></MenuItem>
        <MenuItem><Link href="/invite">邀请好友</Link></MenuItem>
        <MenuItem><Link href="/cooperations">工具插件 SDK 合作</Link></MenuItem>
      </SubMenu>
      <SubMenu key="sub4" title="服务与支持">
        <MenuItem><a href="https://developer.qiniu.com/">开发文档</a></MenuItem>
        <MenuItem><a href="https://support.qiniu.com">技术支持</a></MenuItem>
        <MenuItem><a href="https://segmentfault.com/qiniu?ref=portal.qiniu.com">问答社区</a></MenuItem>
        <MenuItem><a href="https://support.qiniu.com/tickets">工单系统</a></MenuItem>
        <MenuItem><a href="https://status.qiniu.com">服务健康状态</a></MenuItem>
      </SubMenu>
      <MenuItem><a href="https://blog.qiniu.com/">七牛资讯</a></MenuItem>
      <SubMenu key="sub5" title="关于我们">
        <MenuItem><Link href="/company">公司介绍</Link></MenuItem>
        <MenuItem><Link href="/case">客户案例</Link></MenuItem>
        <MenuItem><Link href="/contact">联系我们</Link></MenuItem>
        <MenuItem><a href="https://blog.qiniu.com/archives/category/1">最新动态</a></MenuItem>
        <MenuItem><a href="https://career.qiniu.com/social">招聘</a></MenuItem>
      </SubMenu>
    </Menu>
  )
}
