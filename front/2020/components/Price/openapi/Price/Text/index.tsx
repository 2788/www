import React from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Table from 'react-icecream/lib/table'
import { ColumnProps } from 'react-icecream/esm/table'

export default function Text() {
  const columns: Array<ColumnProps<any>> = [
    {
      title: '调用量（ 次/月）',
      dataIndex: 'request_num'
    },
    {
      title: '单价（元/千次）',
      dataIndex: 'price'
    }
  ]

  // 文本反垃圾
  const data1 = [
    {
      key: 1,
      request_num: '< 15 万',
      price: '1.38'
    },
    {
      key: 2,
      request_num: '< 150 万',
      price: '1.3'
    },
    {
      key: 3,
      request_num: '< 500 万',
      price: '1.22'
    },
    {
      key: 4,
      request_num: '< 1000 万',
      price: '1.15'
    },
    {
      key: 5,
      request_num: '< 2000 万',
      price: '1.08'
    },
    {
      key: 6,
      request_num: '2000 万条以上',
      price: '1'
    }
  ]

  // 文本鉴黄鉴政 垃圾评论过滤
  const data2 = [
    {
      key: 1,
      request_num: '0 - 20 万（含）',
      price: '1.8'
    },
    {
      key: 2,
      request_num: '20 - 500 万（含）',
      price: '1.5'
    },
    {
      key: 3,
      request_num: '> 500 万',
      price: '1.2'
    }
  ]

  return (
    <Tabs defaultValue="1" size="middle">
      <TabPane tab="文本反垃圾" value="1"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data1} /></TabPane>
      <TabPane tab="文本鉴黄鉴政" value="2"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data2} /></TabPane>
      <TabPane tab="垃圾评论过滤" value="3"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data2} /></TabPane>
    </Tabs>
  )
}
