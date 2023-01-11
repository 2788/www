/**
 * @file 短视频功能大全 Pc 端 index.tsx
 * @description 包含短视频功能大全 Pc 端
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Tabs, { TabPane } from 'components/UI/Tabs'

// 采集处理 tab icon
import funcIconTabOneOne from './func-icon-tab-1/1.png'
import funcIconTabOneTwo from './func-icon-tab-1/2.png'
import funcIconTabOneThree from './func-icon-tab-1/3.png'
import funcIconTabOneFour from './func-icon-tab-1/4.png'
import funcIconTabOneFive from './func-icon-tab-1/5.png'
import funcIconTabOneSix from './func-icon-tab-1/6.png'
import funcIconTabOneSeven from './func-icon-tab-1/7.png'
import funcIconTabOneEight from './func-icon-tab-1/8.png'
import funcIconTabOneNine from './func-icon-tab-1/9.png'
import funcIconTabOneTen from './func-icon-tab-1/10.png'

// 编辑上传 tab icon
import funcIconTabTwoOne from './func-icon-tab-2/1.png'
import funcIconTabTwoTwo from './func-icon-tab-2/2.png'
import funcIconTabTwoThree from './func-icon-tab-2/3.png'
import funcIconTabTwoFour from './func-icon-tab-2/4.png'
import funcIconTabTwoFive from './func-icon-tab-2/5.png'
import funcIconTabTwoSix from './func-icon-tab-2/6.png'
import funcIconTabTwoSeven from './func-icon-tab-2/7.png'
import funcIconTabTwoEight from './func-icon-tab-2/8.png'
import funcIconTabTwoNine from './func-icon-tab-2/9.png'
import funcIconTabTwoTen from './func-icon-tab-2/10.png'

// 服务端功能 tab icon
import funcIconTabThreeOne from './func-icon-tab-3/1.png'
import funcIconTabThreeTwo from './func-icon-tab-3/2.png'
import funcIconTabThreeThree from './func-icon-tab-3/3.png'
import funcIconTabThreeFour from './func-icon-tab-3/4.png'
import funcIconTabThreeFive from './func-icon-tab-3/5.png'
import funcIconTabThreeSix from './func-icon-tab-3/6.png'
import funcIconTabThreeSeven from './func-icon-tab-3/7.png'
import funcIconTabThreeEight from './func-icon-tab-3/8.png'
import funcIconTabThreeNine from './func-icon-tab-3/9.png'
import funcIconTabThreeTen from './func-icon-tab-3/10.png'

// 播放器功能 tab icon
import funcIconTabFourOne from './func-icon-tab-4/1.png'
import funcIconTabFourTwo from './func-icon-tab-4/2.png'
import funcIconTabFourThree from './func-icon-tab-4/3.png'
import funcIconTabFourFour from './func-icon-tab-4/4.png'
import funcIconTabFourFive from './func-icon-tab-4/5.png'
import funcIconTabFourSix from './func-icon-tab-4/6.png'
import funcIconTabFourSeven from './func-icon-tab-4/7.png'
import funcIconTabFourEight from './func-icon-tab-4/8.png'
import funcIconTabFourNine from './func-icon-tab-4/9.png'
import funcIconTabFourTen from './func-icon-tab-4/10.png'

import styles from './style.less'

function Icon({ src }: { src: string }) {
  return (
    <img className={styles.icon} src={src} alt="icon" />
  )
}

export default function Pc() {
  return (
    <Tabs defaultValue="1">
      <TabPane tab="采集处理" value="1">
        <div className={styles.group}>
          <div className={styles.item}>
            <Icon src={funcIconTabOneOne} />
            <p className={styles.desc}>大眼瘦脸</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabOneTwo} />
            <p className={styles.desc}>动态贴纸</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabOneThree} />
            <p className={styles.desc}>AR 特效</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabOneFour} />
            <p className={styles.desc}>倍数拍摄</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabOneFive} />
            <p className={styles.desc}>分段回删</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <Icon src={funcIconTabOneSix} />
            <p className={styles.desc}>美颜滤镜</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabOneSeven} />
            <p className={styles.desc}>面部识别</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabOneEight} />
            <p className={styles.desc}>片头片尾</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabOneNine} />
            <p className={styles.desc}>水印功能</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabOneTen} />
            <p className={styles.desc}>特效字幕</p>
          </div>
        </div>
      </TabPane>
      <TabPane tab="编辑上传" value="2">
        <div className={styles.group}>
          <div className={styles.item}>
            <Icon src={funcIconTabTwoOne} />
            <p className={styles.desc}>抖音特效</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabTwoTwo} />
            <p className={styles.desc}>背景音乐</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabTwoThree} />
            <p className={styles.desc}>配音录制</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabTwoFour} />
            <p className={styles.desc}>时光特效</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabTwoFive} />
            <p className={styles.desc}>本地转码</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <Icon src={funcIconTabTwoSix} />
            <p className={styles.desc}>断点续传</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabTwoSeven} />
            <p className={styles.desc}>视频剪裁</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabTwoEight} />
            <p className={styles.desc}>视频拼接</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabTwoNine} />
            <p className={styles.desc}>音频裁剪</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabTwoTen} />
            <p className={styles.desc}>转场动画</p>
          </div>
        </div>
      </TabPane>
      <TabPane tab="服务端功能" value="3">
        <div className={styles.group}>
          <div className={styles.item}>
            <Icon src={funcIconTabThreeOne} />
            <p className={styles.desc}>播放鉴权</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabThreeTwo} />
            <p className={styles.desc}>CDN 加速</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabThreeThree} />
            <p className={styles.desc}>DRM 数字版权保护</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabThreeFour} />
            <p className={styles.desc}>服务端转码</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabThreeFive} />
            <p className={styles.desc}>回源鉴权</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <Icon src={funcIconTabThreeSix} />
            <p className={styles.desc}>鉴黄监控</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabThreeSeven} />
            <p className={styles.desc}>媒体管理</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabThreeEight} />
            <p className={styles.desc}>秒开支持</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabThreeNine} />
            <p className={styles.desc}>视频存储</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabThreeTen} />
            <p className={styles.desc}>水印功能</p>
          </div>
        </div>
      </TabPane>
      <TabPane tab="播放器功能" value="4">
        <div className={styles.group}>
          <div className={styles.item}>
            <Icon src={funcIconTabFourOne} />
            <p className={styles.desc}>倍数播放</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabFourTwo} />
            <p className={styles.desc}>变速不变调</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabFourThree} />
            <p className={styles.desc}>边下边播</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabFourFour} />
            <p className={styles.desc}>播放缓存</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabFourFive} />
            <p className={styles.desc}>DRM 数字保护</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <Icon src={funcIconTabFourSix} />
            <p className={styles.desc}>H.265</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabFourSeven} />
            <p className={styles.desc}>鉴黄监控</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabFourEight} />
            <p className={styles.desc}>截取封面</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabFourNine} />
            <p className={styles.desc}>秒开支持</p>
          </div>
          <div className={styles.item}>
            <Icon src={funcIconTabFourTen} />
            <p className={styles.desc}>软硬解自动</p>
          </div>
        </div>
      </TabPane>
    </Tabs>
  )
}
