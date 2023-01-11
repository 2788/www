/**
 * @file: 视频智能分析 产品功能
 * @author hovenjay <hovenjay@qiniu.com>
 */

import React from 'react'
import { useMobile } from 'hooks/ua'
import { Card } from 'components/UI/Card'
import Button from 'components/UI/Button'
import Feature, { Item, Desc, Link, Group, Icon } from 'components/Product/Feature'
import featureIcon1 from './feature1.png'
import featureIcon2 from './feature2.png'
import styles from './style.less'

interface IFeatureItem {
  key: string
  icon: React.SVGAttributes<SVGElement>
  title: string
  desc: string
  moreUrl: string
}

interface IFeatureGroup {
  key: string
  children: IFeatureItem[]
}

const featureGroups: IFeatureGroup[] = [
  {
    key: 'feature-group-1',
    children: [
      {
        key: 'feature-1-1',
        icon: (<Icon src={featureIcon1} />),
        title: '智能视频/图片标签',
        desc: '通过视频/图片数据的分析挖掘，准确识别视频/图片所包含的内容信息，提取为标签。',
        moreUrl: 'https://developer.qiniu.com/dora/7045/image-video-tag'
      }, {
        key: 'feature-1-2',
        icon: (<Icon src={featureIcon2} />),
        title: '语音识别',
        desc: '将已经录制完成的录音文件，识别为文字。',
        moreUrl: 'https://developer.qiniu.com/dora/api/7099/ali-audio-trans'
      }
    ]
  }
]

export function ForPc({ icon, title, desc, moreUrl }: IFeatureItem) {
  return (
    <Card className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <div className={styles.featureContent}>
        <div className={styles.featureTitle}>{title}</div>
        <div className={styles.featureDesc}>{desc}</div>
        <Button
          href={moreUrl}
          type="hollow"
          target="_blank"
          withBorder
          style={{ width: 'auto', marginTop: '16px', padding: '0 15px' }}
        >
          了解更多
        </Button>
      </div>
    </Card>
  )
}

export function ForMobile({ icon, title, desc, moreUrl }: IFeatureItem) {
  return (
    <Item icon={icon} title={title} pos="left-right">
      <Desc>{desc}</Desc>
      <Link href={moreUrl}>了解更多</Link>
    </Item>
  )
}

export default function Features() {
  const isMobile = useMobile()

  return (
    <Feature name="feature" title="产品功能">
      {featureGroups.map(({ key: groupKey, children }: IFeatureGroup) => (
        <Group key={groupKey}>
          {children.map((item: IFeatureItem) => (
            isMobile ? <ForMobile {...item} /> : <ForPc {...item} />
          ))}
        </Group>
      ))}
    </Feature>
  )
}
