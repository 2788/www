/**
 * @file 产品页功能与优势卡片样式的 Item 组件
 * @description 该组件仅用于 pc 端。支持添加链接按钮
 * @author wangbingyue
 */
import React, { HTMLAttributes, ReactNode } from 'react'
import { Card } from 'components/UI/Card'
import Button, { Props as ButtonProps } from 'components/UI/Button'
import style from './style.less'

export type LinkItem = {
  text: string
  type: ButtonProps['type']
  url: string
}

export interface ICardFeatureItem extends HTMLAttributes<HTMLElement> {
  icon: ReactNode
  title: string
  desc: string
  links?: LinkItem[]
}

export default function CardFeatureItem(props: ICardFeatureItem) {
  const { icon, title, desc, links } = props
  const className = [
    style.card,
    props.className
  ].filter(Boolean).join(' ')
  return (
    <Card className={className}>
      <div className={style.cardFeatureItem}>
        <div className={style.cardIcon}>{icon}</div>
        <p className={style.cardTittle}>{title}</p>
        <p className={style.cardDesc}>{desc}</p>
        {
          links && links.length > 0 && (
            <div className={style.buttonsContainer}>
              {links.map((item, index) => (
                <Button type={item.type} href={item.url} key={index} withBorder={item.type !== 'primary'} className={style.button}>
                  {item.text}
                </Button>
              ))}
            </div>
          )
        }
      </div>
    </Card>
  )
}
