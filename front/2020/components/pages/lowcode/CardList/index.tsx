/**
 * @file 低代码页面卡片
 * @author zzz <zhangzuzhou@qiniu.com>
 */

import React from 'react'

import Link from 'components/Link'
import Menu, { SubMenu } from 'components/UI/Menu'

import { useMobile } from 'hooks/ua'

import style from './style.m.less'

export interface CardItemProps {
  imgUrl: string
  title: string
  desc: string
  learnMoreUrl: string
  portalUrl?: string
}

export interface Props{
  cardListInfo: CardItemProps[]
}

export default function CardList({ cardListInfo }: Props) {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <div className={style.mobileCard}>
        <Menu mode="inline">
          {cardListInfo.map(({ imgUrl, title, desc, learnMoreUrl, portalUrl }) => (
            <SubMenu title={title} key={title}>
              <section className={style.card}>
                <div className={style.imgWrapper}>
                  <img src={imgUrl} alt={title} className={style.img} />
                </div>
                <div className={style.content}>
                  <div className={style.desc}>{desc}</div>
                  <div className={style.footer}>
                    {!!portalUrl && <Link href={portalUrl} className={style.link}>控制台</Link>}
                    <Link href={learnMoreUrl} className={style.link}>了解更多</Link>
                  </div>
                </div>
              </section>
            </SubMenu>
          ))}
        </Menu>
      </div>
    )
  }

  return (
    <>
      {cardListInfo.map(({ imgUrl, title, desc, learnMoreUrl, portalUrl }) => (
        <section className={style.card} key={title}>
          <div className={style.imgWrapper}>
            <img src={imgUrl} alt={title} className={style.img} />
          </div>
          <div className={style.content}>
            <h5 className={style.title}>{title}</h5>
            <div className={style.desc}>{desc}</div>
            <div className={style.footer}>
              {!!portalUrl && <Link href={portalUrl} className={style.link}>控制台</Link>}
              <Link href={learnMoreUrl} className={style.link}>了解更多</Link>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
