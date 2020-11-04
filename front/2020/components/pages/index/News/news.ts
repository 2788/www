/**
 * @file 七牛新闻列表
 * @author zhuhao <zhuhao@qiniu.com>
 */

import { StoryProps } from '.'

import imgStory1 from './images/stories/1.jpg'
import imgStory2 from './images/stories/2.jpg'
import imgStory3 from './images/stories/3.jpg'
import imgStory4 from './images/stories/4.jpg'

export const weiboLink = ''

export const news: StoryProps[] = [
  {
    imgUrl: imgStory1,
    title: '双十一，开始划重点了！',
    desc: '套路千万条，真诚第一条！今年七牛云双十一狂欢节的重点，拿好不谢！',
    date: '2020-11-02',
    link: 'https://blog.qiniu.com/archives/8936?ref=www.qiniu.com',
    wxUrl: 'https://mp.weixin.qq.com/s/QB7YHCj5V_ktSooHKPxgbA'
  },
  {
    imgUrl: imgStory2,
    title: '「四步接入」开启秀场直播，揭秘七牛云互动直播解决方案',
    desc: '七牛云互动直播解决方案全揭秘，特邀主播张永为大家讲解了秀场直播背后的架构及应用到的技术。美女主播诗敏与好友连麦，展示了美颜、瘦脸、贴纸等功能',
    date: '2020-10-26',
    link: 'https://blog.qiniu.com/archives/8934?ref=www.qiniu.com',
    wxUrl: 'https://mp.weixin.qq.com/s/xPR1GymqXQaOHS7OHv0J2w'
  },
  {
    imgUrl: imgStory3,
    title: '上汽集团 X 七牛云：App 化数据分析平台助推智能网联车发展',
    desc: '近几年，全球智能网联汽车产业化步伐明显加快。根据 IDC 发布的《全球智能网联汽车预测报告》，2019 年全球智能网联汽车出货量达到 5110 万辆，与 2018 年相比增长 45.4% 。',
    date: '2020-10-16',
    link: 'https://blog.qiniu.com/archives/8932?ref=www.qiniu.com',
    wxUrl: 'https://mp.weixin.qq.com/s/wa-QOWll1N6Nmag3WsGlsw'
  },
  {
    imgUrl: imgStory4,
    title: '【战略合作】清华同衡城士科技 X 七牛云：以数据驱动园区数字化转型',
    desc: '2020 年 10 月 13 日，上海七牛信息技术有限公司（以下简称“七牛云”）与北京清华同衡城士科技（以下简称“城士科技”）签订战略合作框架协议，将结合云计算、IoT、数据智能等方面展开深入的合作。',
    date: '2020-10-14',
    link: 'https://blog.qiniu.com/archives/8931?ref=www.qiniu.com',
    wxUrl: 'https://mp.weixin.qq.com/s/Fu5Nd9h76FQFH9Xo-jDDyw'
  }
]
