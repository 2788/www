import React from 'react'
import cls from 'classnames'
import { chunk } from 'lodash'
import { useMobile } from 'hooks/ua'

import djcp from './images/djcp.png'
import cloudNative from './images/cloud-native.png'
import iso20000 from './images/iso20000.png'
import iso9001 from './images/iso9001.png'
import iso27001 from './images/iso27001.png'
import iso27701 from './images/iso27701.png'
import cmmi3 from './images/cmmi3.png'
import kexin from './images/kexin.png'
import style from './style.less'

type Cert = {
  name: string
  imgUrl: string
  href?: string
}

const certs: Cert[] = [
  { name: 'DJCP', imgUrl: djcp, href: 'http://www.djbh.net/webdev/web/HomeWebAction.do?p=init' },
  { name: 'CLOUD NATIVE', imgUrl: cloudNative, href: 'https://www.cncf.io/' },
  { name: 'ISO 20000', imgUrl: iso20000 },
  { name: 'ISO 9001', imgUrl: iso9001 },
  { name: 'ISO 27001', imgUrl: iso27001 },
  { name: 'ISO 27701', imgUrl: iso27701 },
  { name: 'CMMI3', imgUrl: cmmi3 },
  { name: '可信云', imgUrl: kexin }
]

export default function Certs() {
  const isMobile = useMobile()
  return isMobile ? <Mobile /> : <Pc />
}

function Pc() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        {
          certs.map((cert, index) => (
            <Item {...cert} key={index} />
          ))
        }
      </div>
    </div >
  )
}

function Mobile() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        {
          chunk(certs, 4).map((group, i) => {
            while (group.length < 4) {
              (group as Array<Cert | null>).push(null)
            }
            return (
              <div className={style.row} key={i}>
                {
                  group.map((cert, index) => (
                    cert ? <Item {...cert} key={index} /> : <InvisibleItem key={index} />
                  ))
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

function Item({ imgUrl, name, href }: Cert) {
  const contentView = (
    <>
      <img src={imgUrl} className={style.img} />
      <p className={style.name}>{name}</p>
    </>
  )
  return (
    <div className={style.item}>
      {
        href
          ? <a target="_blank" rel="noopener" href={href} className={style.link}>{contentView}</a>
          : contentView
      }
    </div>
  )
}

function InvisibleItem() {
  return <div className={cls(style.item, style.invisible)}></div>
}
