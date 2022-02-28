import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import img1 from './images/scene1.png'
import img2 from './images/scene2.png'
import img3 from './images/scene3.png'
import img4 from './images/scene4.png'
import img5 from './images/scene5.png'
import img6 from './images/scene6.png'

import style from './index.less'

const scenes = [
  {
    imgUrl: img1,
    title: '连麦 PK',
    desc: '两个或多个主播进行连麦，隔空在线 PK，燃爆直播间气氛，各路粉丝一起嗨。',
    advantages: [
      '支持主播和观众频繁的上下麦操作，无感平滑过渡',
      '支持万人级别超大房间，50 名主播同时在线喊麦',
      '支持一键式跨房间连麦，告别繁琐的连麦步骤',
      '支持 RTC 观众与 CDN 观众同时在线，同步对决'
    ]
  },
  {
    imgUrl: img2,
    title: '视频交友',
    desc: '在线视频配对、红娘开台牵线、男女嘉宾连麦互动，观众围观点评。',
    advantages: [
      '300 ms 超低延迟，尊享实时互动体验',
      '美颜特效组件，可快速接入，既要美又要有趣',
      '超强实时网络，高清视频不卡顿，开启线上交友新时代'
    ]
  },
  {
    imgUrl: img3,
    title: '语聊房',
    desc: '互动播客，多人语聊、组队游戏、剧本杀、狼人杀，见面不如听声。声音，让人生有更多奇趣。',
    advantages: [
      '自研 3A 算法，支持高音质全频带采样',
      '支持接入变声，大叔音、萝莉音，让声音更有趣',
      '支持焦点语音，凸显发言人',
      '支持语音审核，保障平台内容安全'
    ]
  },
  {
    imgUrl: img4,
    title: 'FM 电台',
    desc: '语音电台，唱歌、讲故事、陪聊哄睡、情感咨询等多场景使用，听众可与主播连麦互动。',
    advantages: [
      '自研 3A 算法，支持高音质全频带采样',
      '支持接入变声，大叔音、萝莉音，让声音更有趣',
      '支持背景音乐和音效，渲染电台气氛'
    ]
  },
  {
    imgUrl: img5,
    title: '在线 KTV',
    desc: '多人连麦 K 歌，进行合唱、翻唱、点歌、排麦、轮唱、抢唱等玩法。',
    advantages: [
      '自研 3A 算法，支持高音质全频带采样',
      '支持歌词同步、升降调等 K 歌场景专属功能',
      '支持接入变声、美声、混响等，让歌唱更有氛围感'
    ]
  },
  {
    imgUrl: img6,
    title: '一起看视频',
    desc: '邀请好友一起在线追剧、看电影，或做个主持人与观众一同看比赛，在线人生，精彩纷呈。',
    advantages: [
      '支持音视频文件在线播放，多人连麦在线同步观看',
      '支持毫秒级延迟万人大房间，赛事个人解说趣味多',
      '支持超高清实时音视频传输，保证视听体验'
    ]
  }
]

export default function MediaSocialScene() {
  return (
    <Scene name="scene" title="适用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} key={index} className={style.scenePanel}>
            <SceneBlock blockType="fixed" className={style.bolckLeft}>
              <img src={scene.imgUrl} className={style.sceneIcon} />
            </SceneBlock>
            <SceneBlock className={style.blockRight} withoutMargin>
              <h3 className={style.title}>{scene.title}</h3>
              <p>{scene.desc}</p>
              <h4 className={style.subTitle}>方案优势</h4>
              <ul className={style.list}>
                {
                  scene.advantages.map((advantage, i) => (
                    <li className={style.item} key={i}>{advantage}</li>
                  ))
                }
              </ul>
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
