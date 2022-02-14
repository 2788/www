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
      },
      {
        title: '文档处理',
        link: urlMap[Product.Document],
        content: [
          {
            name: '文档转换',
            link: `${urlMap[Product.Document]}#features`,
            label: 'NEW'
          },
          {
            name: '文档翻译',
            link: `${urlMap[Product.Document]}#features`,
            label: 'NEW'
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
      },
      {
        title: '智能风控',
        content: [
          {
            name: '先享后付',
            link: `${urlMap[Product.RiskControl]}#functions`
          },
          {
            name: '汽车金融',
            link: `${urlMap[Product.RiskControl]}#functions`
          },
          {
            name: '信贷风险洞察',
            link: `${urlMap[Product.RiskControl]}#functions`
          },
          {
            name: '申请欺诈防护',
            link: `${urlMap[Product.RiskControl]}#functions`
          },
          {
            name: '租赁风控',
            link: `${urlMap[Product.RiskControl]}#functions`
          },
          {
            name: '注册保护',
            link: `${urlMap[Product.RiskControl]}#functions`
          },
          {
            name: '账户保护',
            link: `${urlMap[Product.RiskControl]}#functions`
          },
          {
            name: '营销保护',
            link: `${urlMap[Product.RiskControl]}#functions`
          },
          {
            name: '营销价值分层',
            link: `${urlMap[Product.RiskControl]}#functions`
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
            name: '车险保单识别',
            extra: {
              title: '立即体验',
              link: `${urlMap[Product.Ocr]}#demo`
            }
          },
          {
            name: '新车发票识别',
            extra: {
              title: '立即体验',
              link: `${urlMap[Product.Ocr]}#demo`
            }
          },
          {
            name: '车辆登记证识别',
            extra: {
              title: '立即体验',
              link: `${urlMap[Product.Ocr]}#demo`
            }
          },
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
            extra: {
              title: '立即体验',
              link: `${urlMap[Product.Tts]}#demo`
            }
          },
          {
            name: '一句话识别',
            link: 'https://developer.qiniu.com/dora/8336/a-word-recognition'
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
        title: '图像识别',
        content: [
          {
            name: '图像分类',
            link: 'https://developer.qiniu.com/dora/7045/image-video-tag'
          }
        ]
      },
      {
        title: '视频识别',
        content: [
          {
            name: '视频智能分析',
            link: urlMap[Product.Vii]
          },
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
            type: '阿里',
            content: [
              {
                name: '阿里图片审核',
                link: 'https://developer.qiniu.com/dora/7855/ali-image-audit-service'
              },
              {
                name: '阿里文本反垃圾',
                link: 'https://developer.qiniu.com/dora/5995/ali-text-anti-spam-service'
              },
              {
                name: '阿里音频审核',
                link: 'https://developer.qiniu.com/dora/6392/ali-audio-audit-service'
              }
            ]
          },
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
            type: '图普',
            content: [
              {
                name: '图普图片鉴黄',
                link: 'https://developer.qiniu.com/dora/1290/image-as-a-yellow-services-nrop'
              },
              {
                name: '图普视频鉴黄',
                link: 'https://developer.qiniu.com/dora/1310/short-video-jian-huang-services-tupu-video'
              },
              {
                name: '图普图片鉴暴恐',
                link: 'https://developer.qiniu.com/dora/1309/image-as-a-critical-could-service-terror'
              },
              {
                name: '图普广告过滤',
                link: 'https://developer.qiniu.com/dora/1244/advertising-filtering-service-ad'
              },
              {
                name: '图普广告过滤增强版',
                link: 'https://developer.qiniu.com/dora/1243/advertising-filtering-service-enhanced-version-ad-plus'
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
          },
          {
            type: '达观',
            content: [
              {
                name: '达观文本鉴黄鉴政',
                link: 'https://developer.qiniu.com/dora/1258/text-as-jian-zheng-huang-service'
              },
              {
                name: '达观垃圾评论过滤',
                link: 'https://developer.qiniu.com/dora/1259/comment-spam-filtering-services-dg-spam-filter-v1'
              }
            ]
          }
        ]
      },
      {
        title: '智能图片处理',
        content: [
          {
            name: 'Versa 风格迁移',
            link: 'https://developer.qiniu.com/dora/6293/marca-dragon-style-transfer-service'
          },
          {
            name: 'Versa 人像分割',
            link: 'https://developer.qiniu.com/dora/6294/marca-dragon-portrait-division-services'
          },
          {
            name: 'Versa 实例分割',
            link: 'https://developer.qiniu.com/dora/6321/versa-example-service'
          },
          {
            name: 'Versa 智能填充',
            link: 'https://developer.qiniu.com/dora/6322/versa-smart-fill-service'
          }
        ]
      },
      {
        title: '智能语音分析',
        content: [
          {
            name: '阿里音频转文字',
            link: 'https://developer.qiniu.com/dora/7099/ali-audio-trans'
          }
        ]
      },
      {
        title: '智能文档处理',
        content: [{
          name: '翻译狗文档翻译',
          link: 'https://developer.qiniu.com/dora/9907/to-translate-documents'
        }]
      }
    ],
    extra: {
      title: '合作申请',
      link: 'https://www.qiniu.com/products/openapi/partner'
    }
  }
]
