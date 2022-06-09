/**
 * @file sensors utils for thallo
 * @desc 用于将（来自广告投放平台的）广告位行为上报神策的工具
 */

import { AdvertInfo } from 'apis/thallo'

import { track } from '.'

/** 上报“广告位展现”事件 */
export function trackShow(info: AdvertInfo) {
  track('thalloShow', {
    advert_code: info.code,
    advert_serving_id: info.servingId
  })
}

/** 上报“广告位点击”事件 */
export function trackClick(info: AdvertInfo) {
  track('thalloClick', {
    advert_code: info.code,
    advert_serving_id: info.servingId
  })
}
