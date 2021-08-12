import React, { useState } from 'react'
import RadioGroup, { ButtonRadio as Radio } from 'components/UI/ButtonRadio'
import QRCode from 'qrcode.react'
import style from './style.less'

enum DemoType {
  VedioSdk = 'vedio-sdk',
  LiveSdk = 'live-sdk',
  RealTimeSdk = 'realtime-sdk'
}

const typeDemoMap = {
  [DemoType.VedioSdk]: '短视频特效 SDK',
  [DemoType.LiveSdk]: '直播特效 SDK',
  [DemoType.RealTimeSdk]: '实时音视频特效 SDK'
}

const urlsMap = {
  [DemoType.VedioSdk]: ['http://fir.qnsdk.com/654e', 'http://fir.qnsdk.com/5qwg'],
  [DemoType.LiveSdk]: ['http://fir.qnsdk.com/5fdt', 'http://fir.qnsdk.com/b3jw'],
  [DemoType.RealTimeSdk]: ['http://fir.qnsdk.com/naem', 'http://fir.qnsdk.com/kzh9']
}

export default function ForPc() {

  const [activeType, setActiveType] = useState(DemoType.VedioSdk)

  return (
    <>
      <RadioGroup className={style.radios} value={activeType} onChange={t => setActiveType(t as DemoType)}>
        <Radio className={style.radio} value={DemoType.VedioSdk}>{typeDemoMap[DemoType.VedioSdk]}</Radio>
        <Radio className={style.radio} value={DemoType.LiveSdk}>{typeDemoMap[DemoType.LiveSdk]}</Radio>
        <Radio className={style.radio} value={DemoType.RealTimeSdk}>{typeDemoMap[DemoType.RealTimeSdk]}</Radio>
      </RadioGroup>
      <div className={style.picContainer}>
        <div>
          <MyQRCode value={urlsMap[activeType][0]} />
          <p>Android</p>
        </div>
        <div>
          <MyQRCode value={urlsMap[activeType][1]} />
          <p>iOS</p>
        </div>
      </div>
    </>
  )
}
function MyQRCode(props: { value: string }) {
  return (
    <QRCode
      className={style.qrCode}
      renderAs="svg"
      fgColor="#333"
      {...props}
    />
  )
}
