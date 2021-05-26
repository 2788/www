import React, { ReactNode } from 'react'

import { useMobile } from 'hooks/ua'

import ForMobile from './Mobile'
import ForPc from './Pc'

import ImageIcon1 from './images/image/icon1.svg'
import ImageIcon2 from './images/image/icon2.svg'
import ImageIcon3 from './images/image/icon3.svg'
import ImageIcon4 from './images/image/icon4.svg'
import ImageIcon5 from './images/image/icon5.svg'
import ImageIcon6 from './images/image/icon6.svg'
import ImageIcon7 from './images/image/icon7.svg'
import ImageIcon8 from './images/image/icon8.svg'
import ImageIcon9 from './images/image/icon9.svg'
import ImageIcon10 from './images/image/icon10.svg'

import VideoIcon1 from './images/video/icon1.svg'
import VideoIcon2 from './images/video/icon2.svg'
import VideoIcon3 from './images/video/icon3.svg'

import AudioIcon1 from './images/audio/icon1.svg'
import AudioIcon2 from './images/audio/icon2.svg'
import AudioIcon3 from './images/audio/icon3.svg'
import AudioIcon4 from './images/audio/icon4.svg'

import TextIcon1 from './images/text/icon1.svg'
import TextIcon2 from './images/text/icon2.svg'
import TextIcon3 from './images/text/icon3.svg'

export enum Type {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  Text = 'text'
}

export const textMap = {
  [Type.Image]: '图片',
  [Type.Video]: '视频',
  [Type.Audio]: '音频',
  [Type.Text]: '文本'
} as const

export const typeArr = [Type.Image, Type.Video, Type.Audio, Type.Text]

export type CardProps = {
  icon: ReactNode
  title: string
  desc: ReactNode
  href: string
}

