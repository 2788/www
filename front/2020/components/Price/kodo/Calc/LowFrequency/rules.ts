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
      desc: '0-10 GB',
      price: 0.06,
      min: 0,
      max: 10
    },
    {
      name: '存储空间费用',
      desc: '10 GB 以上',
      price: 0.06,
      min: 10,
      max: Number.POSITIVE_INFINITY
    },
    {
      type: 'group',
      name: '流量费用',
      items: [

        {
          name: '外网流出流量',
          desc: '0-100TB',
          price: 0.29,
          min: 0,
          max: 100 * 1024
        },
        {
          name: '外网流出流量',
          desc: '100TB 以上',
          price: 0.26,
          min: 100 * 1024,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'CDN',
          desc: '0-10 GB',
          price: 0.15,
          min: 0,
          max: 10
        },
        {
          name: 'CDN',
          desc: '10 GB 以上',
          price: 0.15,
          min: 10,
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
          desc: '0-10 万次',
          price: 0.1,
          min: 0,
          max: 10
        },
        {
          name: 'PUT/DELETE',
          desc: '10 万次以上',
          price: 0.1,
          min: 10,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'GET',
          desc: '0-100 万次',
          price: 0.1,
          min: 0,
          max: 100
        },
        {
          name: 'GET',
          desc: '100 万次以上',
          price: 0.1,
          min: 100,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: '类型转换次数',
          price: 0.1,
          min: 0,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      name: '数据取回',
      price: 0.06,
      min: 0,
      max: Number.POSITIVE_INFINITY
    }
  ]
}

