import React from 'react'
import Link from 'components/Link'
import {
  Product, urlMap, nameMap,
  categoryStorage, categoryService, categoryVideo, categoryIntelligence
} from 'constants/products'
import Menu, { SubMenu, MenuItem } from 'components/UI/Menu'

import style from './index.less'

function getProductItems(products: readonly Product[]) {
  return products.map(product => (
    <MenuItem key={product}>
      <Link href={urlMap[product] || '#'}>{nameMap[product]}</Link>
    </MenuItem>
  ))
}

export default function Overlay() {
  return (
    <Menu mode="inline" className={style.menu}>
      <SubMenu mode="inline" title="产品">
        <SubMenu title="存储与数据湖">
          {getProductItems(categoryStorage)}
        </SubMenu>
        <SubMenu title="基础服务">
          {getProductItems(categoryService)}
        </SubMenu>
        <SubMenu title="智能视频">
          {getProductItems(categoryVideo)}
        </SubMenu>
        <SubMenu title="机器数据智能">
          {getProductItems(categoryIntelligence)}
        </SubMenu>
      </SubMenu>
      <SubMenu title="方案">
        <SubMenu title="行业解决方案">
          <MenuItem><Link href="/solutions/ess">监控视频边缘存储解决方案</Link></MenuItem>
        </SubMenu>
        <SubMenu title="场景解决方案">
          <MenuItem><Link href="/solutions/vcs">视频冷存储解决方案</Link></MenuItem>
          <MenuItem><Link href="/solutions/kodoe">私有云行业解决方案</Link></MenuItem>
          <MenuItem><Link href="/solutions/plsv">短视频解决方案</Link></MenuItem>
          <MenuItem><Link href="/solutions/qavs">智能视频云解决方案</Link></MenuItem>
        </SubMenu>
      </SubMenu>
      <MenuItem><Link href="/case">客户</Link></MenuItem>
      <SubMenu title="活动与合作">
        <MenuItem><Link href="/products/qvm/partner">云主机合伙人计划</Link></MenuItem>
        <MenuItem><Link href="/products/kodo/goglobal">出海企业扶持</Link></MenuItem>
        <MenuItem><Link href="/invite">邀请好友</Link></MenuItem>
        <MenuItem><Link href="/cooperations">工具插件 SDK 合作</Link></MenuItem>
      </SubMenu>
      <SubMenu title="服务与支持">
        <MenuItem><a href="https://developer.qiniu.com/">开发文档</a></MenuItem>
        <MenuItem><a href="https://support.qiniu.com">技术支持</a></MenuItem>
        <MenuItem><a href="https://segmentfault.com/qiniu?ref=portal.qiniu.com">问答社区</a></MenuItem>
        <MenuItem><a href="https://support.qiniu.com/tickets">工单系统</a></MenuItem>
        <MenuItem><a href="https://status.qiniu.com">服务健康状态</a></MenuItem>
      </SubMenu>
      <MenuItem><a href="https://blog.qiniu.com/">七牛资讯</a></MenuItem>
      <SubMenu title="关于我们">
        <MenuItem><Link href="/company">公司介绍</Link></MenuItem>
        <MenuItem><Link href="/case">客户案例</Link></MenuItem>
        <MenuItem><Link href="/contact">联系我们</Link></MenuItem>
        <MenuItem><a href="https://blog.qiniu.com/archives/category/1">最新动态</a></MenuItem>
        <MenuItem><a href="https://career.qiniu.com/social">招聘</a></MenuItem>
      </SubMenu>
    </Menu>
  )
}
