/**
 * @file 内容站 - 首页轮播图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { StdInfo } from 'apis/mongo-api-client'
import { StateProps } from 'utils/check'

export interface BannerInfo extends StateProps {
  name: string
  img: string
  link: string
  order: number
}

export interface Banner extends BannerInfo, StdInfo {}

export const bannerSize = {
  preview: {
    width: 1180,
    height: 410
  },
  upload: {
    width: 2880,
    height: 800
  }
}
