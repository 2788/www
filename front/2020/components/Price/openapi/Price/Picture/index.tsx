import React from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Table from 'react-icecream/lib/table'
import { ColumnProps } from 'react-icecream/esm/table'
import { useMobile } from 'hooks/ua'

export default function Picture() {
  const columns: Array<ColumnProps<any>> = [
    {
      title: '范围（张）',
      dataIndex: 'range'
    },
    {
      title: '确定部分',
      dataIndex: 'confirmed'
    },
    {
      title: '不确定部分',
      dataIndex: 'unconfirmed'
    }
  ]

  const data = [
    {
      range: '0 - 300 万',
      confirmed: '0.25 元 / 百张',
      unconfirmed: '0.0625 元 / 百张'
    },
    {
      range: '300 万 - 1500 万',
      confirmed: '0.23 元 / 百张',
      unconfirmed: '0.0575 元 / 百张'
    },
    {
      range: '1500 万 - 3000 万',
      confirmed: '0.21 元 / 百张',
      unconfirmed: '0.0525 元 / 百张'
    },
    {
      range: '> 3000 万',
      confirmed: '0.18 元 / 百张',
      unconfirmed: '0.045 元 / 百张'
    }
  ]

  // 图片广告审核
  const columns1: Array<ColumnProps<any>> = [
    {
      title: '类型',
      dataIndex: 'type'
    },
    {
      title: '价格',
      dataIndex: 'price'
    }
  ]

  // 图片广告审核
  const data1 = [
    {
      type: '图片广告审核',
      price: '1 元 / 千次'
    }
  ]

  const isMobile = useMobile()
  const prefix = isMobile ? '' : '图片'
  return (
    <Tabs defaultValue="1" size="middle">
      <TabPane tab={prefix + '鉴黄'} value="1"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab={prefix + '鉴暴恐'} value="2"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab={prefix + '广告过滤'} value="3"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab={prefix + '广告过滤增强版'} value="4"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} /></TabPane>
      <TabPane tab={prefix + '广告审核'} value="5"><Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns1} dataSource={data1} /></TabPane>
    </Tabs>
  )
}
