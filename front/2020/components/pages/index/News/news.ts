/**
 * @file 七牛新闻列表
 * @author zhuhao <zhuhao@qiniu.com>
 */

import { StoryProps } from '.'

import Story1Img from './images/stories/story1.png'
import Story2Img from './images/stories/story2.png'
import Story3Img from './images/stories/story3.png'
import Story4Img from './images/stories/story4.png'

export const weiboLink = ''

export const news: StoryProps[] = [
  {
    imgUrl: Story1Img,
    title: '银行如何借助机器数据分析平台，避免银保监再开巨额罚单？',
    desc: '近日，8 家银行因监管数据报送存在严重纰漏，被银保监会连开 9 张罚单。',
    date: '2020-05-21',
    // todo: 改成博客站的地址
    link: 'https://mp.weixin.qq.com/s?__biz=MjM5NzAwNDI4Mg==&mid=2652197481&idx=1&sn=1904a09702ebe5b78a3a809d8d4349f3&chksm=bd0164fc8a76edea7118e93fbd57da0b0b28dca1e8894d8bd801c4988feb8ded58f948c34e2b&token=2109201824&lang=zh_CN#rd',
    wxUrl: 'https://mp.weixin.qq.com/s?__biz=MjM5NzAwNDI4Mg==&mid=2652197481&idx=1&sn=1904a09702ebe5b78a3a809d8d4349f3&chksm=bd0164fc8a76edea7118e93fbd57da0b0b28dca1e8894d8bd801c4988feb8ded58f948c34e2b&token=2109201824&lang=zh_CN#rd'
  },
  {
    imgUrl: Story2Img,
    title: 'InfoQ对话七牛云CEO许式伟：在极客与商业的夹缝中蜕变',
    desc: '我们是谁？这是从去年开始，反复萦绕在许式伟脑海中的问题。创业八年来，许式伟一直坚信技术的力量。然而，一路披荆斩棘到了 2019 年，面对行业竞争的日渐白热化，他开始重新审视七牛云面对的市场环境，不断问自己：七牛云是谁？应该给客户提供什么样的价值？',
    date: '2020-04-22',
    // todo: 改成博客站的地址
    link: 'https://mp.weixin.qq.com/s?__biz=MjM5NzAwNDI4Mg==&mid=2652197445&idx=1&sn=1de3cadb1a9b8022de70cab1030f9026&chksm=bd0164d08a76edc660a74883f5e6c59c66f4fef02d0eafc07244aac822e131aca7b54bcb6111#rd',
    wxUrl: 'https://mp.weixin.qq.com/s?__biz=MjM5NzAwNDI4Mg==&mid=2652197445&idx=1&sn=1de3cadb1a9b8022de70cab1030f9026&chksm=bd0164d08a76edc660a74883f5e6c59c66f4fef02d0eafc07244aac822e131aca7b54bcb6111#rd'
  },
  {
    imgUrl: Story3Img,
    title: '视频特效SDK，直播行业里的「颜值即正义」',
    desc: '今年春节之后，大家对「新年新气象」一定有了更深刻的理解。整天在家抱着屏幕的不一定是阿宅，可能是远程开会的白领，直播间带货的不一定是网红，可能是村官在「为家乡代言」；张大妈在客厅和老姐妹们视频跳起了广场舞，小学生已然对着 iPad 上完了一学期的课。云逛街、云看房、云买车、云上课、云看病，以视频直播为载体，摄像头连接起人们生活的方方面面。',
    date: '2020-04-30',
    // todo: 改成博客站的地址
    link: 'https://mp.weixin.qq.com/s?__biz=MjM5NzAwNDI4Mg==&mid=2652197455&idx=1&sn=a47e7efdfb9533da4bf2695eedfef521&chksm=bd0164da8a76edcce5aebbc7dc8270f3edcecce21230d484d3f60e8306d01be9e2c536de8294#rd',
    wxUrl: 'https://mp.weixin.qq.com/s?__biz=MjM5NzAwNDI4Mg==&mid=2652197455&idx=1&sn=a47e7efdfb9533da4bf2695eedfef521&chksm=bd0164da8a76edcce5aebbc7dc8270f3edcecce21230d484d3f60e8306d01be9e2c536de8294#rd'
  },
  {
    imgUrl: Story4Img,
    title: '八年深耕，七牛云为企业提供一站式专业视频云服务',
    desc: '近日，国务院发展研究中心国际技术经济研究所在《中国智能化转型与技术创新高层研讨会》中预测，2023 年中国云计算产业规模将超过 3000 亿人民币。其中，中国政府和企业上云率将超过 60%，全站自主可控计算平台将成为政府和大型企业的主流 IT 基础设施。',
    date: '2020-04-13',
    // todo: 改成博客站的地址
    link: 'https://mp.weixin.qq.com/s?__biz=MjM5NzAwNDI4Mg==&mid=2652197440&idx=1&sn=c8bad93faeb54a7f58bcb6bc766873c0&chksm=bd0164d58a76edc32ca67bba575c5466ba9fa0ff7d08a68169e3971071313553e9fb78a09c48#rd',
    wxUrl: 'https://mp.weixin.qq.com/s?__biz=MjM5NzAwNDI4Mg==&mid=2652197440&idx=1&sn=c8bad93faeb54a7f58bcb6bc766873c0&chksm=bd0164d58a76edc32ca67bba575c5466ba9fa0ff7d08a68169e3971071313553e9fb78a09c48#rd'
  }
]
