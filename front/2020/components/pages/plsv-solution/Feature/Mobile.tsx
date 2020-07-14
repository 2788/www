/**
 * @file 短视频特色功能 Mobile 端 index.tsx
 * @description 包含短视频特色功能 Mobile 端
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { useState } from 'react'

import Menu, { SubMenu } from 'components/UI/Menu'

import FeatureIconFilter from './feature-icon-filter.svg'
import FeatureIconFace from './feature-icon-face.svg'
import FeatureIconTiktok from './feature-icon-tiktok.svg'
import FeatureIconAR from './feature-icon-ar.svg'
import FeatureIconTime from './feature-icon-time.svg'

import styles from './style.less'

export default function Mobile() {
  const [active, setActive] = useState<string | null>('filter')

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
        key="filter"
        title="专业滤镜"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.subMenu}>
          <FeatureIconFilter className={styles.icon} />
          <div className={styles.desc}>提供专业级实时滤镜特效，接口灵活，可接入第三方效果或定制开发</div>
        </div>
      </SubMenu>
      <SubMenu
        key="face"
        title="人脸识别"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.subMenu}>
          <FeatureIconFace className={styles.icon} />
          <div className={styles.desc}>基于准确的人脸识别提供实时美颜、动态贴纸、大眼瘦脸等功能，实现萌拍效果</div>
        </div>
      </SubMenu>
      <SubMenu
        key="tiktok"
        title="抖音特效"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.subMenu}>
          <FeatureIconTiktok className={styles.icon} />
          <div className={styles.desc}>无需复杂开发，即可实现灵魂出窍、幻觉、抖动等魔性抖音效果</div>
        </div>
      </SubMenu>
      <SubMenu
        key="ar"
        title="AR 特效"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.subMenu}>
          <FeatureIconAR className={styles.icon} />
          <div className={styles.desc}>逼真的 3D 物体绘制、背景替换，轻松实现场景虚拟化效果</div>
        </div>
      </SubMenu>
      <SubMenu
        key="time"
        title="时光轴特效"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.subMenu}>
          <FeatureIconTime className={styles.icon} />
          <div className={styles.desc}>提供时光倒流、延时拍摄、倍速播放等功能</div>
        </div>
      </SubMenu>
    </Menu>
  )
}
