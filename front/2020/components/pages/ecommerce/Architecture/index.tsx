import React from 'react'
import Section from 'components/Product/Section'
import Arch from './images/architecture.svg'
import style from './index.less'

const architectures = [
  {
    title: '方案架构优势',
    content: [
      '七牛云直播支持将多种信号源（移动设备、IP Camera、摄像机、PC 桌面、点播视频、无人机、其他直播平台流）推送到云端，并分发给各种终端设备的用户。更快速、更灵活、更开放的满足不同行业、场景的客户对直播功能的需求。',
      '七牛的连麦方案与七牛直播云紧密结合，在不改变原有的推流和拉流工作流程的基础上，提供了简单易用的连麦对讲功能。该方案主要包括连麦服务端和客户端两个部分，其中，连麦服务端主要提供了房间管理、权限验证、信令和媒体数据转发等功能，客户端则提供了媒体数据的采集、编码、传输、显示等功能。通过连麦互动可增加用户之间的粘性，打造更真实的互动社交环境。'
    ]
  },
  {
    title: '客户痛点',
    content: [
      '企业需要自主服务器搭建及维护',
      '需要大量的研发人员长时间开发才可以上线直播',
      '支付、AI 大数据分析用户行为需要单独开发等'
    ]
  }
]

export default function Architecture() {
  return (
    <Section name="architecture" title="方案架构">
      <Arch className={style.icon} />
      <div className={style.container}>
        {
          architectures.map((architecture, index) => (
            <div className={style.content} key={index}>
              <h3 className={style.title}>{architecture.title}</h3>
              <ul className={style.list}>
                {
                  architecture.content.map((item, i) => (
                    <li className={style.item} key={`${index}-${i}`}>
                      <p>{item}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </Section>
  )
}
