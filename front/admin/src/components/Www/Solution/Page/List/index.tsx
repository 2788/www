/**
 * @file 模块列表
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { Button } from 'react-icecream'
import { UpTriangleIcon, DownTriangleIcon, DeleteIcon, EditIcon } from 'react-icecream/icons'

import { SolutionModule, solutionModuleTitleMap, SolutionSection } from 'constants/solution/page'
import { SolutionInfo } from 'apis/solution'

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
  solutionInfo: SolutionInfo
  onBannerEdit(): void
  onSectionEdit(index: number): void
  /** move / remove */
  onSectionsChange(sections: SolutionSection[]): void
}

export default function List({ solutionInfo, onBannerEdit, onSectionEdit, onSectionsChange }: Props) {

  function move(index: number, offset: number) {
    const sections = [...solutionInfo.sections]
    const newIndex = index + offset
    if (newIndex < 0 || newIndex >= sections.length) {
      return
    }

    const item = sections.splice(index, 1)[0]
    sections.splice(newIndex, 0, item)
    onSectionsChange(sections)
  }

  function remove(index: number) {
    const sections = [...solutionInfo.sections]
    sections.splice(index, 1)
    onSectionsChange(sections)
  }

  return (
    <table className={styles.list}>
      <tbody>
        {solutionInfo.banner != null && (
          <Item
            name={solutionModuleTitleMap[SolutionModule.Banner]}
            onEdit={onBannerEdit}
          />
        )}
        {solutionInfo.sections.map((item, index) => (
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
