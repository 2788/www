/**
 * @file 模块列表
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { Button } from 'react-icecream'
import { UpTriangleIcon, DownTriangleIcon, DeleteIcon, EditIcon } from 'react-icecream/icons'

import { ProductModule, productModuleTitleMap, ProductSection } from 'constants/product/page'
import { ProductInfo } from 'apis/product/info'

import styles from './style.m.less'

export interface ItemProps {
  name: string
  onEdit?(): void
  onRemove?(): void
  onMove?(offset: number): void
}

function Item({ name, onEdit, onRemove, onMove }: ItemProps) {
  return (
    <tr>
      <td>{name}</td>
      <td className={styles.btns}>
        <Button
          type="link"
          icon={<EditIcon />}
          onClick={() => { onEdit?.() }}
          className={onEdit ? undefined : styles.hide}
        />
        <Button
          type="link"
          icon={<UpTriangleIcon />}
          onClick={() => { onMove?.(-1) }}
          className={onMove ? undefined : styles.hide}
        />
        <Button
          type="link"
          icon={<DownTriangleIcon />}
          onClick={() => { onMove?.(1) }}
          className={onMove ? undefined : styles.hide}
        />
        <Button
          type="link"
          icon={<DeleteIcon />}
          onClick={() => { onRemove?.() }}
          className={onRemove ? undefined : styles.hide}
        />
      </td>
    </tr>
  )
}

export interface Props {
  productInfo: ProductInfo
  onBannerEdit(): void
  onUsageGuideEdit(): void
  onUsageGuideRemove(): void
  onSectionEdit(index: number): void
  /** move / remove */
  onSectionsChange(sections: ProductSection[]): void
}

export default function List({
  productInfo, onBannerEdit, onUsageGuideEdit, onUsageGuideRemove, onSectionEdit, onSectionsChange
}: Props) {

  function move(index: number, offset: number) {
    const sections = [...productInfo.sections]
    const newIndex = index + offset
    if (newIndex < 0 || newIndex >= sections.length) {
      return
    }

    const item = sections.splice(index, 1)[0]
    sections.splice(newIndex, 0, item)
    onSectionsChange(sections)
  }

  function remove(index: number) {
    const sections = [...productInfo.sections]
    sections.splice(index, 1)
    onSectionsChange(sections)
  }

  return (
    <table className={styles.list}>
      <tbody>
        {productInfo.banner != null && (
          <Item
            name={productModuleTitleMap[ProductModule.Banner]}
            onEdit={() => { onBannerEdit() }}
          />
        )}
        {productInfo.sections.map((item, index) => (
          <Item
            key={item.name}
            name={item.title}
            onEdit={item.name === ProductModule.News ? undefined : () => { onSectionEdit(index) }}
            onMove={offset => { move(index, offset) }}
            onRemove={() => { remove(index) }}
          />
        ))}
        {productInfo.usageGuide != null && (
          <Item
            name={productModuleTitleMap[ProductModule.UsageGuide]}
            onEdit={() => { onUsageGuideEdit() }}
            onRemove={() => { onUsageGuideRemove() }}
          />
        )}
      </tbody>
    </table>
  )
}
