import { CalcRule, CountUnitAdaptor } from '../../../Calculator'
import Region, { nameMap } from '../../region'

const countUnitAdaptor = new CountUnitAdaptor()

// 华南
const south: CalcRule = {
  region: Region.South,
  desc: nameMap[Region.South],
  items: [
    {
      name: '存储空间费用',
      price: 0.012,
      min: 0,
      max: Number.POSITIVE_INFINITY
    },
    {
      name: '提前删除费用',
      price: 0.012,
      min: 0,
      max: Number.POSITIVE_INFINITY
    },
    {
      type: 'group',
      name: '流量费用',
      items: [
        {
          name: '外网流出流量',
          desc: '0-100 TB',
          price: 0.29,
          min: 0,
          max: 100 * 1024
        },
        {
          name: '外网流出流量',
          desc: '100 TB 以上',
          price: 0.26,
          min: 100 * 1024,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'CDN',
          price: 0.15,
          min: 0,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      type: 'group',
      name: '请求次数',
      unitAdaptor: countUnitAdaptor,
      items: [
        {
          name: 'PUT/DELETE',
          price: 0.5,
          min: 0,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'GET',
          price: 0.5,
          min: 0,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: '数据取回请求次数',
          price: 6,
          min: 0,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      name: '数据取回',
      price: 0.12,
      min: 0,
      max: Number.POSITIVE_INFINITY
    }
  ]
}

// 华东-浙江2
const eastZheJiang2: CalcRule = {
  region: Region.EastZheJiang2,
  desc: nameMap[Region.EastZheJiang2],
  items: [
    {
      name: '存储空间费用',
      price: 0.012,
      min: 0,
      max: Number.POSITIVE_INFINITY
    },
    {
      name: '提前删除费用',
      price: 0.012,
      min: 0,
      max: Number.POSITIVE_INFINITY
    },
    {
      type: 'group',
      name: '流量费用',
      items: [
        {
          name: '外网流出流量',
          desc: '0-100 TB',
          price: 0.26,
          min: 0,
          max: 100 * 1024
        },
        {
          name: '外网流出流量',
          desc: '100 TB 以上',
          price: 0.24,
          min: 100 * 1024,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'CDN',
          price: 0.15,
          min: 0,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      type: 'group',
      name: '请求次数',
      unitAdaptor: countUnitAdaptor,
      items: [
        {
          name: 'PUT/DELETE',
          price: 0.5,
          min: 0,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'GET',
          price: 0.5,
          min: 0,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: '数据取回请求次数',
          price: 6,
          min: 0,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      name: '数据取回',
      price: 0.12,
      min: 0,
      max: Number.POSITIVE_INFINITY
    }
  ]
}

// 华东
const east: CalcRule = {
  region: Region.East,
  desc: nameMap[Region.East],
  items: south.items
}

// 华北
const north = {
  region: Region.North,
  desc: nameMap[Region.North],
  items: south.items
}

// 北美-洛杉矶
const usla: CalcRule = {
  region: Region.USLA,
  desc: nameMap[Region.USLA],
  items: [
    {
      name: '存储空间费用',
      price: 0.015,
      min: 0,
      max: Number.POSITIVE_INFINITY
    },
    {
      name: '提前删除费用',
      price: 0.015,
      min: 0,
      max: Number.POSITIVE_INFINITY
    },
    {
      type: 'group',
      name: '流量费用',
      items: [
        {
          name: '外网流出流量',
          desc: '0-100 TB',
          price: 0.29,
          min: 0,
          max: 100 * 1024
        },
        {
          name: '外网流出流量',
          desc: '100 TB 以上',
          price: 0.26,
          min: 100 * 1024,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'CDN',
          price: 0.15,
          min: 0,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      type: 'group',
      name: '请求次数',
      unitAdaptor: countUnitAdaptor,
      items: [
        {
          name: 'PUT/DELETE',
          price: 1,
          min: 0,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'GET',
          price: 0.8,
          min: 0,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: '数据取回请求次数',
          price: 8,
          min: 0,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      name: '数据取回',
      price: 0.14,
      min: 0,
      max: Number.POSITIVE_INFINITY
    }
  ]
}

// 东南亚
const asiaSgp = {
  region: Region.AsiaSgp,
  desc: nameMap[Region.AsiaSgp],
  items: usla.items
}

export default [eastZheJiang2, east, south, north, usla, asiaSgp]
