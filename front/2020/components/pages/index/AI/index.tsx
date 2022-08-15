/**
 * @file 深入音视频场景的 AI 能力
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { chunk } from 'lodash'

import { Desc, Card as UICard, Title, Row, Content, Img } from 'components/UI/Card'
import Link from 'components/Link'
import { useHoverHandlers } from 'hooks/hover'
import { useMobile } from 'hooks/ua'
import { Product, urlMap } from 'constants/products'

import Section from '../Section'
import Arrow from './images/arrow.svg'

import image1 from './images/beauty.png'
import image2 from './images/censor.png'
import image3 from './images/camera.png'
import image4 from './images/quality.png'

import styles from './style.less'

export default function AI() {
  const isMobile = useMobile()
  const cards = [
    <Card
      key="1"
      title="智能美化特效"
      desc="提供端到端智能美化特效，包括美颜滤镜、美妆美型、贴纸特效、美体、手势识别、背景分割等功能。"
      src={image1}
      link={urlMap[Product.Beautysdk]}
    />,
    <Card
      key="2"
      title="多媒体内容审核"
      desc="对图片、视频、语音、文本、直播流等进行审核，提供色情、暴恐、敏感人物、广告、水印 Logo等多种违规内容检测服务。"
      src={image2}
      link={urlMap[Product.Censor]}
    />,
    <Card
      key="3"
      title="摄像头智能识别"
      desc="摄像头视频流上云，提供基于深度学习的图像智能分析算法、智能分析处理和智能识别功能。"
      src={image3}
      link={urlMap[Product.Vii]}
    />,
    <Card
      key="4"
      title="音画质量提升"
      desc="提供一站式音画质量优化方案，精准获取音视频资源的客观质量分值，快速诊断并提升音画质量。"
      src={image4}
      link={urlMap[Product.Enhancement]}
    />
  ]
  return (
    <Section
      title="深入音视频场景的 AI 能力"
      subtitle="基于海量多媒体数据进行深度学习，提供智能图片处理、智能音视频处理、智能审核、智能识别、智能标签等产品与服务。"
      dark
    >
      {chunk(cards, isMobile ? 2 : 4)
        .map((cardChunk, index) => <Row className={styles.row} key={index}>{cardChunk}</Row>)}
    </Section>
  )
}

type Props = {
  src: string
  title: string
  desc: string
  link: string
}

function Card({ src, title, desc, link }: Props) {
  const isMobile = useMobile()
  const [hovered, setHovered] = useState(false)
  const contentDomRef = useRef<HTMLDivElement>(null)
  const [shouldActiveEllipsis, setShouldActiveEllipsis] = useState(true)
  const handles = useHoverHandlers(useCallback((_hovered: boolean) => {
    if (isMobile) return
    setHovered(_hovered)
    if (_hovered) {
      setShouldActiveEllipsis(false)
    }
  }, [isMobile]))

  // 鼠标移出的时候，等动画播放完再出 ellipsis
  useEffect(() => {
    const contentDom = contentDomRef.current
    if (contentDom == null) return
    function handle() {
      if (hovered === false) {
        setShouldActiveEllipsis(true)
      }
    }
    contentDom.addEventListener('transitionend', handle)
    return () => {
      contentDom.removeEventListener('transitionend', handle)
    }
  }, [hovered])

  const children = (
    <>
      <Img className={styles.img} src={src} />
      <Content ref={contentDomRef} className={styles.content}>
        <Title className={styles.title}>{title}</Title>
        <Desc className={classnames(styles.desc, shouldActiveEllipsis && styles.activeEllipsis)}>{desc}</Desc>
        {!isMobile && <Link href={link} blue className={styles.link}>了解更多<Arrow className={styles.arrow} /></Link>}
      </Content>
      <div className={styles.spacer} />
    </>
  )
  const mobileChildren = (
    <Link href={link}>
      <Img className={styles.img} src={src} />
      <Content ref={contentDomRef} className={styles.content}>
        <Title className={styles.title}>{title}</Title>
        <Desc className={classnames(styles.desc, shouldActiveEllipsis && styles.activeEllipsis)}>{desc}</Desc>
      </Content>
    </Link>
  )
  return (
    <UICard className={classnames(styles.card, hovered && styles.hovered)} {...handles}>
      {isMobile ? mobileChildren : children}
    </UICard>
  )
}
