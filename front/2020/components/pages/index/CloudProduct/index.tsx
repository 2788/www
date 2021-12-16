import React, { createContext, useState, useCallback, useRef } from 'react'
import cls from 'classnames'
import Link from 'components/Link'
import Dropdown from 'components/UI/Dropdown'
import Button from 'components/UI/Button'
import { Product, urlMap, Category, categoryNameMap } from 'constants/products'

import Section from '../Section'

import style from './index.less'
import All from './All'
import Machine from './Machine'
import ArrowDownIcon from './arrow-down.svg'
import Media from './Media'

export type ProductType = 'all' | Category.Data | Category.Media
export enum Node {
  // 机器数据
  MachineData = 'machine_data',
  // 视觉数据分析平台
  MultiMediaDataProcess = 'multi_media_daa_process',
  // 视觉数据分析平台细节
  MultiMediaDataProcessDetail = 'multi_media_daa_process_detail',
  // 机器数据分析平台
  MachineDataProcessPlat = 'machine_data_process_platform',
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
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const dropdownOverlay = (
    <div className={cls(style.overlay, dropdownVisible && style.hiddenBorder)}>
      <Link className={style.link} href={urlMap[Product.Pili]}>
        视频直播 Pili
      </Link>
      <Link className={style.link} href={urlMap[Product.Geek]}>
        低延时直播 Geek
      </Link>
      <Link className={style.link} href={urlMap[Product.Rtn]}>
        实时音视频 QRTC
      </Link>
      <Link className={style.link} href={urlMap[Product.Qvs]}>
        视频监控 QVS
      </Link>
    </div>
  )
  const subtitle = (
    <div className={style.subtitle}>
      <div className={cls(style.row, style.paasProducts)}>
        <Button className={style.btn} type="default-grey" href={urlMap[Product.Kodo]} withBorder>
          对象存储 Kodo
        </Button>
        <Button className={style.btn} type="default-grey" href={urlMap[Product.Dora]} withBorder>
          智能多媒体服务 Dora
        </Button>
        <Button className={style.btn} type="default-grey" href={urlMap[Product.Express]} withBorder>
          机器数据分析平台 Pandora
        </Button>
        <Dropdown overlay={dropdownOverlay} align={{ offset: [0, 0] }} onVisibleChange={setDropdownVisible}>
          <Button className={cls(style.btn, dropdownVisible && style.hiddenBorderRadius)} type="default-grey" withBorder>
            直播与实时互动
            <ArrowDownIcon className={cls(style.arrow, dropdownVisible && style.up)} />
          </Button>
        </Dropdown>
        <Button className={style.btn} type="default-grey" href={urlMap[Product.Cdn]} withBorder>
          内容分发网络 QCDN
        </Button>
        <Button className={style.btn} type="default-grey" href={urlMap[Product.Qvm]} withBorder>
          云主机服务 QVM
        </Button>
      </div>
      <div className={style.row}>
        <Button className={cls(style.btn, productType === Category.Data && 'active')} type="default-grey" onClick={handleButtonClick(Category.Data)}>
          {categoryNameMap[Category.Data]}
        </Button>
        <Button className={cls(style.btn, productType === 'all' && 'active')} type="default-grey" onClick={handleButtonClick('all')}>整体</Button>
        <Button className={cls(style.btn, productType === Category.Media && 'active')} type="default-grey" onClick={handleButtonClick(Category.Media)}>
          {categoryNameMap[Category.Media]}
        </Button>
      </div>
    </div>
  )

  return (
    <Section title="“云+数据” 一体化 PaaS 平台" subtitle={subtitle} rootClassName={style.wraper}>
      <Context.Provider value={{ getPrevOffset, registerOffset }}>
        <div className={style.container}>
          {productType === 'all' && <All />}
          {productType === Category.Data && <Machine />}
          {productType === Category.Media && <Media />}
        </div>
      </Context.Provider>
    </Section>
  )
}
