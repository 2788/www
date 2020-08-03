import React, { createContext, useState, useCallback, useRef } from 'react'
import Button from 'components/UI/Button'
import { Category, categoryNameMap } from 'constants/products'

import Section from '../Section'

import style from './index.less'
import All from './All'
import Machine from './Machine'
import Video from './Video'

export type ProductType = 'all' | Category.Intelligence | Category.Video
export enum Node {
  // 机器数据
  MachineData = 'machine_data',
  // 音视频数据分析平台
  MultiMediaDataProcess = 'multi_media_daa_process',
  // 音视频数据分析平台细节
  MultiMediaDataProcessDetail = 'multi_media_daa_process_detail',
  // 机器数据分析平台
  MachineDataAnalysisPlat = 'machine_data_analysis_platform',
  // 机器数据分析平台细节
  MachineDataAnalysisPlatDetail = 'machine_data_analysis_platform_detail',
  // 数据分析师
  DataAnalyser = 'data_analyser',
  // 数据采集
  DataCollect = 'data_collect',
  // 多媒体数据
  MultiMediaData = 'multi_media_data',
  Sdk = 'sdk',
  // 视频直播 pili
  Pili = 'pili',
  // 异构数据湖
  Kodo = 'kodo',
  Cdn = 'cdn',
  // 终端用户
  TerminalUser = 'terminal_user'
}
export type Offset = { top: number, left: number }
export type Context = {
  getPrevOffset: (identity: string) => Offset | undefined
  registerOffset: (identity: string, offset: Offset) => void
}
export const Context = createContext<Context>({
  getPrevOffset: () => undefined,
  registerOffset: () => undefined
})

export default function CloudProduct() {
  const [productType, setProductType] = useState<ProductType>('all')
  const prevOffsetMapRef = useRef<{ [key: string]: Offset }>({})
  const currentOffsetMapRef = useRef<{ [key: string]: Offset }>({})
  const getPrevOffset = useCallback((identity: string) => prevOffsetMapRef.current[identity], [])
  const registerOffset = useCallback((identity: string, offset: Offset) => {
    currentOffsetMapRef.current[identity] = offset
  }, [])
  function handleButtonClick(type: ProductType) {
    return () => {
      setProductType(type)
      prevOffsetMapRef.current = currentOffsetMapRef.current
      currentOffsetMapRef.current = {}
    }
  }
  const subtitle = (
    <div className={style.subtitle}>
      <Button className={productType === Category.Intelligence && 'active' || ''} type="hollow" withBorder onClick={handleButtonClick(Category.Intelligence)}>
        {categoryNameMap[Category.Intelligence]}
      </Button>
      <Button className={productType === 'all' && 'active' || ''} type="hollow" withBorder onClick={handleButtonClick('all')}>整体</Button>
      <Button className={productType === Category.Video && 'active' || ''} type="hollow" withBorder onClick={handleButtonClick(Category.Video)}>
        视觉数据智能
      </Button>
    </div>
  )

  return (
    <Section title="产品与服务" subtitle={subtitle}>
      <Context.Provider value={{ getPrevOffset, registerOffset }}>
        <div className={style.container}>
          {productType === 'all' && <All />}
          {productType === Category.Intelligence && <Machine />}
          {productType === Category.Video && <Video />}
        </div>
      </Context.Provider>
    </Section>
  )
}
