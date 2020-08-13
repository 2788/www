import React from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Table from 'react-icecream/lib/table'
import { ColumnProps } from 'react-icecream/esm/table'

export default function PictureProcess() {
  const columns: Array<ColumnProps<any>> = [
    {
      title: '调用量（ 次/月）',
      dataIndex: 'request_num'
    },
    {
      title: '单价（元／次）',
      dataIndex: 'price'
    }
  ]

  // 风格迁移
  const data1 = [
    {
      key: 1,
      request_num: '≤ 5 万',
      price: '0.09'
    },
    {
      key: 2,
      request_num: '≤ 30 万',
      price: '0.085'
    },
    {
      key: 3,
      request_num: '≤ 100 万',
      price: '0.08'
    },
    {
      key: 4,
      request_num: '100 万条以上',
      price: '0.075'
    }
  ]

  // 人像分割
  const data2 = [
    {
      key: 1,
      request_num: '≤ 5 万',
      price: '0.051'
    },
    {
      key: 2,
      request_num: '≤ 30 万',
      price: '0.046'
    },
    {
      key: 3,
      request_num: '≤ 100 万',
      price: '0.042'
    },
    {
      key: 4,
      request_num: '100 万条以上',
      price: '0.037'
    }
  ]

  // 实例分割
  const data3 = [
    {
      request_num: '≤ 5 万',
      price: '0.083'
    },
    {
      request_num: '≤ 30 万',
      price: '0.078'
    },
    {
      request_num: '≤ 100 万',
      price: '0.073'
    },
    {
      request_num: '100 万条以上',
      price: '0.068'
    }
  ]

  // 智能填充
  const data4 = [
    {
      request_num: '≤ 5 万',
      price: '0.043'
    },
    {
      request_num: '≤ 30 万',
      price: '0.038'
    },
    {
      request_num: '≤ 100 万',
      price: '0.033'
    },
    {
      request_num: '100 万条以上',
      price: '0.028'
    }
  ]

  return (
    <Tabs defaultValue="1" size="middle">
      <TabPane tab="风格迁移" value="1"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data1} /></TabPane>
      <TabPane tab="人像分割" value="2"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data2} /></TabPane>
      <TabPane tab="实例分割" value="3"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data3} /></TabPane>
      <TabPane tab="智能填充" value="4"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data4} /></TabPane>
    </Tabs>
  )
}
