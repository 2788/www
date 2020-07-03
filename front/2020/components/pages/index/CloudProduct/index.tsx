import React, { createContext, useState, useContext } from 'react'
import Button from 'components/UI/Button'

import Section from '../Section'

import Machine from './machine'
import Media from './media'

import style from './index.less'
import Line2To7 from './Line2To7'
import Line3To8 from './Line3To8'
import Line from './Line'
import Positioned from './Positioned'

export type ProductType = 'all' | 'machine' | 'video'
export type Context = { productType: ProductType, isVideo: boolean, isMachine: boolean }
export const Context = createContext<Context>({ productType: 'all', isVideo: false, isMachine: false })

export default function CloudProduct() {
  const [productType, setProductType] = useState<ProductType>('all')
  const subtitle = (
    <div className={style.subtitle}>
      <Button className={productType === 'all' && 'active' || ''} type="hollow" withBorder onClick={() => setProductType('all')}>全部</Button>
      <Button className={productType === 'video' && 'active' || ''} type="hollow" withBorder onClick={() => setProductType('video')}>智能视频服务</Button>
      <Button className={productType === 'machine' && 'active' || ''} type="hollow" withBorder onClick={() => setProductType('machine')}>机器数据智能</Button>
    </div>
  )
  return (
    <Section title="产品与服务" subtitle={subtitle}>
      <Context.Provider value={{ productType, isVideo: productType === 'video', isMachine: productType === 'machine' }}>
        <div className={style.container}>
          <Machine />
          <Media />
          <Line2To7 />
          <Line3To8 />
          <VideoLine />
          <MachineLine />
        </div>
      </Context.Provider>
    </Section>
  )
}

function VideoLine() {
  const { isVideo } = useContext(Context)
  if (isVideo) {
    return (
      <>
        <Positioned top={345} left={415}><Line width={40} rotateDeg={90} leftArrow /></Positioned>
        <Positioned top={324} left={635}><Line width={12} rotateDeg={90} leftArrow /></Positioned>
      </>
    )
  }
  return null
}

function MachineLine() {
  const { isMachine } = useContext(Context)
  if (isMachine) {
    return (
      <Positioned top={479} left={530}><Line width={12} rotateDeg={90} leftArrow /></Positioned>
    )
  }
  return null
}
