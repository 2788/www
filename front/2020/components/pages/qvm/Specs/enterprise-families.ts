// TODO: desc

// 通用型
const g = [
  {
    family: 'ecs.g6',
    name: '通用型 g6',
    desc: '最新一代通用型产品，性能全面提升',
    scenes: [
      '高网络包收发场景，如视频弹幕、电信业务转发等',
      '各种类型和规模的企业级应用',
      '网站和应用服务器、游戏服务器等',
      '计算集群、依赖内存的数据处理'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:4'
      },
      {
        name: '最大基础带宽能力',
        value: '25 Gbit/s'
      },
      {
        name: 'CPU类型',
        value: 'Intel ® Xeon ® Platinum 8269CY'
      },
      {
        name: '最大网络收发包能力',
        value: '600万PPS'
      }
    ]
  },
  {
    family: 'ecs.g5',
    name: '通用型 g5',
    desc: '性能均衡，适用于企业通用类业务场景',
    scenes: [
      '高网络包收发场景，如视频弹幕、电信业务转发等',
      '各种类型和规模的企业级应用',
      '中小型数据库系统、缓存、搜索集群 数据分析和计算',
      '计算集群、依赖内存的数据处理'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:4'
      },
      {
        name: '最大网络带宽能力',
        value: '20 Gbit/s'
      },
      {
        name: 'CPU类型',
        value: 'Intel Skylake Xeon Platinum 8163 2.5GHz'
      },
      {
        name: '最大网络收发包能力',
        value: '400万PPS'
      }
    ]
  }
]

// 计算型
const c = [
  {
    family: 'ecs.c6',
    name: '计算型 c6',
    desc: '最新一代计算型产品，性能全面提升',
    scenes: [
      '高网络包收发场景，如视频弹幕、电信业务转发等',
      'Web前端服务器',
      '大型多人在线游戏（MMO）前端',
      '数据分析、批量计算、视频编码',
      '高性能科学和工程应用'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:2'
      },
      {
        name: '最大基础带宽能力',
        value: '25 Gbit/s'
      },
      {
        name: 'CPU类型',
        value: 'Intel ® Xeon ® Platinum 8269CY'
      },
      {
        name: '最大网络收发包能力',
        value: '600万PPS'
      }
    ]
  },
  {
    family: 'ecs.c5',
    name: '计算型 c5',
    desc: '适用于计算密集型业务需求',
    scenes: [
      '高网络包收发场景，如视频弹幕、电信业务转发等',
      'Web前端服务器',
      '大型多人在线游戏（MMO）前端',
      '数据分析、批量计算、视频编码',
      '高性能科学和工程应用'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:2'
      },
      {
        name: '最大网络带宽能力',
        value: '20 Gbit/s'
      },
      {
        name: 'CPU类型',
        value: 'Intel Xeon Platinum 8163（Skylake）2.5 GHz'
      },
      {
        name: '最大网络收发包能力',
        value: '400万PPS'
      }
    ]
  }
]

// 内存型
const r = [
  {
    family: 'ecs.r6',
    name: '内存型 r6',
    desc: '最新一代内存型产品，性能全面提升',
    scenes: [
      '高性能数据库、内存数据库',
      '数据分析与挖掘、分布式内存缓存',
      'Hadoop、Spark集群以及其他企业大内存需求应用',
      '高网络包收发场景，例如视频弹幕、电信业务转发等'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:8'
      },
      {
        name: '最大基础带宽能力',
        value: '25 Gbit/s'
      },
      {
        name: 'CPU类型',
        value: 'Intel ® Xeon ® Platinum 8269CY'
      },
      {
        name: '最大网络收发包能力',
        value: '600万PPS'
      }
    ]
  },
  {
    family: 'ecs.r5',
    name: '内存型 r5',
    desc: '适用于各类内存密集型场景需求',
    scenes: [
      '企业通用各种使用场景的计算需求',
      '中小型数据库、需要一定内存的数据处理、缓存集群和其他企业应用程序的后端服务器场景'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:8'
      },
      {
        name: '最大网络带宽能力',
        value: '20 Gbit/s'
      },
      {
        name: 'CPU类型',
        value: 'Intel Xeon Platinum 8163（Skylake）2.5 GHz'
      },
      {
        name: '最大网络收发包能力',
        value: '400万PPS'
      }
    ]
  }
]

