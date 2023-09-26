/**
 * @file 模块列表
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { Button } from 'react-icecream'
import { UpTriangleIcon, DownTriangleIcon, DeleteIcon, EditIcon } from 'react-icecream/icons'

import { IActivity } from 'apis/activity/market'
import { ActivitySection, activityComponentNameTitleMap } from 'constants/activity/page'

import styles from './style.m.less'
import { ActivityComponentName } from 'constants/activity/page/comp-common'

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
  activity: IActivity
  onBannerEdit(): void
  onUsageGuideEdit(): void
  onUsageGuideRemove(): void
  onSectionEdit(index: number): void
  /** move / remove */
  onSectionsChange(sections: ActivitySection[]): void
}

export default function List({
  activity, onBannerEdit, onUsageGuideEdit, onUsageGuideRemove, onSectionEdit, onSectionsChange
}: Props) {

  function move(index: number, offset: number) {
    const sections = [...(activity.page?.sections || [])]
    const newIndex = index + offset
    if (newIndex < 0 || newIndex >= sections.length) {
      return
    }

    const item = sections.splice(index, 1)[0]
    sections.splice(newIndex, 0, item)
    onSectionsChange(sections)
  }

  function remove(index: number) {
    const sections = [...(activity.page?.sections || [])]
    sections.splice(index, 1)
    onSectionsChange(sections)
  }

  return (
    <table className={styles.list}>
      <tbody>
        {activity.page?.banner != null && (
          <Item
            name={activityComponentNameTitleMap[ActivityComponentName.Banner]}
            onEdit={() => { onBannerEdit() }}
          />
        )}
        {(activity.page?.sections || []).map((item, index) => (
          <Item
            key={index}
            name={item.title || item.component.name}
            onEdit={() => { onSectionEdit(index) }}
            onMove={offset => { move(index, offset) }}
            onRemove={() => { remove(index) }}
          />
        ))}
        {activity.page?.usageGuide != null && (
          <Item
            name={activityComponentNameTitleMap[ActivityComponentName.UsageGuide]}
            onEdit={() => { onUsageGuideEdit() }}
            onRemove={() => { onUsageGuideRemove() }}
          />
        )}
      </tbody>
    </table>
  )
}
