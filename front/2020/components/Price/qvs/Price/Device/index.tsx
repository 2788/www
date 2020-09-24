import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'

const columns: Array<ColumnProps<any>> = [
  {
    title: '计费项',
    dataIndex: 'detail',
    width: 250
  },
  {
    title: '价格（元/月/台）',
    dataIndex: 'price',
    width: 250
  }
]

const data = [
  {
    key: 0,
    detail: '设备管理费',
    price: '2'
  }
]
const title = (
  <div>
    基本描述：使用国标协议进行接入将会产生设备管理费
  </div>
)
const footer = (
  <div>
    计费规则：<br />
    1. 以每月接入国标设备的并发台数峰值计费。<br />
    2. 仅对国标设备计费，RTMP 接入无设备管理费。<br />
    3. 设备成功注册且处于在线保活状态会被计费，与设备流是否在线无关。<br />
    4. 通过 NVR 接入的摄像头会按摄像头数目收设备管理费。<br />
    5. 计费周期：按月出账，具体出账时间以系统为准。<br />
  </div>
)

export default function Device() {
  return <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} title={() => title} footer={() => footer} />
}
