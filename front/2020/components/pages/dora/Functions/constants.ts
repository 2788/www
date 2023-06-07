import { urlMap, Product } from 'constants/products'

export type ContentValue = {
  name: string
  link?: string
  label?: 'HOT' | '敬请期待' | 'NEW'
  extra?: {
    title: string
    link: string
  }
}

export type FunctionValue = Array<{
  title: string
  key: string
  list: Array<{
    title: string
    link?: string
    content?: ContentValue[]
    group?: Array<{
      type: string
      content: ContentValue[]
    }>
  }>
  extra?: {
    title: string
    link: string
  }
}>

export const productFunctions: FunctionValue = [
  {
    title: '多媒体处理',
    key: 'media',
    list: [
      {
        title: '音视频处理',
        content: [
          {
            name: '普通音视频转码',
            link: 'https://developer.qiniu.com/dora/1248/audio-and-video-transcoding-avthumb'
          },
          {
            name: '倍速转码',
            link: 'https://developer.qiniu.com/dora/5777/avfast'
          },
          {
            name: '锐智转码',
            link: urlMap[Product.Avsmart],
            label: 'HOT'
          },
          {
            name: '多码率自适应转码',
            link: 'https://developer.qiniu.com/dora/1245/multiple-rate-adaptive-transcoding-adapt'
          },
          {
            name: '视频缩略图',
            link: 'https://developer.qiniu.com/dora/1313/video-frame-thumbnails-vframe'
          },
          {
            name: '音视频拼接',
            link: 'https://developer.qiniu.com/dora/1246/audio-and-video-stitching-avconcat'
          },
          {
            name: '音视频分段',
            link: 'https://developer.qiniu.com/dora/4154/dora-segment'
          },
          {
            name: '音视频切片',
            link: 'https://developer.qiniu.com/dora/1485/audio-and-video-slice'
          }
        ]
      },
      {
        title: '图片处理',
        content: [
          {
            name: '图片瘦身',
            link: 'https://developer.qiniu.com/dora/1271/image-thin-body-imageslim',
            extra: {
              title: '立即使用',
              link: 'https://portal.qiniu.com/dora/fop/imageslim'
            }
          },
          {
            name: '图片基础处理',
            link: 'https://developer.qiniu.com/dora/1279/basic-processing-images-imageview2'
          },
          {
            name: '图片水印处理',
            link: 'https://developer.qiniu.com/dora/1316/image-watermarking-processing-watermark',
            extra: {
              title: '立即使用',
              link: 'https://portal.qiniu.com/dora/fop/imageprocess'
            }
          },
          {
            name: '全景拼接',
            link: 'https://developer.qiniu.com/dora/6670/panoramic-view-image-splicing-stitch'
          },
          {
            name: '动图合成',
            link: 'https://developer.qiniu.com/dora/5448/animate'
          }
        ]
      },
      {
        title: '自定义数据处理',
        content: [
          {
            name: '自定义数据处理',
            link: 'https://developer.qiniu.com/dora/3687/ufop-directions-for-use'
          }
        ]
      }
    ]
  },
  {
    title: '业务安全',
    key: 'safe',
    list: [
      {
        title: '内容审核',
        link: urlMap[Product.Censor],
        content: [
          {
            name: '图片审核',
            extra: {
              title: '立即体验',
              link: `${urlMap[Product.Censor]}#playground`
            }
          },
          {
            name: '视频审核',
            extra: {
              title: '立即体验',
              link: `${urlMap[Product.Censor]}#playground`
            }
          },
          {
            name: '直播审核',
            extra: {
              title: '立即体验',
              link: `${urlMap[Product.Censor]}#playground`
            }
          },
          {
            name: '音频审核',
            extra: {
              title: '立即体验',
              link: `${urlMap[Product.Censor]}#playground`
            }
          },
          {
            name: '文本审核',
            extra: {
              title: '立即体验',
              link: `${urlMap[Product.Censor]}#playground`
            }
          }
        ]
      },
      {
        title: '身份验证',
        content: [
          {
            name: '人脸核验',
            link: urlMap[Product.FaceID]
          },
          {
            name: '身份证二要素',
            link: 'https://developer.qiniu.com/dora/6926/id-card-two-elements'
          },
          {
            name: '手机号三要素',
            link: 'https://developer.qiniu.com/dora/9906/mobile-phone-number-check-the-three-elements',
            label: 'NEW'
          },
          {
            name: '银行卡四要素',
            link: 'https://developer.qiniu.com/dora/9905/the-four-essential-factors-of-bank-card',
            label: 'NEW'
          }
        ]
      }
    ]
  },
  {
    title: '人工智能',
    key: 'ai',
    list: [
      {
        title: '人脸识别',
        content: [
          {
            name: '人脸检测',
            link: 'https://developer.qiniu.com/dora/6817/facedetect'
          },
          {
            name: '1:1 人脸比对',
            link: 'https://developer.qiniu.com/dora/6699/facecompare'
          },
          {
            name: '1:N 人脸比对',
            link: 'https://developer.qiniu.com/dora/4438/face-recognition'
          }
        ]
      },
      {
        title: '票证识别',
        link: urlMap[Product.Ocr],
        content: [
          {
            name: '营业执照识别',
            extra: {
              title: '立即体验',
              link: `${urlMap[Product.Ocr]}#demo`
            }
          },
          {
            name: '身份证识别',
            extra: {
              title: '立即体验',
              link: `${urlMap[Product.Ocr]}#demo`
            }
          },
          {
            name: '增值税发票',
            extra: {
              title: '立即体验',
              link: 'https://developer.qiniu.com/dora/12446/the-vat-invoice-ocr'
            }
          },
          {
            name: '驾驶证 OCR',
            extra: {
              title: '立即体验',
              link: 'https://developer.qiniu.com/dora/12444/driving-license-ocr'
            }
          },
          {
            name: '行驶证 OCR',
            extra: {
              title: '立即体验',
              link: 'https://developer.qiniu.com/dora/12445/vehicle-license-ocr'
            }
          }
        ]
      },
      {
        title: '智能语音',
        link: urlMap[Product.Voice],
        content: [
          {
            name: '实时语音识别',
            extra: {
              title: '立即体验',
              link: 'http://fir.qnsdk.com/5a94'
            }
          },
          {
            name: '语音合成',
            link: `${urlMap[Product.Tts]}#demo`
          },
          {
            name: '短语音听写',
            link: 'https://developer.qiniu.com/dora/11869/short-dictation'
          },
          {
            name: '录音文件识别',
            link: 'https://developer.qiniu.com/dora/8403/the-recording-file-identification'
          },
          {
            name: '智能音频流审核',
            link: 'https://developer.qiniu.com/dora/8735/intelligent-audio-stream-audit'
          },
          {
            name: '声纹识别',
            label: '敬请期待'
          }
        ]
      },
      {
        title: '视频识别',
        content: [
          {
            name: '人车宠识别',
            label: '敬请期待'
          }
        ]
      }
    ]
  },
  {
    title: 'AI开放市场',
    key: 'open',
    list: [
      {
        title: '内容审核',
        group: [
          {
            type: '数美',
            content: [
              {
                name: '数美视频流审核',
                link: 'https://developer.qiniu.com/dora/7756/the-video-review'
              },
              {
                name: '数美音频审核',
                link: 'https://developer.qiniu.com/dora/7757/number-of-audio-files-to-review'
              },
              {
                name: '数美图片审核',
                link: 'https://developer.qiniu.com/dora/7758/several-beautiful-photos-review'
              }
            ]
          },
          {
            type: '依图',
            content: [
              {
                name: '依图直播音频审核',
                link: 'https://developer.qiniu.com/dora/7100/yitu-audio'
              }
            ]
          }
        ]
      }
    ],
    extra: {
      title: '合作申请',
      link: 'https://www.qiniu.com/products/openapi/partner'
    }
  }
]
