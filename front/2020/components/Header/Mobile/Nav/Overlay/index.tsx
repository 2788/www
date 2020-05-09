import React from 'react'
import Menu, { SubMenu, MenuItem } from 'rc-menu'
import Link from 'next/link'
import CollapsedIcon from './collapsed.svg'
import ExpandedIcon from './expanded.svg'

import 'rc-menu/assets/index.css'

import style from './style.less'

export default function Overlay() {
  function expandIcon(props: any) {
    if (props.isOpen) {
      return <ExpandedIcon className={style.icon} />
    }
    return <CollapsedIcon className={style.icon} />
  }
  return (
    <Menu mode="inline" expandIcon={expandIcon}>
      <SubMenu mode="inline" title="产品">
        <SubMenu title="存储与数据湖">
          <MenuItem><Link href="/products/kodo"><a>对象存储</a></Link></MenuItem>
          <MenuItem><Link href="/products/kodo"><a>归档存储</a></Link></MenuItem>
        </SubMenu>
        <SubMenu title="基础服务">
          <MenuItem><Link href="/products/qcdn"><a>CDN</a></Link></MenuItem>
          <MenuItem><Link href="/ssl"><a>证书</a></Link></MenuItem>
          <MenuItem><Link href="/products/pili"><a>直播</a></Link></MenuItem>
          <MenuItem><Link href="/products/qvm"><a>云主机</a></Link></MenuItem>
          <MenuItem><Link href="/products/sms"><a>云短信</a></Link></MenuItem>
        </SubMenu>
        <SubMenu title="智能视频">
          <MenuItem><Link href="/products/dora"><a>智能多媒体服务</a></Link></MenuItem>
          <MenuItem><Link href="/products/censor"><a>内容安全</a></Link></MenuItem>
          <MenuItem><Link href="/products/rtn"><a>实时音视频</a></Link></MenuItem>
          <MenuItem><Link href="/products/svesdk"><a>短视频SDK</a></Link></MenuItem>
          <MenuItem><Link href="/products/plesdk"><a>推流SDK</a></Link></MenuItem>
          <MenuItem><Link href="TODO"><a>人脸核验</a></Link></MenuItem>
        </SubMenu>
        <SubMenu title="机器数据智能">
          <MenuItem><Link href="/products/insight"><a>Pandora智能日志管理平台</a></Link></MenuItem>
          <MenuItem><Link href="/products/express"><a>Pandora机器数据分析平台</a></Link></MenuItem>
        </SubMenu>
      </SubMenu>
      <SubMenu title="方案">
        <SubMenu title="行业解决方案">
          <MenuItem><Link href="/products/ess"><a>监控视频边缘存储解决方案</a></Link></MenuItem>
        </SubMenu>
        <SubMenu title="场景解决方案">
          <MenuItem><Link href="/products/vcs"><a>视频冷存储解决方案</a></Link></MenuItem>
          <MenuItem><Link href="TODO"><a>私有云行业解决方案</a></Link></MenuItem>
          <MenuItem><Link href="/products/plsv"><a>短视频解决方案</a></Link></MenuItem>
          <MenuItem><Link href="/products/qavs"><a>智能视频云解决方案</a></Link></MenuItem>
        </SubMenu>
      </SubMenu>
      <MenuItem><Link href="TODO"><a>客户</a></Link></MenuItem>
      <SubMenu title="活动与合作">
        <MenuItem><Link href="/products/qvm/partner"><a>云主机合伙人计划</a></Link></MenuItem>
        <MenuItem><Link href="/products/kodo/goglobal"><a>出海企业扶持</a></Link></MenuItem>
        <MenuItem><Link href="/invite"><a>邀请好友</a></Link></MenuItem>
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
        <MenuItem><Link href="TODO"><a>工具/插件/SDK合作</a></Link></MenuItem>
      </SubMenu>
      <SubMenu title="关于我们">
        <MenuItem><Link href="/company"><a>公司介绍</a></Link></MenuItem>
        <MenuItem><Link href="TODO"><a>客户案例</a></Link></MenuItem>
        <MenuItem><Link href="/contact"><a>联系我们</a></Link></MenuItem>
        <MenuItem><Link href="TODO"><a>最新动态</a></Link></MenuItem>
        <MenuItem><a href="https://career.qiniu.com/social">招聘</a></MenuItem>
      </SubMenu>
    </Menu>
  )
}
