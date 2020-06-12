import React from 'react'
import { Table } from 'react-icecream'
import { ColumnProps } from 'react-icecream/lib/table'

// col 列数，从 1 开始
function renderPrice(col: number) {
  return (price: number, _: any, idx: number) => {
    if (idx === 0 || idx === 4 || idx === 8) {
      if (col === 3) {
        return { children: price, props: { colSpan: 5 } }
      }

      return { children: price, props: { colSpan: 0 } }
    }

    return price
  }
}

const columns: Array<ColumnProps<any>> = [
  {
    title: '名目',
    dataIndex: 'name',
    render(name, __, idx) {
      if (idx === 0) {
        return { children: name, props: { rowSpan: 5 } }
      }

      if (idx === 5) {
        return { children: name, props: { rowSpan: 4 } }
      }

      return { children: name, props: { rowSpan: 0 } }
    }
  },
  {
    title: '流量阶梯/月',
    dataIndex: 'bandwidth'
  },
  {
    title: '亚洲(港澳台/东南亚/印度)',
    dataIndex: 'price_asian',
    render: renderPrice(3)
  },
  {
    title: '亚洲(其他地区)',
    dataIndex: 'price_asian_other',
    render: renderPrice(4)
  },
  {
    title: '欧洲/北美洲',
    dataIndex: 'price_eu',
    render: renderPrice(5)
  },
  {
    title: '南美洲',
    dataIndex: 'price_sa',
    render: renderPrice(6)
  },
  {
    title: '大洋洲与其他',
    dataIndex: 'price_oc',
    render: renderPrice(7)
  }
]

const data = [
  {
    key: '1',
    name: 'HTTP 下载流量/动态加速 HTTP 流量',
    bandwidth: '第 0 GB 至 10 GB',
    price_asian: '免费（仅限 HTTP 下载流量）',
    price_asian_other: '免费（仅限 HTTP 下载流量）',
    price_eu: '免费（仅限 HTTP 下载流量）',
    price_sa: '免费（仅限 HTTP 下载流量）',
    price_oc: '免费（仅限 HTTP 下载流量）'
  },
  {
    key: '2',
    name: 'HTTP 下载流量/动态加速 HTTP 流量',
    bandwidth: '第 10 GB 至 10 TB',
    price_asian: '0.76 元/GB',
    price_asian_other: '0.50 元/GB',
    price_eu: '0.34 元/GB',
    price_sa: '0.76 元/GB',
    price_oc: '0.94 元/GB'
  },
  {
    key: '3',
    name: 'HTTP 下载流量/动态加速 HTTP 流量',
    bandwidth: '第 10 TB 至 50 TB',
    price_asian: '0.66 元/GB',
    price_asian_other: '0.44 元/GB',
    price_eu: '0.30 元/GB',
    price_sa: '0.66 元/GB',
    price_oc: '0.82 元/GB'
  },
  {
    key: '4',
    name: 'HTTP 下载流量/动态加速 HTTP 流量',
    bandwidth: '第 50 TB 至 100 TB',
    price_asian: '0.57 元/GB',
    price_asian_other: '0.38 元/GB',
    price_eu: '0.26 元/GB',
    price_sa: '0.57 元/GB',
    price_oc: '0.71 元/GB'
  },
  {
    key: '5',
    name: 'HTTP 下载流量/动态加速 HTTP 流量',
    bandwidth: '第 100 TB 以上',
    price_asian: '请联系我们 400-808-9176 转 1',
    price_asian_other: '请联系我们 400-808-9176 转 1',
    price_eu: '请联系我们 400-808-9176 转 1',
    price_sa: '请联系我们 400-808-9176 转 1',
    price_oc: '请联系我们 400-808-9176 转 1'
  },
  {
    key: '6',
    name: 'HTTPS 下载流量/动态加速 HTTPS 流量',
    bandwidth: '第 0 GB 至 10 TB',
    price_asian: '0.91 元/GB',
    price_asian_other: '0.60 元/GB',
    price_eu: '0.40 元/GB',
    price_sa: '0.91 元/GB',
    price_oc: '1.12 元/GB'
  },
  {
    key: '7',
    name: 'HTTPS 下载流量/动态加速 HTTPS 流量',
    bandwidth: '第 10 TB 至 50 TB',
    price_asian: '0.79 元/GB',
    price_asian_other: '0.52 元/GB',
    price_eu: '0.36 元/GB',
    price_sa: '0.79 元/GB',
    price_oc: '0.98 元/GB'
  },
  {
    key: '8',
    name: 'HTTPS 下载流量/动态加速 HTTPS 流量',
    bandwidth: '第 50 TB 至 100 TB',
    price_asian: '0.68 元/GB',
    price_asian_other: '0.45 元/GB',
    price_eu: '0.31 元/GB',
    price_sa: '0.68 元/GB',
    price_oc: '0.85 元/GB'
  },
  {
    key: '9',
    name: 'HTTPS 下载流量/动态加速 HTTPS 流量',
    bandwidth: '第 100 TB 以上',
    price_asian: '请联系我们 400-808-9176 转 1',
    price_asian_other: '请联系我们 400-808-9176 转 1',
    price_eu: '请联系我们 400-808-9176 转 1',
    price_sa: '请联系我们 400-808-9176 转 1',
    price_oc: '请联系我们 400-808-9176 转 1'
  }
]

export default function TabPane1() {
  return <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} />
}
