import React from 'react'
import Table, { ColumnProps } from 'react-icecream/lib/table'
import Tabs, { TabPane } from 'components/UI/Tabs'

import style from './index.less'

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

export default function Video() {
  return (
    <Tabs defaultValue="1" size="middle">
      <TabPane tab="点播视频鉴黄" value="1">
        <p className={style.alert}>点播视频鉴黄是对视频截帧后，对截帧进行图片鉴黄，所以点播视频鉴黄价格实际使用的是截帧图片鉴黄的价格，与图片鉴黄共用范围。</p>
        <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} />
      </TabPane>
      <TabPane tab="点播视频鉴暴恐" value="2"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab="点播视频政治人物识别" value="3"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} /></TabPane>
    </Tabs>
  )
}
