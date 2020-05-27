/**
 * @file "连接数据、重塑价值"组件 index.tsx
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { HTMLAttributes } from 'react'

import { useMobile } from 'hooks/ua'
import { RawFeature } from 'components/Product/Feature'

import Section, { IndexSectionProps } from '../Section'

import styles from './style.less'

export * from 'components/Product/Feature'

type IFeatureProps = HTMLAttributes<HTMLElement> & Partial<IndexSectionProps>

export default function Feature({
  title = '功能与优势',
  children,
  grey,
  ...otherProps
}: IFeatureProps) {
  const isMobile = useMobile()
  return (
    <Section {...otherProps} grey={grey && !isMobile} title={title}>
      {
        isMobile && <div className={styles.splitLine} />
      }
      <RawFeature>{children}</RawFeature>
    </Section>
  )
}
