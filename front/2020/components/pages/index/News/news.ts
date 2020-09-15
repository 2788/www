/**
 * @file 七牛新闻列表
 * @author zhuhao <zhuhao@qiniu.com>
 */

import { StoryProps } from '.'

import imgStory1 from './images/stories/1.png'
import imgStory2 from './images/stories/2.jpg'
import imgStory3 from './images/stories/3.png'
import imgStory4 from './images/stories/4.jpg'

export const weiboLink = ''

export const news: StoryProps[] = [
  {
    imgUrl: imgStory1,
    title: '七牛云正式加入 CNCF，积极推动云原生全球发展',
    desc: '七牛云正式加入云原生计算基金会 Cloud Native Computing Foundation (CNCF)，成为 CNCF 共建云社区的全球重要合作伙伴。',
    date: '2020-07-14',
    link: 'https://blog.qiniu.com/archives/8910?ref=www.qiniu.com',
    wxUrl: 'https://mp.weixin.qq.com/s?__biz=MjM5NzAwNDI4Mg==&mid=2652197963&idx=1&sn=d2ec2dfc5946945a4efd0da80f66beba&chksm=bd0162de8a76ebc8dddff7a3ff466e684f623ac46920336e1c2ea3d0a7f28b79199d40df2782&token=1786778896&lang=zh_CN#rd'
  },
  {
    imgUrl: imgStory2,
    title: '七牛云视频监控：贝鲁特爆炸警示录，安全生产容不得「意外火花」',
    desc: '「黎巴嫩贝鲁特重大爆炸事件，再次给我们敲响了警钟。」8 月 5 日，国务院安委会办公室、应急管理部召开全国安全生产专题视频会议，深刻吸取黎巴嫩贝鲁特重大爆炸事件教训。',
    date: '2020-09-02',
    link: 'https://blog.qiniu.com/archives/8923?ref=www.qiniu.com',
    wxUrl: 'https://mp.weixin.qq.com/s/0OUhXCdbed-eVdZ4E0lJcA'
  },
  {
    imgUrl: imgStory3,
    title: '七牛云完成 F 轮 10 亿人民币融资，持续打造云上数据价值',
    desc: '6 月 16 日，行业领先的第三方独立云计算及数据服务提供商七牛云宣布完成新一轮 10 亿人民币 F 轮融资，本轮融资由中国国有企业结构调整基金、交银国际、宏兆基金共同投资｡',
    date: '2020-06-16',
    link: 'https://blog.qiniu.com/archives/8899?ref=www.qiniu.com',
    wxUrl: 'https://mp.weixin.qq.com/s?__biz=MjM5NzAwNDI4Mg==&mid=2652197607&idx=1&sn=b66078376784f95e40f29240960ae228&chksm=bd0164728a76ed64cb8c7526475d3bc41e63f67bb781d2d7d5473c0f0578c5367844ae13c3dd&token=911446648&lang=zh_CN#rd'
  },
  {
    imgUrl: imgStory4,
    title: '星芽 X 七牛云：全民直播时代，一个 ID 解决所有技术问题',
    desc: '随着移动互联网的高速发展，直播几乎渗透到我们生活的每个角落。疫情期间，直播更是成为人们与外界沟通的重要桥梁。',
    date: '2020-08-28',
    link: 'https://blog.qiniu.com/archives/8921?ref=www.qiniu.com',
    wxUrl: 'https://mp.weixin.qq.com/s/y5aNorHPRJIPwQT-r--n3A'
  }
]
