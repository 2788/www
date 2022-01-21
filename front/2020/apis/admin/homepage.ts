import { get } from 'utils/fetch'
import { mongoApiPrefix, getFilteredList, sortByOrder, handleResponseData } from '.'

import pcCloudProducts from './banners/pc/cloud-products.jpg'
import pcNewUser from './banners/pc/new-user.jpg'
import pcCps from './banners/pc/cps.jpg'
import pcQvm from './banners/pc/qvm.jpg'
import pcStorage from './banners/pc/storage.jpg'
import pcQvmNewUser from './banners/pc/qvm-new-user.jpg'
import mobileCloudProducts from './banners/mobile/cloud-products.jpg'
import mobileNewUser from './banners/mobile/new-user.jpg'
import mobileCps from './banners/mobile/cps.jpg'
import mobileQvm from './banners/mobile/qvm.jpg'
import mobileStorage from './banners/mobile/storage.jpg'
import mobileQvmNewUser from './banners/mobile/qvm-new-user.jpg'

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
  // todo：目前背景色只用来判断是否为暗色，不用于填充，所以后面改为直接在官网获取图片颜色
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
      href: 'https://marketing.qiniu.com/activity/2021618-act-kodo?entry=www-index-banner-1',
      order: 1,
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
      href: 'https://marketing.qiniu.com/activity/act-free?entry=www-index-banner-2',
      order: 2,
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
      href: '/cps?entry=www-index-banner-3',
      order: 3,
      buttonTexts: ['立即推广']
    },
    {
      name: '云主机',
      title: '云主机专场 感恩回馈',
      desc: '爆款机型 6 折起 新老客领券打折送好礼',
      pcImg: pcQvm,
      mobileImg: mobileQvm,
      effectedAt: 0,
      invalidAt: 0,
      createdAt: 0,
      updatedAt: 0,
      backgroundColor: '#ffffff',
      href: 'https://marketing.qiniu.com/activity/2021-12-qvmact?entry=www-index-banner-4',
      order: 4,
      buttonTexts: ['立即抢购']
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
