import React, { useCallback, useEffect, useRef, useState } from 'react'
import cls from 'classnames'
import { chunk } from 'lodash'

import { Card as UICard, Title, Desc, Row as UIRow } from 'components/UI/Card'
import Link from 'components/Link'
import { useHoverHandlers } from 'hooks/hover'
import { useOnChange } from 'hooks'
import useIsomorphicLayoutEffect from 'hooks/use-isomorphic-layout-effect'
import { useUa } from 'hooks/ua'

import { cardData, CardProps } from '../constants'
import Arrow from '../images/arrow.svg'
import style from './style.less'

export default function Pc() {
  return (
    <div className={style.wrapper}>
      {
        chunk(cardData, 4).map((group, i) => <Row key={i} index={i} cardProps={group} />)
      }
    </div>
  )
}

function Row({ cardProps, index: rowIndex }: { cardProps: CardProps[], index: number }) {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(-1)
  return (
    <UIRow className={rowIndex === 1 && style.row2 || undefined}>
      {
        cardProps.map((item, index) => (
          <Card
            {...item}
            key={index}
            index={index}
            // 第二排第二个默认展开
            defaultExpanded={rowIndex === 1 && index === 1}
            hoveredCardIndex={hoveredCardIndex}
            onHovered={setHoveredCardIndex}
          />
        ))
      }
    </UIRow>
  )
}

const expandedWidth = '430px'
const expandedWidthOfLarge = '500px'

type Props = CardProps & {
  defaultExpanded?: boolean
  index: number
  hoveredCardIndex: number
  onHovered(cardIndex: number): void
}
function Card(props: Props) {
  const {
    defaultExpanded = false, url, title, desc, backgroundImgUrl, icon, cases, index, hoveredCardIndex,
    onHovered
  } = props
  const { isPcLg } = useUa()
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<'small' | 'normal' | 'large'>('normal')
  const [initWidth, setInitWidth] = useState<number>()
  const hoverHandlers = useHoverHandlers(useCallback((hovered: boolean) => {
    if (hovered) {
      onHovered(index)
    } else {
      onHovered(-1)
    }
  }, [index, onHovered]))
  const hovered = index === hoveredCardIndex

  useOnChange(() => {
    // hover 的是自己
    if (hovered) {
      setSize('large')
      // 没有任何一个被 hover
    } else if (hoveredCardIndex === -1) {
      setSize('normal')
    } else {
      setSize('small')
    }
  }, [hovered, hoveredCardIndex])

  useIsomorphicLayoutEffect(() => {
    if (ref.current == null) return
    // cardWrapper 用的 content box，为了和稿子保持一致，需要去掉间距
    setInitWidth(ref.current.offsetWidth - getPaddingSpace(index))
  }, [index])

  useEffect(() => {
    if (defaultExpanded) {
      onHovered(index)
    }
  }, [defaultExpanded, index, onHovered])
  const nextWidth = (() => {
    if (hovered) {
      if (isPcLg) {
        return expandedWidthOfLarge
      }
      return expandedWidth
    }
    return initWidth
  })()

  return (
    <div
      ref={ref}
      className={style.cardWrapper}
      {...hoverHandlers}
      style={{ flexBasis: nextWidth, flexShrink: hovered ? 0 : 1 }}
    >
      <UICard className={style.card}>
        <div className={style.backIcon} style={{ backgroundImage: `url("${icon}")` }} />
        <div className={cls(style.backImage, hovered && style.show)} style={{ backgroundImage: `url("${backgroundImgUrl}")` }} />
        <div className={cls(style.mask, hovered && style.show)} />
        <Title className={cls(style.title, hovered && style.hide)}>{title}</Title>
        <Title className={cls(style.titleOnHover, hovered && style.show)}>
          {url != null ? (
            <Link className={style.link} href={url}>{title} <Arrow className={style.arrow} /></Link>
          ) : title}
        </Title>
        <Desc className={cls(style.desc, size === 'normal' ? style.show : style.hide)}>{desc}</Desc>
        <Desc className={cls(style.fullDesc, size === 'large' && style.show)}>{desc}</Desc>
        <Desc className={cls(style.smallDesc, size === 'small' && style.show)}>{desc}</Desc>
        <div className={cls(style.icons, hovered && style.show)}>
          {cases.map((caseIcon, i) => <img key={i} className={style.icon} src={caseIcon} />)}
        </div>
      </UICard>
    </div>
  )
}

// 和 css 的间距保持同步，懒得算了
function getPaddingSpace(index: number) {
  if (index === 0) return 10
  if (index === 3) return 10
  return 20
}
