import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import Icon4 from './images/icon4.svg'
import Icon5 from './images/icon5.svg'
import Icon6 from './images/icon6.svg'

import style from './index.less'

const scenes = [
  {
    icon: <Icon1 />,
    title: '大数据应用',
    client: [
      { title: '存储利用率问题', content: '集群计算能力富裕而存储能力不足问题，以及出盘率不高问题' },
      { title: '存储集群稳定性问题', content: '数 PB 容量、数亿文件后集群可靠性不足，需要极强 HDFS 优化能力' },
      { title: '扩展问题', content: '很多时候集群的存储与计算需求与实际不均衡，扩展不易' }
    ],
    value: [
      { title: 'EB 级统一命名空间', content: 'EB 级容量与千亿级别元数据管理能力，满足大数据应用存储系统的无限扩展要求' },
      { title: '计算存储分离部署', content: '满足持续的存储激增现状，一体机存储方式弹性扩展' },
      { title: '资源利用率高', content: '接近五副本的安全性( EC 28:4 )，提供高达 87.5% 得盘率' }
    ]
  },
  {
    icon: <Icon2 />,
    title: '安防监控应用',
    client: [
      { title: '存储能力不足', content: '万级别高清摄像头的 90 天存储需求，容量需求与性能需求巨大' },
      { title: '生命周期管理不便', content: '监控内容过期自动删除能力与效率不足' },
      { title: '监控价值挖掘不足', content: '监控内容价值不能充分挖掘' }
    ],
    value: [
      { title: 'EB 级统一命名空间', content: '支撑容量与性能需求，满足监控视频的集中统一管理要求' },
      { title: '生命周期管理', content: '智能清理旧监控数据，循环并充分利用硬件资源能力' },
      { title: '额外视频智能分析支撑', content: '结合七牛视频智能分析软件，挖掘更多监控数据价值' }
    ]
  },
  {
    icon: <Icon3 />,
    title: '媒资资产存储',
    client: [
      { title: '管理与生产媒资繁琐', content: '需要整合多产品建设多平台，处理过程繁琐，内容管理复杂' },
      { title: '安全可靠难保障', content: '互联网服务面临网络安全、数据安全、可用性安全等风险，建设专业的安全体系周期长投入大' },
      { title: '容量需求挑战', content: '很难准确预估用户存储用量，集群存储容量与服务能力规划困难' }
    ],
    value: [
      { title: '快速生产', content: '存储集成媒体后期加工处理能力，简化媒资生产流程' },
      { title: '共享内容资源', content: '跨平台共享内容资源，快速提高了分发效率，提升资产利用率' },
      { title: '资源利用率高', content: '接近五副本的安全性( EC 28:4 )，提供高达 87.5% 得盘率' }
    ]
  },
  {
    icon: <Icon4 />,
    title: '智慧医疗应用',
    client: [
      { title: '影像共享困难', content: '多个医疗机构间，很难完成跨区域、跨医院的数据安全共享' },
      { title: '影像应用开放困难', content: '各个医疗机构的影像应用无法跨机房、跨业务互相开放' },
      { title: '存储扩展困难', content: '传统存储方案很难依据存储使用情况及时按需弹性扩展' }
    ],
    value: [
      { title: '统一管理', content: '各医院资源汇集云端，统一存储和管理，医院无需单独建设与维护机房' },
      { title: '影像共享结果互认', content: '提高了医疗效率，实现远程协同与分级诊断' },
      { title: '按需使用资源', content: '随时随地在电脑或者手机上从云端调阅和管理影像资料' }
    ]
  },
  {
    icon: <Icon5 />,
    title: '用户文件存储',
    client: [
      { title: '用户管控复杂', content: '建设面向大规模用户的多租户管控与服务能力，需要大量研发投入' },
      { title: '安全可靠难保障', content: '互联网服务面临网络安全、数据安全、可用性安全等风险，建设专业的安全体系周期长投入大' },
      { title: '容量需求挑战', content: '很难准确预估用户存储用量，集群存储容量与服务能力规划困难' }
    ],
    value: [
      { title: '业务快速上线能力', content: '完善的 SDK 与研发资 源，帮助客户快速构建业务软件体系' },
      { title: '完善的存储服务保障', content: '安全可靠的 Kodo Enterprise 产品，提供完善的多租户服务支撑' },
      { title: '资源利用率高', content: '七牛智能 EC 技术，支持弹性扩容，提供高出盘率' }
    ]
  },
  {
    icon: <Icon6 />,
    title: '企业内容存储',
    client: [
      { title: '业务应用情况复杂', content: '软件复杂，存储使用方式不一，需要兼容丰富的存储协议' },
      { title: '新型业务与大数据需要更大的存储容量', content: '为应对市场竞争，企业需要保存更多数据，挖掘更多数据价值，保证企业竞争力' },
      { title: '权限控制要求高', content: '存储内容繁杂，即包含内部公开资料，更包含高安全性要求的企业秘密' }
    ],
    value: [
      { title: '开放平台', content: '兼容更多的存储协议，支撑更多的存储应用，尤其是大数据应用' },
      { title: '完善的访问控制能力', content: '满足大型企业的权限访问控制要求' },
      { title: '资源利用率高', content: '资源利用率高：EC 的 28：4 模型，提供高达 87.5% 得盘率，提高资源利用率' }
    ]
  }
]

export default function OcrScene() {
  return (
    <Scene name="scene" title="适用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} className={style.scenePanel} verticalCenter key={index}>
            <SceneBlock blockType="fixed" className={style.blockLeft}>
              {scene.icon}
            </SceneBlock>
            <SceneBlock shadow className={style.blockRight}>
              <div className={style.sceneContainer}>
                <h3 className={style.sceneTitle}>客户痛点</h3>
                <ul className={style.list}>
                  {
                    scene.client.map((item, i) => (
                      <li className={style.item} key={i}>
                        <h4>{item.title}</h4>
                        <p>{item.content}</p>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className={style.sceneContainer}>
                <h3 className={style.sceneTitle}>实现价值</h3>
                <ul className={style.list}>
                  {
                    scene.value.map((item, i) => (
                      <li className={style.item} key={i}>
                        <h4>{item.title}</h4>
                        <p>{item.content}</p>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
