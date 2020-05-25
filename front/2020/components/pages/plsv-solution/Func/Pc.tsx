/**
 * @file 短视频功能大全 Pc 端 index.tsx
 * @description 包含短视频功能大全 Pc 端
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Tabs, { TabPane } from 'components/UI/Tabs'

// 采集处理 tab icon
import FuncIconTabOneOne from './func-icon-tab-1-1.svg'
import FuncIconTabOneTwo from './func-icon-tab-1-2.svg'
import FuncIconTabOneThree from './func-icon-tab-1-3.svg'
import FuncIconTabOneFour from './func-icon-tab-1-4.svg'
import FuncIconTabOneFive from './func-icon-tab-1-5.svg'
import FuncIconTabOneSix from './func-icon-tab-1-6.svg'
import FuncIconTabOneSeven from './func-icon-tab-1-7.svg'
import FuncIconTabOneEight from './func-icon-tab-1-8.svg'
import FuncIconTabOneNine from './func-icon-tab-1-9.svg'
import FuncIconTabOneTen from './func-icon-tab-1-10.svg'

// 编辑上传 tab icon
import FuncIconTabTwoOne from './func-icon-tab-2-1.svg'
import FuncIconTabTwoTwo from './func-icon-tab-2-2.svg'
import FuncIconTabTwoThree from './func-icon-tab-2-3.svg'
import FuncIconTabTwoFour from './func-icon-tab-2-4.svg'
import FuncIconTabTwoFive from './func-icon-tab-2-5.svg'
import FuncIconTabTwoSix from './func-icon-tab-2-6.svg'
import FuncIconTabTwoSeven from './func-icon-tab-2-7.svg'
import FuncIconTabTwoEight from './func-icon-tab-2-8.svg'
import FuncIconTabTwoNine from './func-icon-tab-2-9.svg'
import FuncIconTabTwoTen from './func-icon-tab-2-10.svg'

// 服务端功能 tab icon
import FuncIconTabThreeOne from './func-icon-tab-3-1.svg'
import FuncIconTabThreeTwo from './func-icon-tab-3-2.svg'
import FuncIconTabThreeThree from './func-icon-tab-3-3.svg'
import FuncIconTabThreeFour from './func-icon-tab-3-4.svg'
import FuncIconTabThreeFive from './func-icon-tab-3-5.svg'
import FuncIconTabThreeSix from './func-icon-tab-3-6.svg'
import FuncIconTabThreeSeven from './func-icon-tab-3-7.svg'
import FuncIconTabThreeEight from './func-icon-tab-3-8.svg'
import FuncIconTabThreeNine from './func-icon-tab-3-9.svg'
import FuncIconTabThreeTen from './func-icon-tab-3-10.svg'

// 播放器功能 tab icon
import FuncIconTabFourOne from './func-icon-tab-4-1.svg'
import FuncIconTabFourTwo from './func-icon-tab-4-2.svg'
import FuncIconTabFourThree from './func-icon-tab-4-3.svg'
import FuncIconTabFourFour from './func-icon-tab-4-4.svg'
import FuncIconTabFourFive from './func-icon-tab-4-5.svg'
import FuncIconTabFourSix from './func-icon-tab-4-6.svg'
import FuncIconTabFourSeven from './func-icon-tab-4-7.svg'
import FuncIconTabFourEight from './func-icon-tab-4-8.svg'
import FuncIconTabFourNine from './func-icon-tab-4-9.svg'
import FuncIconTabFourTen from './func-icon-tab-4-10.svg'

import styles from './style.less'

export default function Pc() {
  return (
    <Tabs defaultValue="1">
      <TabPane tab="采集处理" value="1">
        <div className={styles.group}>
          <div className={styles.item}>
            <FuncIconTabOneOne className={styles.icon} />
            <p className={styles.desc}>大眼瘦脸</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabOneTwo className={styles.icon} />
            <p className={styles.desc}>动态贴纸</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabOneThree className={styles.icon} />
            <p className={styles.desc}>AR 特效</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabOneFour className={styles.icon} />
            <p className={styles.desc}>倍数拍摄</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabOneFive className={styles.icon} />
            <p className={styles.desc}>分段回删</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <FuncIconTabOneSix className={styles.icon} />
            <p className={styles.desc}>美颜滤镜</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabOneSeven className={styles.icon} />
            <p className={styles.desc}>面部识别</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabOneEight className={styles.icon} />
            <p className={styles.desc}>片头片尾</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabOneNine className={styles.icon} />
            <p className={styles.desc}>水印功能</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabOneTen className={styles.icon} />
            <p className={styles.desc}>特效字幕</p>
          </div>
        </div>
      </TabPane>
      <TabPane tab="编辑上传" value="2">
        <div className={styles.group}>
          <div className={styles.item}>
            <FuncIconTabTwoOne className={styles.icon} />
            <p className={styles.desc}>抖音特效</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabTwoTwo className={styles.icon} />
            <p className={styles.desc}>背景音乐</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabTwoThree className={styles.icon} />
            <p className={styles.desc}>配音录制</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabTwoFour className={styles.icon} />
            <p className={styles.desc}>时光特效</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabTwoFive className={styles.icon} />
            <p className={styles.desc}>本地转码</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <FuncIconTabTwoSix className={styles.icon} />
            <p className={styles.desc}>断点续传</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabTwoSeven className={styles.icon} />
            <p className={styles.desc}>视频剪裁</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabTwoEight className={styles.icon} />
            <p className={styles.desc}>视频拼接</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabTwoNine className={styles.icon} />
            <p className={styles.desc}>音频裁剪</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabTwoTen className={styles.icon} />
            <p className={styles.desc}>转场动画</p>
          </div>
        </div>
      </TabPane>
      <TabPane tab="服务端功能" value="3">
        <div className={styles.group}>
          <div className={styles.item}>
            <FuncIconTabThreeOne className={styles.icon} />
            <p className={styles.desc}>播放鉴权</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabThreeTwo className={styles.icon} />
            <p className={styles.desc}>CDN 加速</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabThreeThree className={styles.icon} />
            <p className={styles.desc}>DRM 数字版权保护</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabThreeFour className={styles.icon} />
            <p className={styles.desc}>服务端转码</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabThreeFive className={styles.icon} />
            <p className={styles.desc}>回源鉴权</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <FuncIconTabThreeSix className={styles.icon} />
            <p className={styles.desc}>鉴黄监控</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabThreeSeven className={styles.icon} />
            <p className={styles.desc}>媒体管理</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabThreeEight className={styles.icon} />
            <p className={styles.desc}>秒开支持</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabThreeNine className={styles.icon} />
            <p className={styles.desc}>视频存储</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabThreeTen className={styles.icon} />
            <p className={styles.desc}>水印功能</p>
          </div>
        </div>
      </TabPane>
      <TabPane tab="播放器功能" value="4">
        <div className={styles.group}>
          <div className={styles.item}>
            <FuncIconTabFourOne className={styles.icon} />
            <p className={styles.desc}>倍数播放</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabFourTwo className={styles.icon} />
            <p className={styles.desc}>变速不变调</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabFourThree className={styles.icon} />
            <p className={styles.desc}>边下边播</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabFourFour className={styles.icon} />
            <p className={styles.desc}>播放缓存</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabFourFive className={styles.icon} />
            <p className={styles.desc}>DRM 数字保护</p>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <FuncIconTabFourSix className={styles.icon} />
            <p className={styles.desc}>H.265</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabFourSeven className={styles.icon} />
            <p className={styles.desc}>鉴黄监控</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabFourEight className={styles.icon} />
            <p className={styles.desc}>截取封面</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabFourNine className={styles.icon} />
            <p className={styles.desc}>秒开支持</p>
          </div>
          <div className={styles.item}>
            <FuncIconTabFourTen className={styles.icon} />
            <p className={styles.desc}>软硬解自动</p>
          </div>
        </div>
      </TabPane>
    </Tabs>
  )
}
