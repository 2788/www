import React from 'react'
import { useMobile } from 'hooks/ua'
import img1 from './images/img1.png'
import img2 from './images/img2.png'
import img3 from './images/img3.png'
import style from './style.less'

export default function Certs() {
  const isMobile = useMobile()
  if (isMobile) return null
  return (
    <div className={style.wrapper}>
      <div className={style.item}>
        <img src={img1} className={style.img} />
        <p className={style.name}>7 * 24 小时技术服务</p>
      </div>
      <div className={style.item}>
        <img src={img2} className={style.img} />
        <p className={style.name}>客户全流程服务</p>
      </div>
      <div className={style.item}>
        <img src={img3} className={style.img} />
        <p className={style.name}>云服务产品咨询服务</p>
      </div>
    </div>
  )
}
