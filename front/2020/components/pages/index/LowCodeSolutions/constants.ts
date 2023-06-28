import { CSSProperties } from 'react'

import { Solution, urlMap } from 'constants/solutions'

import bg1 from './images/backgroundImgs/私域营销直播.jpg'
import bg2 from './images/backgroundImgs/智能媒资.jpg'
import bg3 from './images/backgroundImgs/影视制作后期.jpg'
import bg4 from './images/backgroundImgs/智能摄像头上云.jpg'
import bg5 from './images/backgroundImgs/金融智能双录.jpg'
import bg6 from './images/backgroundImgs/互动直播低代码.jpg'
import bg7 from './images/backgroundImgs/基因数据存储.jpg'

import icon1 from './images/icons/私域营销直播.png'
import icon2 from './images/icons/智能媒资.png'
import icon3 from './images/icons/影视制作后期.png'
import icon4 from './images/icons/智能摄像头上云.png'
import icon5 from './images/icons/金融智能双录.png'
import icon6 from './images/icons/互动直播低代码.png'
import icon7 from './images/icons/基因数据存储.png'

import case1_1 from './images/cases/复星健康.jpg'
import case1_2 from './images/cases/松下电器.jpg'
import case1_3 from './images/cases/东莞证券.jpg'
import case2_1 from './images/cases/人民网.jpg'
import case2_2 from './images/cases/东方网.jpg'
import case3 from './images/cases/乐田娱乐.jpg'
import case4_1 from './images/cases/ddpai.jpg'
import case4_2 from './images/cases/上汽大通.jpg'
import case5 from './images/cases/新致软件.jpg'
import case6 from './images/cases/华商头条.jpg'
import case7 from './images/cases/裕策生物.jpg'

export const defaultBgStyle: CSSProperties = {
  backgroundImage: undefined,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}

export type CardProps = {
  backgroundImgUrl: string
  title: string
  desc: string
  url: string | null
  icon: string
  cases: string[]
}

export const cardData: CardProps[] = [
  {
    backgroundImgUrl: bg1,
    title: '私域营销直播',
    desc: '帮助企业快速集成和接入直播服务，促进私域流量沉淀',
    url: urlMap[Solution.EntLive],
    cases: [case1_1, case1_2, case1_3],
    icon: icon1
  },
  {
    backgroundImgUrl: bg2,
    title: '智能媒资',
    desc: '结合 AI 识别技术提供智能化场景识别、自动化标签识别、智能化多级编目，为广电新媒体及专业院校提供集视频采集、处理、审核、分发为一体的一站式智能化媒体资产管理方案',
    url: null,
    cases: [case2_1, case2_2],
    icon: icon2
  },
  {
    backgroundImgUrl: bg3,
    title: '影视制作后期',
    desc: '帮助影视制作公司利用 AI 识别技术将拍摄的音视频素材自动生成Xml时间线剪辑文件，快速完成剪辑后期制作',
    url: null,
    cases: [case3],
    icon: icon3
  },
  {
    backgroundImgUrl: bg4,
    title: '智能摄像头上云',
    desc: '提供摄像头音视频流接入、存储、分发、录制回放，基于AI 能力实现物体识别和智能视频分析，广泛应用于车载智能监控、智慧园区、智慧门店等场景',
    url: null,
    cases: [case4_1, case4_2],
    icon: icon4
  },
  {
    backgroundImgUrl: bg5,
    title: '金融智能双录',
    desc: '基于实时音视频和 AI 能力研制的一站式音视频内容录制、检测及审核解决方案，解决保险公司及中介、银行、汽车金融等企业在双录时体验及效率难题',
    url: null, // urlMap[Solution.Fin], // 临时下掉
    cases: [case5],
    icon: icon5
  },
  {
    backgroundImgUrl: bg6,
    title: '互动直播低代码',
    desc: '集成直播列表、观众连麦、主播PK、弹幕消息、直播带货等一系列产品能力，搭建快、功能全，最快10行代码，一键开启互动直播，灵活满足业务需求',
    url: urlMap[Solution.Rtclive],
    cases: [case6],
    icon: icon6
  },
  {
    backgroundImgUrl: bg7,
    title: '基因数据存储',
    desc: '帮助基因行业企业构建完备的本地端、云端计算存储分析系统，满足基因数据及药物研发数据分析对于存储系统的性能多样性需求',
    url: urlMap[Solution.Gene],
    cases: [case7],
    icon: icon7
  }
]
