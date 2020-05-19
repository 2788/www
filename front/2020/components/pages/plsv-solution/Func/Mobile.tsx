/**
 * @file 短视频功能大全 Mobile 端 index.tsx
 * @description 包含短视频功能大全 Mobile 端
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { useState } from 'react'

import Menu, { SubMenu } from 'components/UI/Menu'

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
        title="采集处理"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>大眼瘦脸</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>动态贴纸</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>AR 特效</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>倍数拍摄</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>分段回删</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>美颜滤镜</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>面部识别</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>片头片尾</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>水印功能</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>特效字幕</p>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="2"
        title="编辑上传"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>抖音特效</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>背景音乐</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>配音录制</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>时光特效</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>本地转码</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>断点续传</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>视频剪裁</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>视频拼接</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>音频裁剪</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>转场动画</p>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="3"
        title="服务端功能"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>播放鉴权</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>CDN 加速</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>DRM 数字版权保护</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>服务端转码</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>回源鉴权</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>鉴黄监控</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>媒体管理</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>秒开支持</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>视频存储</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>水印功能</p>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="4"
        title="播放器功能"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>倍数播放</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>变速不变调</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>边下边播</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>播放缓存</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>DRM 数字保护</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>H.265</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>鉴黄监控</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>截取封面</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>秒开支持</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>软硬解自动</p>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="5"
        title="远程医疗"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>TODO</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>TODO</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>TODO</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>TODO</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>TODO</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>TODO</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>TODO</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>TODO</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <p className={styles.desc}>TODO</p>
          </div>
          <div className={styles.item}>
            <p className={styles.desc}>TODO</p>
          </div>
        </div>
      </SubMenu>
    </Menu>
  )
}
