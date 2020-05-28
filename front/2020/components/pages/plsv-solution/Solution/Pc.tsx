/**
 * @file 短视频端到端的解决方案 Pc 端 index.tsx
 * @description 包含短视频端到端的解决方案 Pc 端
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import SolutionIconOne from './solution-icon-one.svg'
import SolutionIconTwo from './solution-icon-two.svg'
import SolutionIconThree from './solution-icon-three.svg'
import SolutionIconFour from './solution-icon-four.svg'
import SolutionIconFive from './solution-icon-five.svg'

import styles from './style.less'

export default function Pc() {
  return (
    <div className={styles.pc}>
      <div className={styles.img}></div>
      <div className={styles.infoWrapper}>
        <div className={styles.group}>
          <div className={styles.item}>
            <SolutionIconOne className={styles.icon} />
            <div className={styles.content}>
              <div className={styles.title}>视频拍摄编辑</div>
              <div className={styles.desc}>
                短视频 SDK 小至 1.5 M，1 天快速对接。同时包含丰富的基础功能，可灵活使用剪辑、拼接、添加滤镜等功能。
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <SolutionIconTwo className={styles.icon} />
            <div className={styles.content}>
              <div className={styles.title}>视频上传转码</div>
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
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <SolutionIconThree className={styles.icon} />
            <div className={styles.content}>
              <div className={styles.title}>视频智能分析</div>
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
          <div className={styles.item}>
            <SolutionIconFour className={styles.icon} />
            <div className={styles.content}>
              <div className={styles.title}>极致播放体验</div>
              <div className={styles.desc}>
                提供免费的播放器 SDK，秒开 200 ms，包体小至 400 K，千万日活验证，给用户畅享流畅无卡顿的视频体验。
              </div>
              <div className={styles.desc}>
                相关文档：
                <a
                  className={styles.link}
                  href="/products/player"
                  title="播放器 SDK"
                >
                  播放器 SDK
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.item}>
            <SolutionIconFive className={styles.icon} />
            <div className={styles.content}>
              <div className={styles.title}>大数据运营</div>
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
        </div>
      </div>
    </div>
  )
}
