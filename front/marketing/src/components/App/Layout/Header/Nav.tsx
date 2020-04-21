/**
 * @file component Nav
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import Menu from 'react-icecream/lib/menu'

import { tagIcons, menuIcons } from 'constants/resource'

import { ISubMenuBaseProps } from '.'
import * as styles from './style.m.less'

export interface IProps extends ISubMenuBaseProps {
  //
}

interface IMenuItemProps {
  iconClass?: string
  title: string
  desc?: string
  link: string
  icon?: keyof typeof menuIcons
  tag?: keyof typeof tagIcons
}

function MenuItem({ iconClass, title, desc, icon, tag, link }: IMenuItemProps) {
  // HACK: use custom hover style
  const innerProps: any = {
    onItemHover: () => null,
    onClick: () => null
  }

  return (
    <Menu.Item className={styles.subMenuItem} key={title} {...innerProps}>
      <a href={link} className={styles.item}>
        <h4>
          {icon && (<img src={menuIcons[icon]} className={classNames(styles.icon, iconClass)} alt={`icon-${icon}`} />)}
          <span className={styles.title}>{title}</span>
          {tag && (<img src={tagIcons[tag]} className={styles.tag} alt={`icon-${tag}`} />)}
        </h4>
        {desc && (<p className={styles.desc}>{desc}</p>)}
      </a>
    </Menu.Item>
  )
}

function Product({ setActiveState }: ISubMenuBaseProps) {
  function handleOpenChange(keys: string[]) {
    setActiveState(!!(keys && keys.length))
  }

  return (
    <Menu
      mode="horizontal"
      onOpenChange={handleOpenChange}
      className={styles.nav}
    >
      <Menu.SubMenu
        title="产品"
        key="production"
        className={`${styles.subMenu} ${styles.splitMenu} ${styles.production}`}
      >
        <Menu.ItemGroup title="基础服务" key="base-service">
          <MenuItem
            title="对象存储"
            desc="高可用、易扩展、低成本、一站式、支持边缘存储"
            link="https://www.qiniu.com/products/kodo"
            icon="kodo"
            tag="new"
          />
          <MenuItem
            title="私有云存储"
            desc="可定制化的数百 EB 级别、高可靠、强安全的存储系统"
            link="https://www.qiniu.com/products/private-cloud-kodo"
            icon="kodoPrivate"
            tag="new"
          />
          <MenuItem
            title="CDN"
            desc="优质节点、可监控、智能调度的内容分发服务"
            link="https://www.qiniu.com/products/qcdn"
            icon="cdn"
          />
          <MenuItem
            title="云主机"
            desc="提供云主机、负载均衡、云数据库、高防等服务 "
            link="https://www.qiniu.com/products/products/qvm"
            icon="qvm"
            tag="new"
          />
          <MenuItem
            title="云短信"
            desc="致力于为用户提供快捷高效的通信服务能力"
            link="https://www.qiniu.com/products/sms"
            icon="sms"
            tag="new"
          />
          <MenuItem
            title="边缘计算平台"
            desc="灵活配置管理大规模边缘计算应用，加速边缘智能落地"
            link="https://www.qiniu.com/products/snow"
            icon="edgeComputing"
          />
          <MenuItem
            title="SSL 证书"
            desc="提供 SSL 证书申请、管理等一站式服务"
            link="https://www.qiniu.com/ssl"
            icon="ssl"
          />
        </Menu.ItemGroup>
        <Menu.ItemGroup key="right" className={styles.rightGroup}>
          <Menu.ItemGroup title="数据 • 智能" key="data-tech">
            <MenuItem
              title="深度学习平台"
              desc="针对图片视频的一站式数据集中处理、模型训练平台"
              link="https://www.qiniu.com/products/atlab"
              icon="atlab"
            />
            <MenuItem
              title="大数据"
              desc="简单、高效、开放"
              link="https://www.qiniu.com/products/pandora"
              icon="pandora"
            />
            <MenuItem
              title="内容安全"
              desc="七牛云人工智能实验室提供的一站式内容审核服务"
              link="https://www.qiniu.com/products/censor"
              icon="censor"
              tag="new"
            />
            <MenuItem
              iconClass={styles.narrow}
              title="智能日志管理平台"
              desc="海量异构数据采集，秒级实时日志检索，高效智能业务洞察"
              link="https://www.qiniu.com/products/insight"
              icon="insight"
              tag="new"
            />
            <MenuItem
              iconClass={styles.narrow}
              title="机器数据分析平台"
              desc="助力企业探索数据、创造价值、预见未来"
              link="https://www.qiniu.com/products/express"
              icon="express"
              tag="new"
            />
            <MenuItem
              title="智能多媒体服务"
              desc="提供云端图片、音视频基础处理、丰富的人工智能服务"
              link="https://www.qiniu.com/products/dora"
              icon="dora"
            />
          </Menu.ItemGroup>
          <Menu.ItemGroup title="视频服务" key="video">
            <MenuItem
              title="直播云"
              desc="提供全球化实时流服务和端到端直播场景解决方案"
              link="https://www.qiniu.com/products/pili"
              icon="pili"
            />
            <MenuItem
              title="实时音视频云"
              desc="基于 WebRTC 的一站式解决方案，零基础搭建音视频平台"
              link="https://www.qiniu.com/products/rtn"
              icon="rtn"
              tag="new"
            />
          </Menu.ItemGroup>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  )
}

function Solution({ setActiveState }: ISubMenuBaseProps) {
  function handleOpenChange(keys: string[]) {
    setActiveState(!!(keys && keys.length))
  }

  return (
    <Menu
      mode="horizontal"
      onOpenChange={handleOpenChange}
      className={styles.nav}
    >
      <Menu.SubMenu
        title="解决方案"
        key="solution"
        className={`${styles.subMenu} ${styles.splitMenu} ${styles.solution}`}
      >
        <Menu.ItemGroup title="通用解决方案" key="general">
          <MenuItem
            title="短视频解决方案"
            desc="集成完整云端能力及卓越采集端、播放端功能的一站式短视频解决方案"
            link="https://www.qiniu.com/products/plsv"
            icon="plsv"
          />
          <MenuItem
            title="短视频特效 SDK 解决方案"
            desc="集短视频拍摄和编辑功能于一体，支持基于人脸识别的高级美颜、贴纸等特效，满足短视频内容创作绝大部分场景"
            link="https://www.qiniu.com/products/svesdk"
            icon="svesdk"
            tag="new"
          />
          <MenuItem
            title="播放器解决方案"
            desc="全自研内核的跨平台多媒体播放器，支持多种视频格式及流媒体协议"
            link="https://www.qiniu.com/products/player"
            icon="player"
          />
          <MenuItem
            title="视频冷存储解决方案"
            desc="专为综合视频平台打造，高可用低成本的 EB 级数据存储解决方案"
            link="https://www.qiniu.com/products/vcs"
            icon="vcs"
          />
          <MenuItem
            title="智能视频云解决方案"
            desc="集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案"
            link="https://www.qiniu.com/products/qavs"
            icon="qavs"
          />
          <MenuItem
            title="应用质量监控解决方案"
            desc="满足移动及视频应用性能管理需求，可定制化的质量监控平台"
            link="https://www.qiniu.com/solutions#qualityctrl"
            icon="qualityctrl"
          />
          <MenuItem
            title="直播竞答解决方案"
            desc="七牛云直播竞答解决方案是专为直播竞答产品打造的全球化直播流服务和端到端场景解决方案"
            link="https://www.qiniu.com/products/pili/livequiz"
            icon="livequiz"
          />
          <MenuItem
            title="私有云行业解决方案"
            desc="为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型"
            link="https://www.qiniu.com/solutions/kodoe"
            icon="kodoe"
          />
        </Menu.ItemGroup>
        <Menu.ItemGroup title="行业解决方案" key="profession" className={styles.profession}>
          <MenuItem
            title="新媒体解决方案"
            desc="满足传统媒体向融合媒体转型需求，构建全媒体资源管理系统"
            link="https://www.qiniu.com/products/newmedia"
            icon="newmedia"
          />
          <MenuItem
            title="监控视频边缘存储解决方案"
            desc="满足监控视频及图片就近存储、加速传输、倍速播放等关键需求"
            link="https://www.qiniu.com/products/ess"
            icon="ess"
          />
          <MenuItem
            title="视频 AI 边缘分析解决方案"
            desc="极大降低关键业务延迟，加速视频 AI 在安防监控，智能商业等多领域落地"
            link="https://www.qiniu.com/products/ecs"
            icon="ecs"
          />
          <MenuItem
            title="智能硬件与物联网解决方案"
            desc="满足智能硬件厂商各应用场景下云端计算需求"
            link="https://www.qiniu.com/solutions#intelligence"
            icon="intelligence"
          />
          <MenuItem
            title="互联网与移动互联网解决方案"
            desc="为互联网初创企业量身定制，一站式云计算服务平台"
            link="https://www.qiniu.com/solutions#internet"
            icon="internet"
          />
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  )
}

function Price() {
  return (
    <a href="https://www.qiniu.com/prices" className={styles.single}>价格</a>
  )
}

function ActivityAndCooperation({ setActiveState }: ISubMenuBaseProps) {
  function handleOpenChange(keys: string[]) {
    setActiveState(!!(keys && keys.length))
  }

  return (
    <Menu
      mode="horizontal"
      onOpenChange={handleOpenChange}
      className={styles.nav}
    >
      <Menu.SubMenu
        title="活动与合作"
        key="activity-cooperation"
        className={styles.subMenu}
      >
        <Menu.ItemGroup title="热门活动" key="activity">
          <MenuItem
            title="云主机合伙人计划"
            link="https://www.qiniu.com/products/qvm/partner"
            icon="partner"
            tag="hot"
          />
          <MenuItem
            title="架构师实践日"
            link="https://www.qiniu.com/events/arch"
            icon="arch"
          />
          <MenuItem
            title="ECUG 技术大会"
            link="https://www.ecug.org/"
            icon="ecug"
            tag="hot"
          />
        </Menu.ItemGroup>
        <Menu.ItemGroup title="云扶持" key="global">
          <MenuItem
            title="出海企业扶持"
            link="https://www.qiniu.com/products/kodo/goglobal"
            icon="goglobal"
          />
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  )
}

function Support({ setActiveState }: ISubMenuBaseProps) {
  function handleOpenChange(keys: string[]) {
    setActiveState(!!(keys && keys.length))
  }

  return (
    <Menu
      mode="horizontal"
      onOpenChange={handleOpenChange}
      className={styles.nav}
    >
      <Menu.SubMenu
        title="服务与支持"
        key="support"
        className={styles.subMenu}
      >
        <MenuItem
          title="开发者中心"
          link="https://developer.qiniu.com"
        />
        <MenuItem
          title="技术支持"
          link="https://support.qiniu.com"
        />
        <MenuItem
          title="服务健康状态"
          link="https://status.qiniu.com"
        />
      </Menu.SubMenu>
    </Menu>
  )
}

function AboutMe({ setActiveState }: ISubMenuBaseProps) {
  function handleOpenChange(keys: string[]) {
    setActiveState(!!(keys && keys.length))
  }

  return (
    <Menu
      mode="horizontal"
      onOpenChange={handleOpenChange}
      className={styles.nav}
    >
      <Menu.SubMenu
        title="关于我们"
        key="about-me"
        className={styles.subMenu}
      >
        <MenuItem
          title="公司介绍"
          link="https://www.qiniu.com/company"
        />
        <MenuItem
          title="人在七牛"
          link="https://career.qiniu.com/"
        />
        <MenuItem
          title="社会招聘"
          link="https://career.qiniu.com/social"
        />
        <MenuItem
          title="校园招聘"
          link="https://career.qiniu.com/school"
          tag="hot"
        />
        <MenuItem
          title="联系我们"
          link="https://www.qiniu.com/contact"
        />
      </Menu.SubMenu>
    </Menu>
  )
}

function News() {
  return (
    <a href="https://www.qiniu.com/news" className={styles.single}>新闻动态</a>
  )
}

export default observer(function Nav(props: IProps) {
  const { setActiveState } = props

  const subMenuBaseProps = {
    setActiveState
  }

  return (
    <nav className={styles.navWrapper}>
      <Product {...subMenuBaseProps} />
      <Solution {...subMenuBaseProps} />
      <Price />
      <ActivityAndCooperation {...subMenuBaseProps} />
      <Support {...subMenuBaseProps} />
      <News />
      <AboutMe {...subMenuBaseProps} />
    </nav>
  )
})
