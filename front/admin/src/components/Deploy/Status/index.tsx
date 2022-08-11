/**
 * @file 线上状态监测
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useEffect, useState } from 'react'

import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'
import { Button, NumberInput } from 'react-icecream-2'

import { wwwSourceHost, wwwHost } from 'constants/env'
import WwwApis from 'apis/refresh/www'

import style from './style.m.less'

type Status = boolean | undefined | null

function showStatus(status: Status) {
  if (status === undefined) {
    return '-'
  }

  if (status === null) {
    return '?'
  }

  return status ? '✔️' : '✗'
}

function SourceMonitor() {
  const wwwApis = useInjection(WwwApis)

  const [status, setStatus] = useState<Status>(undefined)
  const [time, setTime] = useState<string>('')
  const [failList, setFailList] = useState<string[]>([])

  useEffect(() => {
    function check() {
      wwwApis.sourceTest(['/']).then(
        () => {
          setStatus(true)
          setTime(new Date().toLocaleTimeString())
        },
        () => {
          setStatus(false)

          const now = new Date().toLocaleTimeString()
          setTime(now)
          setFailList(prev => [...prev, now])

          Notification.requestPermission().then(result => {
            if (result === 'granted') {
              // eslint-disable-next-line no-new
              new Notification('官网源站挂了？')
            }
          })
        }
      )
    }

    check()

    const id = setInterval(check, 60 * 1000)
    return () => { clearInterval(id) }
  }, [wwwApis])

  return (
    <div>
      <p>源站服务实时状态：{showStatus(status)} {time}</p>
      <p>源站服务失败统计（{failList.length}）：{failList.join(', ')}</p>
    </div>
  )
}

function Diff() {
  const toasterStore = useInjection(ToasterStore)
  const wwwApis = useInjection(WwwApis)

  const [allPaths, setAllPaths] = useState<string[]>([])
  const [statusList, setStatusList] = useState<Status[]>([])

  const [startNum, setStartNum] = useState<number | null>(1)
  const [endNum, setEndNum] = useState<number | null>(20)

  useEffect(() => { setEndNum(allPaths.length) }, [allPaths.length])

  useEffect(() => {
    toasterStore.promise(
      wwwApis.getPathsFromSitemap().then(paths => {
        setAllPaths(['/', '/sitemap.xml', '/errno-404', ...paths])
      })
    )
  }, [toasterStore, wwwApis])

  async function checkAll() {
    let newStatusList = [...statusList]

    if (!startNum || !endNum || startNum < 1 || endNum > allPaths.length || startNum > endNum) {
      toasterStore.error('请检查范围')
      return
    }

    for (const [index, path] of allPaths.entries()) {
      if (index < startNum - 1 || index >= endNum) {
        continue
      }

      newStatusList = [...newStatusList]
      newStatusList[index] = undefined
      setStatusList(newStatusList)

      try {
        // eslint-disable-next-line no-await-in-loop
        const sourceResult = await wwwApis.getContent(wwwSourceHost + path)
        // eslint-disable-next-line no-await-in-loop
        const targetResult = await wwwApis.getContent(wwwHost + path)

        newStatusList = [...newStatusList]
        if (typeof sourceResult === 'string' && typeof targetResult === 'string') {
          newStatusList[index] = sourceResult === targetResult
        } else {
          newStatusList[index] = null
        }
        setStatusList(newStatusList)
      } catch (err: unknown) {
        toasterStore.exception(err)
      }
    }
  }

  if (allPaths.length === 0) {
    return null
  }

  return (
    <div className={style.wrapper}>
      <div className={style.panel}>
        从 <NumberInput value={startNum} onChange={setStartNum} />
        到 <NumberInput value={endNum} onChange={setEndNum} />
        <Button type="primary" onClick={() => { checkAll() }}>开始比对主体内容：</Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Path</th>
            <th>Source</th>
            <th>Target</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allPaths.map((path, index) => (
            <tr key={path}>
              <td>{index + 1}</td>
              <td>{path}</td>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <td><a href={wwwSourceHost + path} target="_blank">源站</a></td>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <td><a href={wwwHost + path} target="_blank">主站</a></td>
              <td>{showStatus(statusList[index])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function StatusPage() {
  return (
    <div className={style.wrapper}>
      <SourceMonitor />
      <hr />
      <Diff />
    </div>
  )
}
