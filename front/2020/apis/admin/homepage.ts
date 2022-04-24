import { get } from 'utils/fetch'
import { mongoApiPrefix, getFilteredList, sortByOrder, handleResponseData } from '.'

import pcCloudProducts from './banners/pc/cloud-products.jpg'
import pcNewUser from './banners/pc/new-user.jpg'
import pcCps from './banners/pc/cps.jpg'
import pcStorage from './banners/pc/storage.jpg'
import pcQvmNewUser from './banners/pc/qvm-new-user.jpg'
import pcOverseas from './banners/pc/overseas.jpg'

import mobileCloudProducts from './banners/mobile/cloud-products.jpg'
import mobileNewUser from './banners/mobile/new-user.jpg'
import mobileCps from './banners/mobile/cps.jpg'
import mobileStorage from './banners/mobile/storage.jpg'
import mobileQvmNewUser from './banners/mobile/qvm-new-user.jpg'
import mobileOverseas from './banners/mobile/overseas.jpg'

export type Banner = {
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
  order: number
  buttonTexts?: string[]
}

// 获取首页 banners
export function getBanners(): Promise<Banner[]> {
  // todo：先写死数据，后面再改为从 admin 获取数据
  return Promise.resolve([
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
      href: 'https://marketing.qiniu.com/activity/os_lp?entry=www-index-banner-1',
      order: 1,
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
      href: 'https://marketing.qiniu.com/activity/2021618-act-kodo?entry=www-index-banner-2',
      order: 2,
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
      href: 'https://marketing.qiniu.com/activity/act-free?entry=www-index-banner-3',
      order: 3,
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
      href: '/cps?entry=www-index-banner-4',
      order: 4,
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
      href: 'https://marketing.qiniu.com/activity/newuser-act?entry=www-index-banner-5',
      order: 5,
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
      href: 'https://marketing.qiniu.com/activity/qvm0rmbv2?entry=www-index-banner-6',
      order: 6,
      buttonTexts: ['立即抢购']
    }
  ] as Banner[])
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