// 华东
const east: CalcRule = {
  region: Region.East,
  desc: nameMap[Region.East],
  items: [
    {
      type: 'group',
      name: '存储费用',
      items: [
        {
          name: '存储空间费用',
          desc: '0-10 GB',
          price: 0.06,
          min: 0,
          max: 10
        },
        {
          name: '存储空间费用',
          desc: '10 GB - 1 TB',
          price: 0.06,
          min: 10,
          max: 1 * 1024
        },
        {
          name: '存储空间费用',
          desc: '1 TB - 200 TB',
          price: 0.06,
          min: 1 * 1024,
          max: 200 * 1024
        },
        {
          name: '存储空间费用',
          desc: '200 TB - 5 PB',
          price: 0.06,
          min: 200 * 1024,
          max: 5 * 1024 * 1024
        },
        {
          name: '存储空间费用',
          desc: '5 PB 以上',
          price: 0.06,
          min: 5 * 1024 * 1024,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      type: 'group',
      name: '流量费用',
      items: [
        {
          name: '外网流出流量',
          desc: '0-100TB',
          price: 0.29,
          min: 0,
          max: 100 * 1024
        },
        {
          name: '外网流出流量',
          desc: '100TB 以上',
          price: 0.26,
          min: 100 * 1024,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'CDN',
          desc: '0-10 GB',
          price: 0.15,
          min: 0,
          max: 10
        },
        {
          name: 'CDN',
          desc: '10 GB 以上',
          price: 0.15,
          min: 10,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      type: 'group',
      name: '请求费用',
      unitAdaptor: countUnitAdaptor,
      items: [
        {
          name: 'PUT/DELETE',
          desc: '0-10 万次',
          price: 0.1,
          min: 0,
          max: 10
        },
        {
          name: 'PUT/DELETE',
          desc: '10 万次以上',
          price: 0.1,
          min: 10,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'GET',
          desc: '0-100 万次',
          price: 0.1,
          min: 0,
          max: 100
        },
        {
          name: 'GET',
          desc: '100 万次以上',
          price: 0.1,
          min: 100,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: '类型转换次数',
          price: 0.1,
          min: 0,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      name: '数据取回',
      price: 0.06,
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
      type: 'group',
      name: '存储费用',
      items: [
        {
          name: '存储空间费用',
          desc: '0 - 10 GB',
          price: 0.06,
          min: 0,
          max: 10
        },
        {
          name: '存储空间费用',
          desc: '10 GB - 1 TB',
          price: 0.06,
          min: 10,
          max: 1 * 1024
        },
        {
          name: '存储空间费用',
          desc: '1 TB - 200 TB',
          price: 0.06,
          min: 1 * 1024,
          max: 200 * 1024
        },
        {
          name: '存储空间费用',
          desc: '200 TB - 5 PB',
          price: 0.06,
          min: 200 * 1024,
          max: 5 * 1024 * 1024
        },
        {
          name: '存储空间费用',
          desc: '5 PB 以上',
          price: 0.06,
          min: 5 * 1024 * 1024,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      type: 'group',
      name: '流量费用',
      items: [
        {
          name: '外网流出流量',
          desc: '0 - 100 TB',
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
          desc: '0 - 10 GB',
          price: 0.15,
          min: 0,
          max: 10
        },
        {
          name: 'CDN',
          desc: '10 GB 以上',
          price: 0.15,
          min: 10,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      type: 'group',
      name: '请求费用',
      unitAdaptor: countUnitAdaptor,
      items: [
        {
          name: 'PUT/DELETE',
          desc: '0 - 10 万次',
          price: 0.1,
          min: 0,
          max: 10
        },
        {
          name: 'PUT/DELETE',
          desc: '10 万次以上',
          price: 0.1,
          min: 10,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'GET',
          desc: '0 - 100 万次',
          price: 0.1,
          min: 0,
          max: 100
        },
        {
          name: 'GET',
          desc: '100 万次以上',
          price: 0.1,
          min: 100,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: '类型转换次数',
          price: 0.1,
          min: 0,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      name: '数据取回',
      price: 0.06,
      min: 0,
      max: Number.POSITIVE_INFINITY
    }
  ]
}

// 华北
const north = { ...east, region: Region.North, desc: nameMap[Region.North] }

// 北美
const us: CalcRule = {
  region: Region.US,
  desc: nameMap[Region.US],
  items: [
    {
      type: 'group',
      name: '存储费用',
      items: [
        {
          name: '存储空间费用',
          desc: '0-10 GB',
          price: 0.06,
          min: 0,
          max: 10
        },
        {
          name: '存储空间费用',
          desc: '10 GB - 50 TB',
          price: 0.06,
          min: 10,
          max: 50 * 1024
        },
        {
          name: '存储空间费用',
          desc: '50 TB - 500 TB',
          price: 0.06,
          min: 50 * 1024,
          max: 500 * 1024
        },
        {
          name: '存储空间费用',
          desc: '500 TB - 5 PB',
          price: 0.06,
          min: 500 * 1024,
          max: 5 * 1024 * 1024
        },
        {
          name: '存储空间费用',
          desc: '5 PB 以上',
          price: 0.06,
          min: 5 * 1024 * 1024,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      type: 'group',
      name: '流量费用',
      items: [
        {
          name: '外网流出流量',
          desc: '0-100TB',
          price: 0.29,
          min: 0,
          max: 100 * 1024
        },
        {
          name: '外网流出流量',
          desc: '100TB 以上',
          price: 0.26,
          min: 100 * 1024,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'CDN',
          desc: '0-10 GB',
          price: 0.15,
          min: 0,
          max: 10
        },
        {
          name: 'CDN',
          desc: '10 GB 以上',
          price: 0.15,
          min: 10,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      type: 'group',
      name: '请求费用',
      unitAdaptor: countUnitAdaptor,
      items: [
        {
          name: 'PUT/DELETE',
          desc: '0-10 万次',
          price: 0.1,
          min: 0,
          max: 10
        },
        {
          name: 'PUT/DELETE',
          desc: '10 万次以上',
          price: 0.1,
          min: 10,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: 'GET',
          desc: '0-100 万次',
          price: 0.1,
          min: 0,
          max: 100
        },
        {
          name: 'GET',
          desc: '100 万次以上',
          price: 0.1,
          min: 100,
          max: Number.POSITIVE_INFINITY
        },
        {
          name: '类型转换次数',
          price: 0.1,
          min: 0,
          max: Number.POSITIVE_INFINITY
        }
      ]
    },
    {
      name: '数据取回',
      price: 0.06,
      min: 0,
      max: Number.POSITIVE_INFINITY
    }
  ]
}

// 东南亚
const southAsia = { ...us, region: Region.SouthAsia, desc: nameMap[Region.SouthAsia] }

export default [eastZheJiang2, east, south, north, us, southAsia]
