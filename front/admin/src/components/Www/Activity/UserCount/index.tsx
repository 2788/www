import React, { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'
import { useInjection } from 'qn-fe-core/di'
import { Button, Modal } from 'react-icecream'
import XLSX from 'xlsx'

import { IUser } from 'apis/activity'
import { timeFormatter } from 'utils/time'
import ActivityStore from '../store'

interface IProps {
  id: string
}

const filenName = '活动报名人员信息表.xlsx'
const header = ['userName', 'phoneNumber', 'email', 'company', 'createdAt']
// 展示的名称
const headerDisplay = ['姓名', '手机号', '邮箱', '公司', '报名时间']
// 每列显示宽度
const cols = [{ wpx: 120 }, { wpx: 120 }, { wpx: 200 }, { wpx: 300 }, { wpx: 150 }]

export default observer(function UserCount({ id }: IProps) {
  const [total, setTotal] = useState(0)
  const activityStore = useInjection(ActivityStore)

  useEffect(() => {
    activityStore.getUserCount(id).then(count => {
      setTotal(count)
    })
  }, [activityStore, id])

  const handleClick = useCallback(
    () => {
      Modal.confirm({
        title: '确定下载报名人员信息表？',
        onOk: () => {
          activityStore.getAllUsers(id, total).then(res => {
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
function genSheetData(users: IUser[]) {
  const res = [headerDisplay]
  for (const user of users) {
    const arr: string[] = []
    for (const i of header) {
      if (i === 'createdAt') {
        arr.push(user.createdAt ? timeFormatter('YYYY-MM-DD HH:mm')(user.createdAt) : '')
        continue
      }
      arr.push(user[i] || '')
    }
    res.push(arr)
  }
  return res
}
