import React from 'react'
import Link from 'components/Link'
import {
  categories, categoryNameMap, getCategoryProducts, PartialProductData, normalizeProduct,
  subCategoryNameMap, subCategoryProductDatasForPrice, ProductDataForPrice
} from 'constants/products'
import { Activity, urlMap as activityUrlMap, nameMap as activityNameMap } from 'constants/activity'
import * as sol from 'constants/solutions'
import Menu, { SubMenu, MenuItem } from 'components/UI/Menu'

import style from './index.less'

function getProductItems(products: PartialProductData[]) {
  return products.filter(
    product => normalizeProduct(product).url !== null
  ).map((product, index) => {
    const productData = normalizeProduct(product)
    return (
      <MenuItem key={index}>
        <Link href={productData.url!}>
          {productData.name}
        </Link>
      </MenuItem>
    )
  })
}

function getSolutionItems(solutions: readonly sol.Solution[]) {
  return solutions.filter(
    solution => sol.getUrl(solution) != null
  ).map(solution => (
    <MenuItem key={solution}>
      <Link href={sol.getUrl(solution)!}>{sol.nameMap[solution]}</Link>
    </MenuItem>
  ))
}

function getPrictItems({ product, name, priceUrl }: ProductDataForPrice) {
  return (
    <MenuItem key={product}>
      <Link href={priceUrl}>{name}</Link>
    </MenuItem>
  )
}

export default function Overlay() {
  const productSubMenus = categories.map(category => (
    <SubMenu key={category} title={categoryNameMap[category]}>
      {
        getProductItems(getCategoryProducts(category))
      }
    </SubMenu>
  ))

  const solutionSubMenus = sol.categories.map(category => (
    <SubMenu key={category} title={sol.categoryNameMap[category]}>
      {getSolutionItems(sol.categorySolutionsMap[category])}
    </SubMenu>
  ))

  const priceSubMenus = subCategoryProductDatasForPrice.map(([subCategory, productDatas]) => (
    <SubMenu key={subCategory} title={subCategoryNameMap[subCategory]}>
      {productDatas.map(getPrictItems)}
    </SubMenu>
  ))

  const rootMenus = [
    'sub1', 'sub2', 'sub3', 'sub4', 'sub5',
    ...(priceSubMenus.length > 0 ? ['sub6'] : [])
  ]

  return (
    <Menu mode="inline" className={style.menu} rootMenus={rootMenus}>
      <MenuItem><Link href="https://marketing.qiniu.com/activity/all?entry=index-advert">最新活动</Link></MenuItem>
      <SubMenu key="sub1" mode="inline" title="产品">
        {productSubMenus}
      </SubMenu>
      <SubMenu key="sub2" title="解决方案">
        {solutionSubMenus}
      </SubMenu>
      <MenuItem><Link href="https://qmall.qiniu.com/">云商城</Link></MenuItem>
      {priceSubMenus.length > 0 && (
        <SubMenu key="sub6" title="定价">
          {priceSubMenus}
        </SubMenu>
      )}
      <SubMenu key="sub3" title="服务与支持">
        <SubMenu key="sub3-1" title="文档与工具">
          <MenuItem><a href="https://developer.qiniu.com/">文档中心</a></MenuItem>
          <MenuItem><a href="https://developer.qiniu.com/sdk#official-sdk">SDK &amp; 工具</a></MenuItem>
        </SubMenu>
        <SubMenu key="sub3-2" title="服务支持">
          <MenuItem><a href="https://support.qiniu.com">文档中心</a></MenuItem>
          <MenuItem><a href="https://support.qiniu.com/tickets">工单系统</a></MenuItem>
          <MenuItem><a href="https://segmentfault.com/qiniu?ref=portal.qiniu.com">问答社区</a></MenuItem>
          <MenuItem><Link href="/product-news">产品动态</Link></MenuItem>
          <MenuItem><a href="https://status.qiniu.com">服务健康状态</a></MenuItem>
        </SubMenu>
        <SubMenu key="sub3-3" title="政策与协议">
          <MenuItem><Link href="/user-agreement">用户协议</Link></MenuItem>
          <MenuItem><Link href="/agreements/privacy-right">隐私权政策</Link></MenuItem>
          <MenuItem><Link href="/sla-kodo">产品 SLA</Link></MenuItem>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" title="生态合作">
        <SubMenu key="sub4-1" title="合作伙伴">
          <MenuItem><Link href="/partner">合作伙伴与生态</Link></MenuItem>
          <MenuItem><Link href="/student">校园项目</Link></MenuItem>
        </SubMenu>
        <SubMenu key="sub4-2" title="开发合作">
          <MenuItem><Link href="/cooperations">工具插件 SDK 合作</Link></MenuItem>
        </SubMenu>
        <SubMenu key="sub4-3" title="推广返现">
          <MenuItem><Link href="/cps">新推官 CPS 推广返现</Link></MenuItem>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub5" title="了解七牛云">
        <SubMenu key="sub5-1" title="关于我们">
          <MenuItem><Link href="/company">公司介绍</Link></MenuItem>
          <MenuItem><Link href="/contact">联系我们</Link></MenuItem>
        </SubMenu>
        <SubMenu key="sub5-2" title="活动与资料">
          <MenuItem><a href="/pgc">七牛资料库</a></MenuItem>
          <MenuItem><Link href={activityUrlMap[Activity.Main]}>{activityNameMap[Activity.Main]}</Link></MenuItem>
        </SubMenu>
        <SubMenu key="sub5-3" title="加入我们">
          <MenuItem><a href="https://campus.qiniu.com">校园招聘</a></MenuItem>
          <MenuItem><a href="https://career.qiniu.com/social">社会招聘</a></MenuItem>
        </SubMenu>
      </SubMenu>
    </Menu>
  )
}
