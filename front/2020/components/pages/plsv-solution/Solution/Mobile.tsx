/**
 * @file 短视频端到端的解决方案 Mobile 端 index.tsx
 * @description 包含短视频端到端的解决方案 Mobile 端
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { useState } from 'react'

import Menu, { SubMenu } from 'components/UI/Menu'

import SolutionIconOne from './solution-icon-one.svg'
import SolutionIconTwo from './solution-icon-two.svg'
import SolutionIconThree from './solution-icon-three.svg'
import SolutionIconFive from './solution-icon-five.svg'

import styles from './style.less'

export default function Mobile() {
  const [active, setActive] = useState<string | null>('1')

  function handleSubMenusChange(activeKey: string) {
    if (active === activeKey) {
      setActive(null)
      return
    }

    setActive(activeKey)
  }

  return (
    <Menu
      className={styles.mobile}
      mode="inline"
      level={-1}
      openKeys={active ? [active] : []}
    >
      <SubMenu
        key="1"
        title="视频拍摄编辑"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.panel}>
          <SolutionIconOne className={styles.icon} />
          <div className={styles.content}>
            <div className={styles.desc}>
              短视频 SDK 小至 1.5 M，1 天快速对接。同时包含丰富的基础功能，可灵活使用剪辑、拼接、添加滤镜等功能。
            </div>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="2"
        title="视频上传转码"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.panel}>
          <SolutionIconTwo className={styles.icon} />
          <div className={styles.content}>
            <div className={styles.desc}>
              灵活上传，快速转码，提供服务端 H.265 和 H.264 互转码服务。
            </div>
            <div className={styles.desc}>
              相关文档：
              <a
                className={styles.link}
                href="https://developer.qiniu.com/dora/api/1249/real-time-audio-and-video-transcoding-avvod"
                title="实时转码"
              >
                实时转码
              </a>
            </div>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="3"
        title="视频智能分析"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.panel}>
          <SolutionIconThree className={styles.icon} />
          <div className={styles.content}>
            <div className={styles.desc}>
              利用 AI 技术对视频内容进行智能分析。开发者可使用色情识别、暴恐识别、政治人物识别来智能审核视频，大大提高运营效率。
            </div>
            <div className={styles.desc}>
              相关文档：
              <a
                className={styles.link}
                href="/products/dora"
                title="智能多媒体服务"
              >
                智能多媒体服务
              </a>
            </div>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="5"
        title="大数据运营"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.panel}>
          <SolutionIconFive className={styles.icon} />
          <div className={styles.content}>
            <div className={styles.desc}>
              大数据实时监控各个性能指标，同步分析用户行为数据，助力短视频平台完善业务。
            </div>
            <div className={styles.desc}>
              相关文档：
              <a
                className={styles.link}
                href="/products/pandora"
                title="大数据"
              >
                大数据
              </a>
            </div>
          </div>
        </div>
      </SubMenu>
    </Menu>
  )
}
