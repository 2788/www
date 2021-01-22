/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { FC, SVGAttributes } from 'react'

export enum Landpage {
  Dora = 'dora',
  /** 视频云 SDK */
  Sdk = 'sdk'
}

export const nameMap = {
  [Landpage.Dora]: '视觉数据智能',
  [Landpage.Sdk]: '视频云 SDK'
}

export const urlMap = {
  [Landpage.Dora]: '/landpage/dora',
  [Landpage.Sdk]: '/landpage/sdk'
}

export const descMap = {
  [Landpage.Dora]: '在提供基础的图片/音视频功能外，集成人脸识别，内容审核，识别 OCR 等高级 AI 功能于一体的视觉数据分析平台',
  [Landpage.Sdk]: '帮助用户聚焦业务本身，快速构建短视频、直播推流、实时音视频等核心能力'
}

export const iconMap: MapTo<FC<SVGAttributes<SVGElement>>> = {
  [Landpage.Dora]: require('./images/default/dora.svg').default,
  [Landpage.Sdk]: require('./images/default/sdk.svg').default
}

export const smallIconMap: MapTo<FC<SVGAttributes<SVGElement>>> = {
  [Landpage.Dora]: require('./images/small/dora.svg').default,
  [Landpage.Sdk]: require('./images/small/sdk.svg').default
}

export type MapTo<T> = { [l in Landpage]: T }
