import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'
import Tabs, { TabPane } from 'components/UI/Tabs'

const columns: Array<ColumnProps<any>> = [
  {
    title: '每月调用量 P',
    dataIndex: 'usage'
  },
  {
    title: '机器智能审核价格',
    dataIndex: 'price'
  }
]

const data = [
  {
    key: 0,
    usage: '第 0 张 至 300 万张',
    price: '0.085 元／百张'
  },
  {
    key: 1,
    usage: '第 300 万张 至 1500 万张',
    price: '0.075 元／百张'
  },
  {
    key: 2,
    usage: '第 1500 万张 至 3000 万张',
    price: '0.065 元／百张'
  },
  {
    key: 3,
    usage: '3000 万至 1 亿张',
    price: '0.055 元／百张'
  },
  {
    key: 4,
    usage: '1 亿张以上',
    price: '0.05 元／百张'
  }
]

export default function Picture() {
  return (
    <Tabs defaultValue="1" size="middle">
      <TabPane tab="图片鉴黄" value="1"><Table bordered pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab="图片鉴暴恐" value="2"><Table bordered pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab="图片政治人物识别" value="3"><Table bordered pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab="图片广告识别" value="4"><Table bordered pagination={false} columns={columns} dataSource={data} /></TabPane>
    </Tabs>
  )
}
