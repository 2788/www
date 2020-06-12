import React from 'react'
import PricePane, { PricePaneSection } from 'components/Price/Banner/PricePane'
import Table, { ColumnProps } from 'react-icecream/lib/table'
import Tabs, { TabPane } from 'components/UI/Tabs'

import style from './index.less'

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

const data1 = [
  {
    key: 0,
    type: '人脸对比',
    price: '0.006 元/次'
  },
  {
    key: 1,
    type: '光线活体检测',
    price: '0.12 元/次'
  },
  {
    key: 2,
    type: '防翻拍活体检测',
    price: '0.12 元/次'
  },
  {
    key: 3,
    type: '动作活体检测',
    price: '0.12 元/次'
  },
  {
    key: 4,
    type: '公安核验',
    price: '1 元/次'
  },
  {
    key: 5,
    type: '身份证识别 OCR',
    price: '0.03 元/次'
  }
]

const columns2: Array<ColumnProps<any>> = [
  {
    title: '类型',
    dataIndex: 'type',
    render(type, _, idx) {
      if (idx === 0) {
        return { children: type, props: { rowSpan: 4 } }
      }

      return { children: type, props: { rowSpan: 0 } }
    }
  },
  {
    title: '每月调用量 P',
    dataIndex: 'usage'
  },
  {
    title: '价格',
    dataIndex: 'price'
  }
]

const data2 = [
  {
    key: 0,
    type: '1:N 人脸比对',
    usage: '第 0 张 至 500 万张',
    price: '0.19 元/百张'
  },
  {
    key: 1,
    type: '1:N 人脸比对',
    usage: '第 500 万张 至 1500 万张',
    price: '0.18 元/百张'
  },
  {
    key: 2,
    type: '1:N 人脸比对',
    usage: '第 1500 万张 至 3000 万张',
    price: '0.15 元/百张'
  },
  {
    key: 3,
    type: '1:N 人脸比对',
    usage: '3000 万张以上',
    price: '0.12 元/百张'
  }
]

export default function Price() {
  return (
    <PricePane>
      <PricePaneSection title="价格详情" className={style.mode}>
        <Tabs defaultValue="1" size="middle">
          <TabPane value="1" tab="人脸核验">
            <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns1} dataSource={data1} />
          </TabPane>
          <TabPane value="2" tab="人脸识别技术">
            <Table bordered scroll={{ x: 'max-content' }} columns={columns2} dataSource={data2} pagination={false} />
          </TabPane>
        </Tabs>
      </PricePaneSection>
    </PricePane>
  )
}