const dataMap = {
  [Type.Image]: [
    {
      icon: <ImageIcon1 />,
      title: '阿里图片审核',
      desc: '图片审核能够有效帮助您检测出您的图片中是否存在违规的风险内容，支持识别的类型包括色情，暴恐，广告，二维码，不良场景和图片 logo 识别。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/ali-image-audit/quickstart'
    },
    {
      icon: <ImageIcon2 />,
      title: '数美图片审核',
      desc: '图片审核功能基于先进的人工智能技术，精准高效识别涉政、色情、暴恐、广告、水印 logo，不良场景等违规内容，帮助您提前防御内容风险，提高审核效率，净化网络环境，提升用户体验。',
      href: 'https://developer.qiniu.com/dora/7758/several-beautiful-photos-review'
    },
    {
      icon: <ImageIcon3 />,
      title: '图谱图片鉴黄',
      desc: '图片鉴黄服务帮您判断保存在七牛云的图片是属于色情、性感还是正常。根据该服务提供商的评测结果显示，鉴别的准确度超过 99.5%，可以替代 80% 以上的人工审核，并且机器可以通过不断学习提高鉴别的准确度。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/nrop/quickstart'
    },
    {
      icon: <ImageIcon4 />,
      title: '图谱图片鉴暴恐',
      desc: (
        <>
          图片鉴暴恐服务 terror，为保存在七牛云的图片，根据以下特征识别暴恐和非暴恐的图片：
          <br />
          暴恐标志：暴恐组织的符号或者旗帜，如星月旗，雪山狮子旗等。
          <br />
          特定人物：人持枪支，特定穿着人物（迷彩服、蒙面）。
        </>
      ),
      href: 'https://portal.qiniu.com/dora/thirdparty/create/terror/quickstart'
    },
    {
      icon: <ImageIcon5 />,
      title: '图谱广告过滤',
      desc: '广告过滤服务 ad 帮您判断保存在七牛云的图片是否属于广告。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/ad/quickstart'
    },
    {
      icon: <ImageIcon6 />,
      title: '图谱广告过滤增强版',
      desc: '广告过滤服务增强版能够帮您有效判断保存在七牛云的带文字图片是否属于广告，如果图片被识别为带有文字，会将对应的文字内容识别出来反馈给您，您可以方便的根据文本信息去判断是否是广告内容。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/ad-plus/quickstart'
    },
    {
      icon: <ImageIcon7 />,
      title: 'Versa 风格迁移',
      desc: '风格迁移服务能够有效的将图片与风格转换成目标图片风格。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/mkr_style_trans/quickstart'
    },
    {
      icon: <ImageIcon8 />,
      title: 'Versa 人像分割',
      desc: '人物分割服务能够帮您有效的把图片中人物与背景单独分离开。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/mkr_seg_human/quickstart'
    },
    {
      icon: <ImageIcon9 />,
      title: 'Versa 实例分割',
      desc: '实例分割服务能够有效的将图片中不同实例分别与背景分离。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/mkr_seg_ins/quickstart'
    },
    {
      icon: <ImageIcon10 />,
      title: 'Versa 智能填充',
      desc: '智能填充服务能够有效的将图像中的指定区域进行修复重建或者去除图像中的多余物体。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/mkr_inpainting/quickstart'
    }
  ],
  [Type.Video]: [
    {
      icon: <VideoIcon1 />,
      title: '数美视频流审核',
      desc: '视频流功能基于先进的人工智能技术，精准识别直播视频流中的涉政、色情、暴恐、垃圾广告、logo 水印等违规内容，帮助您提前防御内容风险，提高审核效率，净化网络环境，提升用户体验。',
      href: 'https://developer.qiniu.com/dora/7756/the-video-review'
    },
    {
      icon: <VideoIcon2 />,
      title: '图谱视频鉴黄',
      desc: '短视频鉴黄服务能够帮您有效判断保存在七牛云的视频是属于色情、性感还是正常。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/tupu-video/quickstart'
    },
    {
      icon: <VideoIcon3 />,
      title: '图片/视频分类',
      desc: '智能视频/图片识别接口 label，通过视频/图片数据的分析挖掘，准确识别视频/图片所包含的内容信息，实现智能分类。适用于相册管理、图片/视频理解、分类、个性化推荐等场景。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/image-video-tag/quickstart'
    }
  ],
  [Type.Audio]: [
    {
      icon: <AudioIcon1 />,
      title: '数美音频审核',
      desc: '音频文件审核功能为音频文件的内容审核场景提供涉政，国歌，色情，广告，娇喘，音色标签，唱歌等内容的识别，并且可以依据具体的业务场景进行配置，帮助您提前防御内容风险，提高审核效率，净化网络环境，提升用户体验。',
      href: 'https://developer.qiniu.com/dora/7757/number-of-audio-files-to-review'
    },
    {
      icon: <AudioIcon2 />,
      title: '依图直播音频审核',
      desc: '依图直播语音审核为实时音频流的内容审核场景提供色情/广告/涉政/违规等内容的识别，并且提供娇喘类声音的识别能力。',
      href: 'https://developer.qiniu.com/dora/7100/yitu-audio'
    },
    {
      icon: <AudioIcon3 />,
      title: '阿里音频审核',
      desc: '音频审核能够有效帮助您检测出您的音视频中的语音是否存在违规的风险内容。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/ali_audio/quickstart'
    },
    {
      icon: <AudioIcon4 />,
      title: '阿里音频转文字',
      desc: '音频转文字服务能够针对已经录制完成的录音文件，进行识别的服务。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/ali_audio_trans/quickstart'
    }
  ],
  [Type.Text]: [
    {
      icon: <TextIcon1 />,
      title: '阿里文本反垃圾',
      desc: '文本反垃圾服务能够有效帮助您检测出您的文本中是否存在违规的风险内容。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/ali_textscan/quickstart'
    },
    {
      icon: <TextIcon2 />,
      title: '达观文本鉴黄鉴政',
      desc: '文本鉴黄鉴政服务能够帮您有效判断保存在七牛云的文本是属于色情、政治、反动还是正常。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/dg_content_audit_v5/quickstart'
    },
    {
      icon: <TextIcon3 />,
      title: '达观垃圾评论过滤',
      desc: '文本垃圾评论过滤服务能够帮您有效判断保存在七牛云的文本是否属于广告以及文本质量如何。',
      href: 'https://portal.qiniu.com/dora/thirdparty/create/dg_spam_filter_v1/quickstart'
    }
  ]
} as { [k in Type]: Array<CardProps | null> }

export default function Services() {
  return useMobile() ? <ForMobile dataMap={dataMap} /> : <ForPc dataMap={dataMap} />
}
