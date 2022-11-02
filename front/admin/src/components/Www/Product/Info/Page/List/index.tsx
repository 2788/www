/**
 * @file 模块列表
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { Button } from 'react-icecream-2'
import { UpTriangleIcon, DownTriangleIcon, DeleteIcon, EditIcon } from 'react-icecream-2/icons'

import { ProductModule, productModuleTitleMap } from 'constants/product/page'
import { ProductInfo } from 'apis/product/info'

import styles from './style.m.less'

export interface ItemProps {
  name: string
  onEdit(): void
  onRemove?(): void
  onMove?(offset: number): void
}

function Item({ name, onEdit, onRemove, onMove }: ItemProps) {
  return (
    <tr>
      <td>{name}</td>
      <td className={styles.btns}>
        <Button type="link" icon={<EditIcon />} onClick={() => { onEdit() }} />
        {onMove != null && (
          <>
            <Button type="link" icon={<UpTriangleIcon />} onClick={() => { onMove(-1) }} />
            <Button type="link" icon={<DownTriangleIcon />} onClick={() => { onMove(1) }} />
          </>
        )}
        {onRemove != null && (
          <Button type="link" icon={<DeleteIcon />} onClick={() => { onRemove() }} />
        )}
      </td>
    </tr>
  )
}

export interface Props {
  productInfo: ProductInfo
  onProductInfoChange(productInfo: ProductInfo): void
  onBannerEdit(): void
  onSectionEdit(index: number): void
}

export default function List({ productInfo, onProductInfoChange, onBannerEdit, onSectionEdit }: Props) {

  function move(index: number, offset: number) {
    const sections = [...productInfo.sections]
    const newIndex = index + offset
    if (newIndex < 0 || newIndex >= sections.length) {
      return
    }

    const item = sections.splice(index, 1)[0]
    sections.splice(newIndex, 0, item)

    const result = {
      ...productInfo,
      sections
    }
    onProductInfoChange(result)
  }

  function remove(index: number) {
    const sections = [...productInfo.sections]
    sections.splice(index, 1)
    const result = {
      ...productInfo,
      sections
    }
    onProductInfoChange(result)
  }

  return (
    <table className={styles.list}>
      <tbody>
        {productInfo.banner != null && (
          <Item
            name={productModuleTitleMap[ProductModule.Banner]}
            onEdit={onBannerEdit}
          />
        )}
        {productInfo.sections.map((item, index) => (
          <Item
            key={item.name}
            name={item.title}
            onEdit={() => { onSectionEdit(index) }}
            onMove={offset => { move(index, offset) }}
            onRemove={() => { remove(index) }}
          />
        ))}
      </tbody>
    </table>
  )
}
