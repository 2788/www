/**
 * @file 短视频特色功能 Pc 端 index.tsx
 * @description 包含短视频特色功能 Pc 端
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { useState } from 'react'
import classnames from 'classnames'

import featureIconFilter from './feature-icon-filter.png'
import featureIconFace from './feature-icon-face.png'
import featureIconTiktok from './feature-icon-tiktok.png'
import featureIconAR from './feature-icon-ar.png'
import featureIconTime from './feature-icon-time.png'

import styles from './style.less'

function Icon({ src }: { src: string }) {
  return (
    <img className={styles.tabIcon} src={src} alt="icon" />
  )
}

export default function Pc() {
  const [active, setActive] = useState<string>('filter')

  return (
    <div className={styles.pc}>
      <div className={styles.img}>
        <video
          className={classnames(styles.video, active === 'filter' && styles.active)}
          muted
          loop
          autoPlay
          src="https://dn-mars-assets.qbox.me/lmJftwXMqXYw4wcLzZvwwT34llim"
        ></video>
        <video
          className={classnames(styles.video, active === 'face' && styles.active)}
          muted
          loop
          autoPlay
          src="https://dn-mars-assets.qbox.me/ltftz-CSo0GJo5tIj5DUHKYfj8MT"
        ></video>
        <video
          className={classnames(styles.video, active === 'tiktok' && styles.active)}
          muted
          loop
          autoPlay
          src="https://dn-mars-assets.qbox.me/lhthZWXHQ8D2C3EpHuV7BoHNDBTV"
        ></video>
        <video
          className={classnames(styles.video, active === 'ar' && styles.active)}
          muted
          loop
          autoPlay
          src="https://dn-mars-assets.qbox.me/lqZGmZdqvVd_YOCfPt8UqOweEvMq"
        ></video>
        <video
          className={classnames(styles.video, active === 'time' && styles.active)}
          muted
          loop
          autoPlay
          src="https://dn-mars-assets.qbox.me/ljFVFd7xi0vxI4Wx6VtFTeoWIqaD"
        ></video>
      </div>
      <div className={styles.content}>
        <div className={classnames(styles.item, active === 'filter' && styles.active)}>
          <div className={styles.order}>01</div>
          <div className={styles.info}>
            <div className={styles.title}>专业滤镜</div>
            <div className={styles.desc}>提供专业级实时滤镜特效，接口灵活，可接入第三方效果或定制开发</div>
          </div>
        </div>
        <div className={classnames(styles.item, active === 'face' && styles.active)}>
          <div className={styles.order}>02</div>
          <div className={styles.info}>
            <div className={styles.title}>人脸识别</div>
            <div className={styles.desc}>基于准确的人脸识别提供实时美颜、动态贴纸、大眼瘦脸等功能，实现萌拍效果</div>
          </div>
        </div>
        <div className={classnames(styles.item, active === 'tiktok' && styles.active)}>
          <div className={styles.order}>03</div>
          <div className={styles.info}>
            <div className={styles.title}>抖音特效</div>
            <div className={styles.desc}>无需复杂开发，即可实现灵魂出窍、幻觉、抖动等魔性抖音效果</div>
          </div>
        </div>
        <div className={classnames(styles.item, active === 'ar' && styles.active)}>
          <div className={styles.order}>04</div>
          <div className={styles.info}>
            <div className={styles.title}>AR 特效</div>
            <div className={styles.desc}>逼真的 3D 物体绘制、背景替换，轻松实现场景虚拟化效果</div>
          </div>
        </div>
        <div className={classnames(styles.item, active === 'time' && styles.active)}>
          <div className={styles.order}>05</div>
          <div className={styles.info}>
            <div className={styles.title}>时光轴特效</div>
            <div className={styles.desc}>提供时光倒流、延时拍摄、倍速播放等功能</div>
          </div>
        </div>
        <div className={styles.tabs}>
          <div
            className={classnames(styles.tabItem, active === 'filter' && styles.active)}
            onClick={() => {
              setActive('filter')
            }}
          >
            <Icon src={featureIconFilter} />
            <div className={styles.tabTitle}>专业滤镜</div>
          </div>
          <div
            className={classnames(styles.tabItem, active === 'face' && styles.active)}
            onClick={() => {
              setActive('face')
            }}
          >
            <Icon src={featureIconFace} />
            <div className={styles.tabTitle}>人脸识别</div>
          </div>
          <div
            className={classnames(styles.tabItem, active === 'tiktok' && styles.active)}
            onClick={() => {
              setActive('tiktok')
            }}
          >
            <Icon src={featureIconTiktok} />
            <div className={styles.tabTitle}>抖音特效</div>
          </div>
          <div
            className={classnames(styles.tabItem, active === 'ar' && styles.active)}
            onClick={() => {
              setActive('ar')
            }}
          >
            <Icon src={featureIconAR} />
            <div className={styles.tabTitle}>AR 特效</div>
          </div>
          <div
            className={classnames(styles.tabItem, active === 'time' && styles.active)}
            onClick={() => {
              setActive('time')
            }}
          >
            <Icon src={featureIconTime} />
            <div className={styles.tabTitle}>时光轴特效</div>
          </div>
        </div>
      </div>
    </div>
  )
}