// 大数据型
const d = [
  {
    family: 'ecs.d1',
    name: '大数据型 d1',
    desc: '适用于各类大数据场景应用',
    scenes: [
      'Hadoop MapReduce/HDFS/Hive/HBase等',
      'Spark内存计算/MLlib等',
      '互联网行业、金融行业等有大数据计算与存储分析需求的行业客户，进行海量数据存储和计算的业务场景',
      'Elasticsearch、日志等'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:4'
      },
      {
        name: '最大内网带宽',
        value: '17 Gbps'
      },
      {
        name: '数据盘',
        value: 'SATA HDD本地盘'
      },
      {
        name: '最大网络收发包能力',
        value: '180万PPS'
      }
    ]
  },
  {
    family: 'ecs.d1ne',
    name: '大数据网络增强型 d1ne',
    desc: '适用于各类大数据场景应用',
    scenes: [
      ' Hadoop MapReduce/HDFS/Hive/HBase等',
      'Spark内存计算/MLlib等',
      '互联网行业、金融行业等有大数据计算与存储分析需求的行业客户，进行海量数据存储和计算的业务场景',
      'Elasticsearch、日志等'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:4'
      },
      {
        name: '最大内网带宽',
        value: '35 Gbps'
      },
      {
        name: '数据盘',
        value: 'SATA HDD本地盘'
      },
      {
        name: '最大网络收发包能力',
        value: '450万PPS'
      }
    ]
  }
]

// GPU 型
const gpu = [
  {
    family: 'ecs.gn6v',
    name: 'GPU计算型 gn6v',
    desc: '',
    scenes: [
      '深度学习，例如图像分类、无人驾驶、语音识别等人工智能算法的训练以及推理应用',
      '科学计算，例如计算流体动力学、计算金融学、分子动力学、环境分析等'
    ],
    details: [
      {
        name: '最大规格',
        value: '64vCPU / 256GB内存 / 4*S7150'
      },
      {
        name: '单GPU显存',
        value: '16GB'
      },
      {
        name: 'GPU型号',
        value: 'NVIDIA V100'
      },
      {
        name: '最大网络收发包能力',
        value: '250万PPS'
      }
    ]
  },
  {
    family: 'ecs.ga1',
    name: 'GPU可视化计算型 ga1',
    desc: '',
    scenes: [
      '渲染，多媒体编解码',
      '专业图形图像处理及其他服务器端GPU计算工作负载'
    ],
    details: [
      {
        name: '最大规格',
        value: '56vCPU / 160GB内存 / 4*S7150'
      },
      {
        name: '单GPU显存',
        value: '8GB'
      },
      {
        name: 'GPU型号',
        value: 'AMD S7150'
      },
      {
        name: '最大网络能力',
        value: '10Gbps / 120万PPS'
      }
    ]
  },
  {
    family: 'ecs.gn5',
    name: 'GPU计算型 gn5',
    desc: '',
    scenes: [
      '深度学习，如图像分类、无人驾驶、语音识别等人工智能算法的训练以及推理应用',
      '科学计算，如计算流体动力学、计算金融学、分子动力学、环境分析等',
      '影视渲染、多媒体编解码及其他服务器端GPU计算工作负载'
    ],
    details: [
      {
        name: '最大规格',
        value: '54vCPU / 480GB内存 / 8*P100'
      },
      {
        name: '单GPU显存',
        value: '16GB'
      },
      {
        name: 'GPU计算卡',
        value: 'NVIDIA P100'
      },
      {
        name: '最大网络能力',
        value: '25Gbps / 400万PPS'
      }
    ]
  },
  {
    family: 'ecs.gn5i',
    name: 'GPU计算型 gn5i',
    desc: '',
    scenes: [
      '深度学习推理应用',
      '多媒体视频编解码',
      '专业图形图像处理及其他服务器端GPU计算工作负载'
    ],
    details: [
      {
        name: '最大规格',
        value: '56vCPU / 224GB内存 / 2*P4'
      },
      {
        name: '单GPU显存',
        value: '8GB'
      },
      {
        name: 'GPU型号',
        value: 'NVIDIA P4'
      },
      {
        name: '最大网络能力',
        value: '10Gbps / 200万PPS'
      }
    ]
  }
]

