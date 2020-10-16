import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'
import Tabs, { TabPane } from 'components/UI/Tabs'

const columns: Array<ColumnProps<any>> = [
  {
    title: '每月调用量 P',
    dataIndex: 'usage'
  },
  {
    title: '价格',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 0,
    usage: '第 0 张 至 300 万张',
    price: '0.18 元／百张'
  },
  {
    key: 1,
    usage: '第 300 万张 至 1500 万张',
    price: '0.16 元／百张'
  },
  {
    key: 2,
    usage: '第 1500 万张 至 3000 万张',
    price: '0.15 元／百张'
  },
  {
    key: 3,
    usage: '3000 万张以上',
    price: '0.13 元／百张'
  }
]

const audioColumns: Array<ColumnProps<any>> = [
  {
    title: '计费项名称',
    dataIndex: 'name'
  },
  {
    title: '调用量阶梯',
    dataIndex: 'ladder'
  },
  {
    title: '价格',
    dataIndex: 'price'
  }
]

const audioData = [
  {
    key: 0,
    name: '直播音频反垃圾',
    ladder: '无阶梯',
    price: '0.02 元/分钟'
  }
]

export default function Picture() {
  return (
    <Tabs defaultValue="1" size="middle">
      <TabPane tab="直播视频鉴黄" value="1"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab="直播视频鉴暴恐" value="2"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab="直播视频政治人物识别" value="3"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab="直播视频图文违规识别" value="4"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab="直播音频反垃圾" value="5"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={audioColumns} dataSource={audioData} /></TabPane>
    </Tabs>
  )
}
