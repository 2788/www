/**
 * @file 产品页 客户案例
 * @author tang <tangzhengwei01@qiniu.com>
 */

import { chunk } from 'lodash'
import React from 'react'
import { Carousel } from 'react-icecream-2'
import classnames from 'classnames'

import { Img as CardImg } from 'components/UI/Card'
import { useMobile } from 'hooks/ua'

import style from './style.less'

interface Logo {
  logoUrl: string
}

interface Props {
  items: Logo[]
}

export default function ProductCase({ items }: Props) {
  const isMobile = useMobile()

  return (
    <div className={style.wrapper}>
      {isMobile
        ? <MobileLogo logos={items} />
        : <PcLogo logos={items} />}
    </div>
  )
}

function PcLogo({ logos }: { logos: Logo[] }) {
  return (
    <Carousel rootHtmlProps={{ className: style.pcWrapper }} type="secondary">
      {chunk(chunk(logos, 4), 2).map((groups, index) => (
        <div className={style.logos} key={index}>
          {groups.map((group, i) => (
            <div className={style.row} key={i}>
              {
                [...group, ...Array.from({ length: 4 }).map(() => null)].slice(0, 4).map((logo, idx) => (
                  <Logo logo={logo} key={idx} />
                ))
              }
            </div>
          ))}
        </div>
      ))}
    </Carousel>
  )
}

function MobileLogo({ logos }: { logos: Logo[] }) {
  return (
    <div className={style.mobileWrapper}>
      {chunk(logos, 2).map((logoList, i) => (
        <div key={i} className={style.row}>
          <Logo logo={logoList[0]} />
          <Logo logo={logoList[1] || null} />
        </div>
      ))}
    </div>
  )
}

function Logo({ logo }: { logo: Logo | null }) {
  return logo !== null
    ? (
      <div className={style.logoWrapper}>
        <CardImg src={logo.logoUrl} className={style.logo} />
      </div>
    )
    : <div className={classnames(style.logoWrapper, style.invisible)} />
}
