/**
 * @file 解决方案对应的行业
 * @description 这些行业基本都有一个一一对应的解决方案
 */

import { Industry, Solution, IndustrySolution, isAvailable } from 'constants/solutions'

import logoPingan from './images/logos/pingan.png'
import logoCmb from './images/logos/cmb.png'
import logoTaiping from './images/logos/taiping.png'
import logoZhongxin from './images/logos/zhongxin.png'
import logoYinji from './images/logos/yinji.png'

import logoLiulishuo from './images/logos/liulishuo.png'
import logoYsgq from './images/logos/ysgq.png'
import logoCkjr from './images/logos/ckjr.png'

import logoJili from './images/logos/jili.png'
import logoShangqi from './images/logos/shangqi.png'

import logoXiaogongshu from './images/logos/xiaohongshu.png'
import logoTebaobao from './images/logos/tebaobao.png'
import logoMogujie from './images/logos/mogujie.png'

import logoOppo from './images/logos/oppo.png'
import logoVivo from './images/logos/vivo.png'
import logoShdq from './images/logos/shdq.png'
import logoJingsheng from './images/logos/jingsheng.png'
import logoBubugao from './images/logos/bubugao.png'

import logoBilibili from './images/logos/bilibili.png'
import logoMomo from './images/logos/momo.png'
import logoBlued from './images/logos/blued.png'

import logoYidong from './images/logos/yidong.png'
import logoDianxin from './images/logos/dianxin.png'
import logoLiantong from './images/logos/liantong.png'
import logoZhongxing from './images/logos/zhongxing.png'
import logoHuawei from './images/logos/huawei.png'

export { Industry, industryNameMap, industryEnNameMap } from 'constants/solutions'

/** 与行业对应的场景解决方案（多个） */
export const industrySceneSolutionsMap: { [k in Industry]: Solution[] } = {
  [Industry.Fin]: [Solution.Kodoe, Solution.Qavs],
  [Industry.Edu]: [Solution.Qavs, Solution.Plsv],
  [Industry.Automobile]: [Solution.Ess, Solution.Kodoe, Solution.Qavs],
  [Industry.ECommerce]: [Solution.Qavs, Solution.Plsv],
  [Industry.IntelligentManufacturing]: [Solution.Kodoe, Solution.Qavs, Solution.Ess],
  [Industry.Social]: [Solution.Qavs, Solution.Plsv],
  [Industry.Isp]: [Solution.Kodoe, Solution.Qavs, Solution.Ess]
}

export const industryDescMap: { [k in Industry]: string } = {
  [Industry.Fin]: '帮助金融客户重塑传统 IT 平台架构、科技创新、流程再造，洞察数据价值。',
  [Industry.Edu]: '以出色的技术能力全场景覆盖，实现直播教学、课程回看、师生身份核验等功能，打造满足不同群体的在线学习解决方案。',
  [Industry.Automobile]: '助力汽车行业的数字化升级和转型，创新商业模式，数据驱动降本升效。',
  [Industry.ECommerce]: '以视频促进转化，用所见带动所得。一站式的智能视频云平台，为电商行业提供短视频、直播等多种能力。场景联动，赋能行业客户业务提升。',
  [Industry.IntelligentManufacturing]: '帮助制造行业客户快速落地工业互联网，优选生态，数据驱动智能制造。',
  [Industry.Social]: '不管陌生人还是老朋友，纵使万水千山，即刻就能相见。七牛云为社交行业提供直播、RTC、视频 SDK 等多种能力，以卓越的大视频能力串联「兴趣-交友-人脉」，解锁社交行业的视频新玩法。',
  [Industry.Isp]: '为运营商的中长期架构演进路线提供全方位的技术咨询和一站式方案服务。'
}

type Case = {
  name: string
  logo: string
}

export const industryCasesMap: { [k in Industry]: Case[] } = {
  [Industry.Fin]: [
    { name: '中国平安', logo: logoPingan },
    { name: '招商银行', logo: logoCmb },
    { name: '中国太平', logo: logoTaiping },
    { name: '中信银行', logo: logoZhongxin },
    { name: '银基富力', logo: logoYinji }
  ],
  [Industry.Edu]: [
    { name: '英语流利说', logo: logoLiulishuo },
    { name: '云上钢琴', logo: logoYsgq },
    { name: '', logo: logoCkjr }
  ],
  [Industry.Automobile]: [
    { name: '吉利汽车', logo: logoJili },
    { name: '上汽集团', logo: logoShangqi }
  ],
  [Industry.ECommerce]: [
    { name: '小红书', logo: logoXiaogongshu },
    { name: '特抱抱', logo: logoTebaobao },
    { name: '蘑菇街', logo: logoMogujie }
  ],
  [Industry.IntelligentManufacturing]: [
    { name: 'OPPO', logo: logoOppo },
    { name: 'VIVO', logo: logoVivo },
    { name: '上海电气', logo: logoShdq },
    { name: '晶盛', logo: logoJingsheng },
    { name: '步步高', logo: logoBubugao }
  ],
  [Industry.Social]: [
    { name: 'Bilibili', logo: logoBilibili },
    { name: '陌陌', logo: logoMomo },
    { name: '淡蓝', logo: logoBlued }
  ],
  [Industry.Isp]: [
    { name: '中国移动', logo: logoYidong },
    { name: '中国电信', logo: logoDianxin },
    { name: '中国联通', logo: logoLiantong },
    { name: '中兴', logo: logoZhongxing },
    { name: '华为', logo: logoHuawei }
  ]
}

export const allIndustries = [
  Industry.Fin,
  Industry.Edu,
  Industry.Automobile,
  Industry.ECommerce,
  Industry.IntelligentManufacturing,
  Industry.Social,
  Industry.Isp
]

export function solutionsOf(industry: Industry): Solution[] {
  const industrySolution = industry as unknown as IndustrySolution
  const sceneSolutions = industrySceneSolutionsMap[industry]
  return [industrySolution, ...sceneSolutions].filter(isAvailable)
}
