import React from 'react'
import { CardProps, CustomProduct } from 'components/pages/cloud-sql/Product'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'

const products: CardProps[][] = [
  [
    {
      icon: <Icon1 />,
      title: 'DDoS 基础防护',
      desc: '免费为云上用户提供基础 500 M ~ 5 G DDoS 防护服务，默认自动开启，免安装、免维护。',
      href: 'https://developer.qiniu.com/qvm/manual/6945/ddos-based-protective-black-hole-threshold'
    },
    {
      icon: <Icon2 />,
      title: 'DDoS 高防 IP',
      desc: '针对游戏、金融以及网站等业务遭受大流量 DDoS 攻击导致用户服务不可用的情况而推出的付费防护服务。购买后只需配置绑定高防 IP，同样适用于配合非七牛云主机使用。',
      href: 'https://developer.qiniu.com/qvm/manual/4994/ddos-product-overview'
    },
    {
      icon: <Icon3 />,
      title: '新 BGP 高防 IP',
      desc: '为 DDoS 高防 IP 的升级版，提供更大带宽，更强清洗能力的抗 DDoS 服务。',
      href: 'https://developer.qiniu.com/qvm/manual/6098/new-bgp-high-ip'
    }
  ]
]
export default function DdosProduct() {
  return <CustomProduct data={products} title="产品分类" />
}
