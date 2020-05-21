import { CalcRule } from '../../Calculator'

export default [
  {
    region: 'mainland',
    desc: '大陆地区',
    items: [
      {
        name: 'http',
        desc: '第 0 GB 至 10 GB',
        price: 0,
        min: 0,
        max: 10
      },
      {
        name: 'http',
        desc: '第 10 GB 至 100 TB',
        price: 0.24,
        threshold: 10,
        min: 10,
        max: 100 * 1024
      },
      {
        name: 'http',
        desc: '第 100 TB 至 1 PB',
        price: 0.19,
        threshold: 10,
        min: 100 * 1024,
        max: 1 * 1024 * 1024
      },
      {
        name: 'http',
        desc: '第 1PB 以上',
        price: 0.14,
        threshold: 10,
        min: 1 * 1024 * 1024,
        max: Number.POSITIVE_INFINITY
      },
      {
        name: 'https',
        desc: '第 0 GB 至 100 TB',
        price: 0.28,
        min: 0,
        max: 100 * 1024
      },
      {
        name: 'https',
        desc: '第 100 TB 至 1 PB',
        price: 0.23,
        min: 100 * 1024,
        max: 1 * 1024 * 1024
      },
      {
        name: 'https',
        desc: '第 1PB 以上',
        price: 0.18,
        min: 1 * 1024 * 1024,
        max: Number.POSITIVE_INFINITY
      }
    ]
  },
  {
    region: 'asia',
    desc: '大亚洲（港澳台/东南亚/印度）陆地区',
    items: [
      {
        name: 'http',
        desc: '第 0 GB 至 10 GB',
        price: 0,
        min: 0,
        max: 10
      },
      {
        name: 'http',
        desc: '第 10 GB 至 10 TB',
        price: 0.76,
        min: 10,
        max: 10 * 1024
      },
      {
        name: 'http',
        desc: '第 10 TB 至 50 TB',
        price: 0.66,
        min: 10 * 1024,
        max: 50 * 1024
      },
      {
        name: 'http',
        desc: '第 50 TB 至 100 TB',
        price: 0.57,
        min: 50 * 1024,
        max: 100 * 1024
      },
      {
        name: 'http',
        desc: '第 100 TB 以上',
        price: 0.57, // 请联系我们 400-808-9176 转 1
        min: 100 * 1024,
        max: Number.POSITIVE_INFINITY
      },
      {
        name: 'https',
        desc: '第 0 GB 至 10 TB',
        price: 0.91,
        min: 0,
        max: 10 * 1024
      },
      {
        name: 'https',
        desc: '第 10 TB 至 50 TB',
        price: 0.79,
        min: 10 * 1024,
        max: 50 * 1024
      },
      {
        name: 'https',
        desc: '第 50 TB 至 100 TB',
        price: 0.68,
        min: 50 * 1024,
        max: 100 * 1024
      },
      {
        name: 'https',
        desc: '第 100 TB 以上',
        price: 0.68,
        min: 100 * 1024,
        max: Number.POSITIVE_INFINITY
      }
    ]
  },
  {
    region: 'eu/ua',
    desc: '欧洲/北美洲',
    items: [
      {
        name: 'http',
        desc: '第 0 GB 至 10 GB',
        price: 0,
        threshold: 10,
        min: 0,
        max: 10
      },
      {
        name: 'http',
        desc: '第 10 GB 至 10 TB',
        price: 0.34,
        threshold: 10,
        min: 10,
        max: 10 * 1024
      },
      {
        name: 'http',
        desc: '第 10 TB 至 50 TB',
        price: 0.30,
        threshold: 10,
        min: 10 * 1024,
        max: 50 * 1024
      },
      {
        name: 'http',
        desc: '第 50 TB 至 100 TB',
        price: 0.26,
        threshold: 10,
        min: 50 * 1024,
        max: 100 * 1024
      },
      {
        name: 'http',
        desc: '第 100 TB 以上',
        price: 0.26, // 请联系我们 400-808-9176 转 1
        threshold: 10,
        min: 100 * 1024,
        max: Number.POSITIVE_INFINITY
      },
      {
        name: 'https',
        desc: '第 0 GB 至 10 TB',
        price: 0.40,
        min: 0,
        max: 10 * 1024
      },
      {
        name: 'https',
        desc: '第 10 TB 至 50 TB',
        price: 0.36,
        min: 10 * 1024,
        max: 50 * 1024
      },
      {
        name: 'https',
        desc: '第 50 TB 至 100 TB',
        price: 0.31,
        min: 50 * 1024,
        max: 100 * 1024
      },
      {
        name: 'https',
        desc: '第 100 TB 以上',
        price: 0.31,
        min: 100 * 1024,
        max: Number.POSITIVE_INFINITY
      }
    ]
  },
  {
    region: 'asia_other',
    desc: '亚洲（其他地区）',
    items: [
      {
        name: 'http',
        desc: '第 0 GB 至 10 GB',
        price: 0,
        threshold: 10,
        min: 0,
        max: 10
      },
      {
        name: 'http',
        desc: '第 10 GB 至 10 TB',
        price: 0.50,
        threshold: 10,
        min: 10,
        max: 10 * 1024
      },
      {
        name: 'http',
        desc: '第 10 TB 至 50 TB',
        price: 0.44,
        threshold: 10,
        min: 10 * 1024,
        max: 50 * 1024
      },
      {
        name: 'http',
        desc: '第 50 TB 至 100 TB',
        price: 0.38,
        threshold: 10,
        min: 50 * 1024,
        max: 100 * 1024
      },
      {
        name: 'http',
        desc: '第 100 TB 以上',
        price: 0.38, // 请联系我们 400-808-9176 转 1
        threshold: 10,
        min: 100 * 1024,
        max: Number.POSITIVE_INFINITY
      },
      {
        name: 'https',
        desc: '第 0 GB 至 10 TB',
        price: 0.60,
        min: 0,
        max: 10 * 1024
      },
      {
        name: 'https',
        desc: '第 10 TB 至 50 TB',
        price: 0.52,
        min: 10 * 1024,
        max: 50 * 1024
      },
      {
        name: 'https',
        desc: '第 50 TB 至 100 TB',
        price: 0.45,
        min: 50 * 1024,
        max: 100 * 1024
      },
      {
        name: 'https',
        desc: '第 100 TB 以上',
        price: 0.45,
        min: 100 * 1024,
        max: Number.POSITIVE_INFINITY
      }
    ]
  },
  {
    region: 'sa',
    desc: '南美洲',
    items: [
      {
        name: 'http',
        desc: '第 0 GB 至 10 GB',
        price: 0,
        threshold: 10,
        min: 0,
        max: 10
      },
      {
        name: 'http',
        desc: '第 10 GB 至 10 TB',
        price: 0.76,
        threshold: 10,
        min: 10,
        max: 10 * 1024
      },
      {
        name: 'http',
        desc: '第 10 TB 至 50 TB',
        price: 0.66,
        threshold: 10,
        min: 10 * 1024,
        max: 50 * 1024
      },
      {
        name: 'http',
        desc: '第 50 TB 至 100 TB',
        price: 0.57,
        threshold: 10,
        min: 50 * 1024,
        max: 100 * 1024
      },
      {
        name: 'http',
        desc: '第 100 TB 以上',
        price: 0.57, // 请联系我们 400-808-9176 转 1
        threshold: 10,
        min: 100 * 1024,
        max: Number.POSITIVE_INFINITY
      },
      {
        name: 'https',
        desc: '第 0 GB 至 10 TB',
        price: 0.91,
        min: 0,
        max: 10 * 1024
      },
      {
        name: 'https',
        desc: '第 10 TB 至 50 TB',
        price: 0.79,
        min: 10 * 1024,
        max: 50 * 1024
      },
      {
        name: 'https',
        desc: '第 50 TB 至 100 TB',
        price: 0.68,
        min: 50 * 1024,
        max: 100 * 1024
      },
      {
        name: 'https',
        desc: '第 100 TB 以上',
        price: 0.68,
        min: 100 * 1024,
        max: Number.POSITIVE_INFINITY
      }
    ]
  },
  {
    region: 'oc',
    desc: '大洋洲与其他',
    items: [
      {
        name: 'http',
        desc: '第 0 GB 至 10 GB',
        price: 0,
        threshold: 10,
        min: 0,
        max: 10
      },
      {
        name: 'http',
        desc: '第 10 GB 至 10 TB',
        price: 0.94,
        threshold: 10,
        min: 10,
        max: 10 * 1024
      },
      {
        name: 'http',
        desc: '第 10 TB 至 50 TB',
        price: 0.82,
        threshold: 10,
        min: 10 * 1024,
        max: 50 * 1024
      },
      {
        name: 'http',
        desc: '第 50 TB 至 100 TB',
        price: 0.71,
        threshold: 10,
        min: 50 * 1024,
        max: 100 * 1024
      },
      {
        name: 'http',
        desc: '第 100 TB 以上',
        price: 0.71, // 请联系我们 400-808-9176 转 1
        threshold: 10,
        min: 100 * 1024,
        max: Number.POSITIVE_INFINITY
      },
      {
        name: 'https',
        desc: '第 0 GB 至 10 TB',
        price: 1.22,
        min: 0,
        max: 10 * 1024
      },
      {
        name: 'https',
        desc: '第 10 TB 至 50 TB',
        price: 0.98,
        min: 10 * 1024,
        max: 50 * 1024
      },
      {
        name: 'https',
        desc: '第 50 TB 至 100 TB',
        price: 0.85,
        min: 50 * 1024,
        max: 100 * 1024
      },
      {
        name: 'https',
        desc: '第 100 TB 以上',
        price: 0.85,
        min: 100 * 1024,
        max: Number.POSITIVE_INFINITY
      }
    ]
  },
  {
    region: 'all',
    desc: '动态加速请求数',
    items: [
      {
        name: '动态加速请求数',
        desc: '第 0 次至 5 万次',
        min: 0,
        max: 5,
        price: 0
      },
      {
        name: '动态加速请求数',
        desc: '第 5 万次及以上',
        min: 5,
        max: Number.POSITIVE_INFINITY,
        price: 0.19,
        threshold: 5
      }
    ]
  }
] as CalcRule[]
