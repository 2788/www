import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureIcon
} from 'components/Product/Feature'

import icon1 from './images/icon1.png'
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'
import icon4 from './images/icon4.png'
import icon5 from './images/icon5.png'
import icon6 from './images/icon6.png'
import icon7 from './images/icon7.png'
import icon8 from './images/icon8.png'
import icon9 from './images/icon9.png'

export default function RiskControlFunctions() {
  return (
    <Feature name="functions" title="产品功能">
      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIcon src={icon1} alt="先享后付" />}
          title="先享后付"
        >
          <FeatureDesc>基于用户行为分析，有效识别逃单、恶意退款、无法履约等风险用户，在出行、电商、租赁平台等先享后付场景有较好的识别效果。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIcon src={icon2} alt="汽车金融" />}
          title="汽车金融"
        >
          <FeatureDesc>基于“人+车+场景”的维度进行风险识别，针对二手车买卖、车抵贷、融资租赁等场景，能够有效识别识别车主风险信息及车辆异常信息。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIcon src={icon3} alt="信贷风险洞察" />}
          title="信贷风险洞察"
        >
          <FeatureDesc>专注于识别金融业务申请、贷中监控中的履约风险，准确识别恶意用户与行为，帮助银行/信托/保险/消金/小贷等金融行业客户提升风险识别能力，降低企业损失。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIcon src={icon4} alt="申请欺诈防护" />}
          title="申请欺诈防护"
        >
          <FeatureDesc>针对常规业务申请场景，对申请人的行为进行实时风险评估，解决租赁/消费分期/出行/电商/等互联网行业客户在支付、理财、风控等业务环节遇到的欺诈威胁。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIcon src={icon5} alt="租赁风控" />}
          title="租赁风控"
        >
          <FeatureDesc>针对 3C 租赁业务申请场景，实时识别申请人租赁履约欺诈风险。帮助租赁平台客户提高风控能力。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIcon src={icon6} alt="注册保护" />}
          title="注册保护"
        >
          <FeatureDesc>针对游戏/电商/出行/教育/生活服务/社交/医疗/租赁平台/等互联网行业用户注册场景，有效识别批量注册、手机黑卡注册等恶意注册行为。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIcon src={icon7} alt="账户保护" />}
          title="账户保护"
        >
          <FeatureDesc>针对互联网业务各类操作场景，通过用户时序和异常分析，有效识别账户盗用行为。</FeatureDesc>
        </FeatureItem>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIcon src={icon8} alt="营销保护" />}
          title="营销保护"
        >
          <FeatureDesc>在营销活动环节中，有效识别薅羊毛、黄牛抢票、恶意秒杀、恶意抢红包等营销欺诈行为，保障商户营销效果。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          pos="left-right"
          icon={<FeatureIcon src={icon9} alt="营销价值分层" />}
          title="营销价值分层"
        >
          <FeatureDesc>针对营销场景，实时识别用户营销价值，提高商户营销效果。</FeatureDesc>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
