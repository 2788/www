import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'
import image4 from './images/image4.png'
import image5 from './images/image5.png'

import style from './index.less'

const scenes = [
  {
    url: image1,
    title: '智能安防',
    desc: '安防行业的视频清晰度的不断提升，各种海量终端的接入，多样的智能化识别功能的发展，要求存储系统具有更高的扩展性，可靠性，稳定性和成本管理能力。',
    value: [
      'EB 级别统一命名空间支撑海量的吞吐能力和高并发，满足海量的摄像头等终端接入',
      '通过生命周期管理，定期释放过期数据和转移至低成本存储，充分利用硬件资源能力'
    ]
  },
  {
    url: image2,
    title: '智能媒体平台',
    desc: '智能媒体平台可以提高媒体行业从生产到分发的各个环节的内容生产效率和质量。方便短视频、长视频、娱乐/赛事/游戏直播、在线教育、广电、平面媒体等场景企业进行业务融合与创新，搭建即时化、交互化的应用系统，应对快速变化的市场挑战。',
    value: [
      '丰富的图片，音视频数据处理功能，提升业务开发效率',
      '支持多终端，Web 网站访问能力',
      '海量扩展能力支撑媒体资源统一存储和管理，支撑媒体收录，处理，识别，直播，分发系统'
    ]
  },
  {
    url: image3,
    title: '智慧医疗',
    desc: '区域医疗云，影像云等医疗信息化方案，构建影像数据，医疗档案等的安全共享，提升分级诊疗，远程问诊信息化程度。增强医疗机构，医疗设备，病人，医生的交互，提升医疗效率。',
    value: [
      'PACS 系统，检测系统等直接上传数据到七牛存储构建的医疗影像云',
      '丰富的多平台 SDK 构建多终端，多医院诊断数据共享',
      '构建远程医疗，多级诊断的基础数据平台'
    ]
  },
  {
    url: image4,
    title: '金融科技',
    desc: '金融行业的录音录像，金融影像，电子合同，保单，反欺诈，风险分析系统的分析，核心数据的备份等领域需求高可靠的非结构化数据存储，以适应业务的快速变化和构建网上金融的业务形态。',
    value: [
      '多移动终端，业务系统共享数据平台',
      '双活，多机房方案支撑金融级别高可靠',
      '兼容多种备份软件实现核心数据高可靠'
    ]
  },
  {
    url: image5,
    title: '智能制造',
    desc: '制造业的生产环节中例如物联网终端数据，日志，产线质量监控，勘探，遥感等数据，统一存储和分析处理，与生产各环节结合，提升企业运作效率。',
    value: [
      '打通生产各环节的数据共享，进行统一可靠的数据管理',
      '构建大数据分析数据平台提升生产效率'
    ]
  }
]

export default function StorageScene() {
  return (
    <Scene name="scene" title="适用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} className={style.scenePanel} key={index}>
            <SceneBlock blockType="fixed">
              <img src={scene.url} className={style.sceneIcon} />
            </SceneBlock>
            <SceneBlock className={style.blockRight}>
              <div className={style.sceneContainer}>
                <h3 className={style.sceneTitle}>场景介绍</h3>
                <ul className={style.list}>
                  <li className={style.item}>
                    <p>{scene.desc}</p>
                  </li>
                </ul>
                <h3 className={style.sceneTitle}>场景价值</h3>
                <ul className={style.list}>
                  {
                    scene.value.map((item, i) => (
                      <li className={style.item} key={i}>
                        <p>{item}</p>
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
