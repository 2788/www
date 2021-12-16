import { CSSProperties } from 'react'
import { Solution, nameMap, descMap, urlMap } from 'constants/solutions'

import finIcon from './images/icons/fin.png'
import finBackgroundImg from './images/backgroundImgs/fin.png'

import autoIcon from './images/icons/auto.png'
import autoBackgroundImg from './images/backgroundImgs/auto.png'

import geneIcon from './images/icons/gene.png'
import geneBackgroundImg from './images/backgroundImgs/gene.png'

import imIcon from './images/icons/im.png'
import imBackgroundImg from './images/backgroundImgs/im.png'

import entertainmentIcon from './images/icons/entertainment.png'
import entertainmentBackgroundImg from './images/backgroundImgs/entertainment.png'

import socialIcon from './images/icons/social.png'
import socialBackgroundImg from './images/backgroundImgs/social.png'

import ecIcon from './images/icons/ec.png'
import ecBackgroundImg from './images/backgroundImgs/ec.png'

import eduIcon from './images/icons/edu.png'
import eduBackgroundImg from './images/backgroundImgs/edu.png'

import bilibili from './images/cases/bilibili.png'
import blued from './images/cases/blued.png'
import ckjr from './images/cases/ckjr.png'
import ddpai from './images/cases/ddpai.png'
import dongqiudi from './images/cases/dongqiudi.png'
import fm from './images/cases/fm.png'
import geely from './images/cases/geely.png'
import iqiyi from './images/cases/iqiyi.png'
import liulishuo from './images/cases/liulishuo.png'
import mogujie from './images/cases/mogujie.png'
import oppo from './images/cases/oppo.png'
import secoo from './images/cases/secoo.png'
import shangqi from './images/cases/shangqi.png'
import shdq from './images/cases/shdq.png'
import taiping from './images/cases/taiping.png'
import vivo from './images/cases/vivo.png'
import xiaohongshu from './images/cases/xiaohongshu.png'
import zhaoshang from './images/cases/zhaoshang.png'
import zhongxin from './images/cases/zhongxin.png'

export const defaultBgStyle: CSSProperties = {
  backgroundImage: undefined,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}

export type CardProps = {
  iconUrl: string
  backgroundImgUrl: string
  title: string
  desc: string
  url: string | null
  cases: string[]
}

export const cardData: CardProps[] = [
  {
    iconUrl: finIcon,
    backgroundImgUrl: finBackgroundImg,
    title: nameMap[Solution.Fin],
    desc: descMap[Solution.Fin],
    url: urlMap[Solution.Fin],
    cases: [taiping, zhaoshang, zhongxin]
  },
  {
    iconUrl: autoIcon,
    backgroundImgUrl: autoBackgroundImg,
    title: nameMap[Solution.Automobile],
    desc: descMap[Solution.Automobile],
    url: urlMap[Solution.Automobile],
    cases: [geely, shangqi, ddpai]
  },
  {
    iconUrl: geneIcon,
    backgroundImgUrl: geneBackgroundImg,
    title: nameMap[Solution.Gene],
    desc: descMap[Solution.Gene],
    url: urlMap[Solution.Gene],
    cases: []
  },
  {
    iconUrl: imIcon,
    backgroundImgUrl: imBackgroundImg,
    title: nameMap[Solution.IntelligentManufacturing],
    desc: descMap[Solution.IntelligentManufacturing],
    url: urlMap[Solution.IntelligentManufacturing],
    cases: [oppo, vivo, shdq]
  },
  {
    iconUrl: entertainmentIcon,
    backgroundImgUrl: entertainmentBackgroundImg,
    title: nameMap[Solution.Entertainment],
    desc: descMap[Solution.Entertainment],
    url: urlMap[Solution.Entertainment],
    cases: [iqiyi, dongqiudi]
  },
  {
    iconUrl: socialIcon,
    backgroundImgUrl: socialBackgroundImg,
    title: nameMap[Solution.Social],
    desc: descMap[Solution.Social],
    url: urlMap[Solution.Social],
    cases: [bilibili, blued]
  },
  {
    iconUrl: ecIcon,
    backgroundImgUrl: ecBackgroundImg,
    title: nameMap[Solution.ECommerce],
    desc: descMap[Solution.ECommerce],
    url: urlMap[Solution.ECommerce],
    cases: [xiaohongshu, mogujie, secoo]
  },
  {
    iconUrl: eduIcon,
    backgroundImgUrl: eduBackgroundImg,
    title: nameMap[Solution.Edu],
    desc: descMap[Solution.Edu],
    url: urlMap[Solution.Edu],
    cases: [liulishuo, ckjr, fm]
  }
]
