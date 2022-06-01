import { get } from 'utils/fetch'
import { mongoApiPrefix, getFilteredList, sortByOrder, handleResponseData } from '.'

import pcCloudProducts from './banners/pc/cloud-products.jpg'
import pcNewUser from './banners/pc/new-user.jpg'
import pcCps from './banners/pc/cps.jpg'
import pcStorage from './banners/pc/storage.jpg'
import pcQvmNewUser from './banners/pc/qvm-new-user.jpg'
import pcOverseas from './banners/pc/overseas.jpg'
import pc618 from './banners/pc/618.jpg'

import mobileCloudProducts from './banners/mobile/cloud-products.jpg'
import mobileNewUser from './banners/mobile/new-user.jpg'
import mobileCps from './banners/mobile/cps.jpg'
import mobileStorage from './banners/mobile/storage.jpg'
import mobileQvmNewUser from './banners/mobile/qvm-new-user.jpg'
import mobileOverseas from './banners/mobile/overseas.jpg'
import mobile618 from './banners/mobile/618.jpg'

type BannerConfig = {
  name: string
  title: string // todo：后面要改为传入 html 字符串
  desc: string // todo：后面要改为传入 html 字符串
  pcImg: string
  mobileImg: string
  effectedAt: number
  invalidAt: number
  createdAt: number
  updatedAt: number
  /** 主题是否为深色，优先级高于背景色判断逻辑 */
  // todo：目前增加该字段是因为有的 banner 根据现有逻辑是浅色，但是应该按照深色显示
  // 后续将重新制定更规范的逻辑，从而根据 banner 图自动判断是否为深色主题，而不再需要这个字段
  dark?: boolean
  /** 背景色，用于判断是否为暗色（仅当 dark 不为 true 时才会生效）以及提供 button text color */
  // todo：后续可能将判断主题深浅和提供 button text color 能力分离，即两者各自有一套自己的取值逻辑
  backgroundColor: string
  href: string | null
  buttonTexts?: string[]
}

export type Banner = BannerConfig & {
  order: number
}

// TODO: 7 月初可移除相关代码
function get618Banner(): BannerConfig | undefined {
  const effectTime = new Date('2022-05-26T00:00:00.000+08:00').getTime()
  const invalidTime = new Date('2022-06-30T23:59:59.000+08:00').getTime()
  const now = Date.now()

  if (now < effectTime || now > invalidTime) {
    return undefined
  }

  return {
    name: '618',
    title: '6·18 年中大促',
    desc: '存储0.99元起购 8080元满减券享折上折',
    pcImg: pc618,
    mobileImg: mobile618,
    effectedAt: 0,
    invalidAt: 0,
    createdAt: 0,
    updatedAt: 0,
    dark: true,
    backgroundColor: '#fe8a23',
    href: 'https://marketing.qiniu.com/activity/2022-618-act',
    buttonTexts: ['立即抢购']
  }
}

// 获取首页 banners
export async function getBanners(): Promise<Banner[]> {
  // todo：先写死数据，后面再改为从 admin 获取数据
  return ([
    get618Banner(),
    {
      name: '海外云产品专场活动',
      title: '踏浪扬帆 海外云产品专场',
      desc: '爆款海外云产品 个人&企业出海必备',
      pcImg: pcOverseas,
      mobileImg: mobileOverseas,
      effectedAt: 0,
      invalidAt: 0,
      createdAt: 0,
      updatedAt: 0,
      backgroundColor: '#ffffff',
      href: 'https://marketing.qiniu.com/activity/os_lp',
      buttonTexts: ['立即抢购']
    },
    {
      name: '云存储',
      title: '云存储 Kodo 永久 0 元享用',
      desc: '注册即可每月免费使用 10GB 标准存储空间',
      pcImg: pcStorage,
      mobileImg: mobileStorage,
      effectedAt: 0,
      invalidAt: 0,
      createdAt: 0,
      updatedAt: 0,
      backgroundColor: '#ffffff',
      href: 'https://marketing.qiniu.com/activity/2021618-act-kodo',
      buttonTexts: ['免费领用']
    },
    {
      name: '云产品',
      title: '免费试用专区 0 元上云',
      desc: '多款云产品长期免费使用 注册即享超值赠送',
      pcImg: pcCloudProducts,
      mobileImg: mobileCloudProducts,
      effectedAt: 0,
      invalidAt: 0,
      createdAt: 0,
      updatedAt: 0,
      backgroundColor: '#ffffff',
      href: 'https://marketing.qiniu.com/activity/act-free',
      buttonTexts: ['免费领用']
    },
    {
      name: 'cps',
      title: '七牛云新推官 火热招募中',
      desc: '推广简单易上手·权益返现新升级',
      pcImg: pcCps,
      mobileImg: mobileCps,
      effectedAt: 0,
      invalidAt: 0,
      createdAt: 0,
      updatedAt: 0,
      backgroundColor: '#ffffff',
      href: '/cps',
      buttonTexts: ['立即推广']
    },
    {
      name: '新人特价活动',
      title: '新用户专享超低折扣',
      desc: '云产品首单钜惠 存储低至 1 折',
      pcImg: pcNewUser,
      mobileImg: mobileNewUser,
      effectedAt: 0,
      invalidAt: 0,
      createdAt: 0,
      updatedAt: 0,
      backgroundColor: '#ffffff',
      href: 'https://marketing.qiniu.com/activity/newuser-act',
      buttonTexts: ['立即购买']
    },
    {
      name: '云主机新人',
      title: '云主机新人专场',
      desc: '0 元享用 8 款云主机 4核8G 服务器免费用',
      pcImg: pcQvmNewUser,
      mobileImg: mobileQvmNewUser,
      effectedAt: 0,
      invalidAt: 0,
      createdAt: 0,
      updatedAt: 0,
      backgroundColor: '#ffffff',
      href: 'https://marketing.qiniu.com/activity/qvm0rmbv2',
      buttonTexts: ['立即抢购']
    }
  ].filter(Boolean) as BannerConfig[]).map((banner, index) => ({
    ...banner,
    order: index + 1,
    href: `${banner.href}?entry=www-index-banner-${index + 1}`
  }))
}

export type Activity = {
  title: string
  subTitle: string
  icon: string
  effectTime: number
  invalidTime: number
  createTime: number
  editTime: number
  label: string,
  link: string
  order: number
}

// 获取首页广告位
export function getActivities(): Promise<Activity[]> {
  return get(mongoApiPrefix + '/www-homepage-activity')
    .then(res => sortByOrder(getFilteredList(handleResponseData(res))))
}