// 本地 SSD 型
const i = [
  {
    family: 'ecs.i2g',
    name: '本地SSD型 i2g',
    desc: '',
    scenes: [
      'OLTP、高性能关系型数据库',
      'NoSQL数据库（如Cassandra、MongoDB等',
      'Elasticsearch等搜索场景'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:4'
      },
      {
        name: '数据盘',
        value: 'NVMe SSD本地盘'
      },
      {
        name: 'CPU类型',
        value: 'Intel Xeon Platinum 8163（Skylake）2.5 GHz'
      },
      {
        name: '最大网络收发包能力',
        value: '400万PPS'
      }
    ]
  },
  {
    family: 'ecs.i2',
    name: '本地SSD型 i2',
    desc: '',
    scenes: [
      'OLTP、高性能关系型数据库',
      'NoSQL数据库（如Cassandra、MongoDB等',
      'Elasticsearch等搜索场景'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:8'
      },
      {
        name: '数据盘',
        value: 'NVMe SSD本地盘'
      },
      {
        name: 'CPU类型',
        value: 'Intel Xeon Platinum 8163（Skylake）2.5 GHz'
      },
      {
        name: '最大网络收发包能力',
        value: '400万PPS'
      }
    ]
  }
]

// 高主频型
const hf = [
  {
    family: 'ecs.hfc5',
    name: '高主频计算型 hfc5',
    desc: '高性能Web前端服务器&高性能科学和工程应用&MMO游戏、视频编码',
    scenes: [
      '高性能Web前端服务器',
      '高性能科学和工程应用',
      'MMO游戏、视频编码'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:2'
      },
      {
        name: '最大网络带宽能力',
        value: '6 Gbit/s'
      },
      {
        name: 'CPU类型',
        value: 'Intel Xeon Gold 6149（Skylake）3.1 GHz'
      },
      {
        name: '最大网络收发包能力',
        value: '250万PPS'
      }
    ]
  },
  {
    family: 'ecs.hfg5',
    name: '高主频通用型 hfg5',
    desc: '',
    scenes: [
      '高性能Web前端服务器',
      '高性能科学和工程应用',
      'MMO游戏、视频编码'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:4'
      },
      {
        name: '最大网络带宽能力',
        value: '10 Gbit/s'
      },
      {
        name: 'CPU类型',
        value: 'Intel Xeon Gold 6149（Skylake）3.1 GHz'
      },
      {
        name: '最大网络收发包能力',
        value: '400万PPS'
      }
    ]
  }
]

// FPGA 型
const f = [
  {
    family: 'ecs.f3',
    name: 'FPGA计算型 f3',
    desc: '一款提供了现场可编程门阵列(FPGA)的计算实例',
    scenes: [
      '深度学习推理',
      '基因组学研究',
      '数据库加速',
      '图片转码，例如JPEG转WebP',
      '实时视频处理，例如H.265视频压缩'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:4'
      },
      {
        name: '最大网络带宽能力',
        value: '5 Gbit/s'
      },
      {
        name: 'FPGA计算卡',
        value: 'Xilinx 16nm Virtex UltraScale+ 器件VU9P'
      },
      {
        name: '最大网络收发包能力',
        value: '100万PPS'
      }
    ]
  },
  {
    family: 'ecs.f1',
    name: 'FPGA计算型 f1',
    desc: '',
    scenes: [
      '深度学习推理',
      '基因组学研究',
      '金融分析',
      '图片转码',
      '实时视频处理及安全等计算工作负载'
    ],
    details: [
      {
        name: 'CPU内存比',
        value: '1:4'
      },
      {
        name: '最大网络带宽能力',
        value: '10 Gbit/s'
      },
      {
        name: 'FPGA计算卡',
        value: 'Intel ARRIA 10 GX 1150'
      },
      {
        name: '最大网络收发包能力',
        value: '200万PPS'
      }
    ]
  }
]

export default [
  { key: 'g', name: '通用型', data: g },
  { key: 'c', name: '计算型', data: c },
  { key: 'r', name: '内存型', data: r },
  { key: 'd', name: '大数据型', data: d },
  { key: 'gpu', name: 'GPU 型', data: gpu },
  { key: 'i', name: '本地 SSD 型', data: i },
  { key: 'hf', name: '高主频型', data: hf },
  { key: 'f', name: 'FPGA 型', data: f }
].map(
  item => ({
    ...item,
    data: item.data.slice(0, 2) // 每个类型只需要展示最上边两个 family
  })
)
