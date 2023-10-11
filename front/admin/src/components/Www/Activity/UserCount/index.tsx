import React, { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { Button, Modal } from 'react-icecream-1'
import XLSX from 'xlsx'
import { useInjection } from 'qn-fe-core/di'

import { IRegistration } from 'apis/activity/market'
import { timeFormatter } from 'utils/time'

import ActivityStore from '../store'

interface IProps {
  id: string
}

const filenName = '活动报名人员信息表.xlsx'

const headerKeyName = {
  userName: '姓名',
  phoneNumber: '手机号',
  email: '邮箱',
  referrer: '报名来源地址',
  location: '所在地',
  createdAt: '报名时间',
  checkedIn: '是否已签到'
}

// 每列显示宽度
const cols = [
  { wpx: 120 }, { wpx: 120 }, { wpx: 200 }, { wpx: 300 }, { wpx: 150 },
  { wpx: 300 }, { wpx: 120 }, { wpx: 200 }, { wpx: 150 }, { wpx: 150 }, { wpx: 150 }
]

export default observer(function UserCount({ id }: IProps) {
  const [total, setTotal] = useState(0)
  const activityStore = useInjection(ActivityStore)

  useEffect(() => {
    activityStore.getRegistrationsCount(id).then(count => {
      setTotal(count)
    })
  }, [activityStore, id])

  const handleClick = useCallback(
    () => {
      Modal.confirm({
        title: '确定下载报名人员信息表？',
        onOk: () => {
          activityStore.getRegistrations(id, total).then(res => {
            const wb = XLSX.utils.book_new()
            const ws = XLSX.utils.aoa_to_sheet(genSheetData(res))
            ws['!cols'] = cols
            XLSX.utils.book_append_sheet(wb, ws)  // 将数据添加到工作薄
            XLSX.writeFile(wb, filenName) // 导出Excel
          })
        }
      })
    },
    [activityStore, id, total]
  )
  return (
    <Button type="link" title="下载" onClick={handleClick}>{total}</Button>
  )
})

// 生成表格所需的 data
function genSheetData(registrations: IRegistration[]) {
  const header = Object.values(headerKeyName)
  const res = [header] // 第一行为表头

  // 先处理基本字段
  for (const registration of registrations) {
    const arr: string[] = []

    for (const i of Object.keys(headerKeyName)) {
      if (i === 'createdAt') {
        arr.push(registration.createdAt ? timeFormatter('YYYY-MM-DD HH:mm')(registration.createdAt) : '')
        continue
      }

      if (i === 'checkedIn') {
        arr.push(registration.checkedIn ? '是' : '否')
        continue
      }
      arr.push(registration[i] || '')
    }

    // 处理自定义表单字段
    if (registration.extraForm != null) {
      for (const key in registration.extraForm) {
        if (Object.prototype.hasOwnProperty.call(registration.extraForm, key)) {
          const element = registration.extraForm[key]
          if (!header.includes(key)) header.push(key)
          const index = header.findIndex(k => k === key)
          arr[index] = element
        }
      }
    }

    res.push(arr)
  }

  return res
}
