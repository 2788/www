import React, { ReactNode } from 'react'

import { useMobile } from 'hooks/ua'

import ForMobile from './Mobile'
import ForPc from './Pc'

export type CardProps = {
  title: string
  desc: ReactNode
  href: string
}

export type HandpickValue = Array<{
  key: string,
  group: Array<{
    title: string
    list: CardProps[]
  }>
}>

export const handpickServices: HandpickValue = [
  {
    key: '内容审核',
    group: [
      {
        title: '阿里云',
        list: [
          {
            title: '图片审核',
            desc: '检测图片是否包含色情，暴恐，广告，二维码，不良场景和图片 logo 等违规内容。',
            href: 'https://portal.qiniu.com/openapi/ali-image-audit'
          },
          {
            title: '音频审核',
            desc: '检测音频文件是否存在色情，暴恐，涉政，广告，灌水，无意义文字等违规内容。',
            href: 'https://portal.qiniu.com/openapi/ali_audio'
          },
          {
            title: '文本反垃圾',
            desc: '检测文本是否存在色情，暴恐，涉政，广告，灌水，无意义文字等违规内容。',
            href: 'https://portal.qiniu.com/openapi/ali_textscan'
          }
        ]
      },
      {
        title: '数美',
        list: [
          {
            title: '图片审核',
            desc: '识别图片是否存在涉政、色情、暴恐、广告、水印 logo，不良场景等违规内容。',
            href: 'https://developer.qiniu.com/dora/7758/several-beautiful-photos-review'
          },
          {
            title: '音频审核',
            desc: '识别音频文件中是否存在涉政，国歌，色情，广告等违规内容，并支持识别娇喘类，音色标签，唱歌等，支持配置业务场景。',
            href: 'https://developer.qiniu.com/dora/7757/number-of-audio-files-to-review'
          },
          {
            title: '视频流审核',
            desc: '识别直播视频流中的是否存在涉政、色情、暴恐、垃圾广告、Logo 水印等违规内容。',
            href: 'https://developer.qiniu.com/dora/7756/the-video-review'
          }
        ]
      },
      {
        title: '依图',
        list: [
          {
            title: '直播音频审核',
            desc: '依图直播语音审核为实时音频流的内容审核场景提供色情/广告/涉政/违规等内容的识别，并且提供娇喘类声音的识别能力。',
            href: 'https://developer.qiniu.com/dora/7100/yitu-audio'
          }
        ]
      },
      {
        title: '图普',
        list: [
          {
            title: '图片鉴黄',
            desc: '识别图片属于色情、性感还是正常。鉴别的准确度超过 99.5%，可以替代 80% 以上的人工审核。',
            href: 'https://portal.qiniu.com/openapi/nrop'
          },
          {
            title: '图片鉴暴恐',
            desc: '识别图片属于暴恐和非暴恐，支持识别暴恐类标志和特定人物。',
            href: 'https://portal.qiniu.com/openapi/terror'
          },
          {
            title: '广告过滤',
            desc: '帮您判断保存在七牛云的图片是否包含广告。',
            href: 'https://portal.qiniu.com/openapi/ad'
          },
          {
            title: '广告过滤增强版',
            desc: '识别带文字图片是否包含广告，并支持将带文字的图片识别为文本。',
            href: 'https://portal.qiniu.com/openapi/ad-plus'
          },
          {
            title: '视频鉴黄',
            desc: '帮您有效判断保存在七牛云的视频是属于色情、性感还是正常。',
            href: 'https://portal.qiniu.com/openapi/tupu-video'
          }
        ]
      },
      {
        title: '达观',
        list: [
          {
            title: '文本鉴黄鉴政',
            desc: '帮您有效判断保存在七牛云的文本是属于色情、政治、反动还是正常。',
            href: 'https://portal.qiniu.com/openapi/dg_content_audit_v5'
          },
          {
            title: '垃圾评论过滤',
            desc: '帮您有效判断保存在七牛云的文本是否属于广告以及文本质量如何。',
            href: 'https://portal.qiniu.com/openapi/dg_spam_filter_v1'
          }
        ]
      }
    ]
  },
  {
    key: '智能图片处理',
    group: [
      {
        title: 'Versa',
        list: [
          {
            title: '风格迁移',
            desc: '将图片风格转换成目标图片风格。',
            href: 'https://portal.qiniu.com/openapi/mkr_style_trans'
          },
          {
            title: '人像分割',
            desc: '将图片中人物与背景单独分离开。',
            href: 'https://portal.qiniu.com/openapi/mkr_seg_human'
          },
          {
            title: '实例分割',
            desc: '将图片中不同实例分别与背景分离。',
            href: 'https://portal.qiniu.com/openapi/mkr_seg_ins'
          },
          {
            title: '智能填充',
            desc: '将图像中的指定区域进行修复重建或者去除图像中的多余物体。',
            href: 'https://portal.qiniu.com/openapi/mkr_inpainting'
          }
        ]
      }
    ]
  },
  {
    key: '智能语音分析',
    group: [
      {
        title: '阿里云',
        list: [
          {
            title: '语音转文字',
            desc: '将音频文件中的语音识别为文字。',
            href: 'https://portal.qiniu.com/openapi/ali_audio_trans'
          }
        ]
      }
    ]
  },
  {
    key: '智能文档处理',
    group: [
      {
        title: '翻译狗',
        list: [
          {
            title: '翻译狗文档翻译',
            desc: '提供多格式、多语种、高质量的文档翻译服务，支持源语言自动检测，只需指定文档链接并指定目标语言、文档格式、需要存储至七牛 kodo 的 bucket 等参数，即可在七牛云存储 kodo 中获取翻译后的文档。',
            href: 'https://developer.qiniu.com/dora/9907/to-translate-documents'
          }
        ]
      }
    ]
  }
]

export default function Services() {
  return useMobile() ? <ForMobile data={handpickServices} /> : <ForPc data={handpickServices} />
}
