/**
 * @file dora 适用场景 index.tsx
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'
import classnames from 'classnames'

import { urlMap, nameMap, Product } from 'constants/products'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'
import Link from 'components/Link'
import { useModal as useFeedbackModal } from 'components/Feedback'

import styles from './style.less'

interface SceneCardProps {
  title: string
  content: string
  linkText?: string
  link?: string
}

const feedbackHash = '#feedback-modal'

function SceneCard({ title, content, linkText, link }: SceneCardProps) {
  const { startConsulting } = useFeedbackModal()

  const isFeedbackCard = link === feedbackHash

  if (isFeedbackCard || !link) {
    return (
      <div
        className={classnames(styles.sceneCard, isFeedbackCard && styles.feedback)}
        onClick={isFeedbackCard ? startConsulting : undefined}
      >
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.content}>{content}</p>
        {linkText && <span className={styles.link}>{linkText} &gt;&gt;</span>}
      </div>
    )
  }

  return (
    <div className={styles.sceneCard} >
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.content}>{content}</p>
      <Link className={styles.link} href={link}>{linkText} &gt;&gt;</Link>
    </div>
  )
}

export default function DoraFuctions() {
  return (
    <Scene name="functions" title="产品功能" className={styles.wrapper}>
      <ScenePanel name="image" title="图片处理" verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="图片瘦身"
            linkText="立即使用"
            link="https://portal.qiniu.com/dora/fop/imageslim?source_page=dora"
            content="在尽可能不影响画质的情况下，将图片实时压缩，大幅缩小文件体积。"
          />
          <SceneCard
            title="图片通用处理"
            content="支持对图片进行格式转换、缩略、剪裁、旋转、获取基本信息、图片 EXIF 信息、圆角处理、计算平均色调等操作。"
          />
          <SceneCard
            title="图片水印处理"
            linkText="立即使用"
            link="https://portal.qiniu.com/dora/fop/imageprocess?source_page=dora"
            content="支持对图片添加图片水印、文字水印、文字平铺水印、混合水印、渐变色水印和盲水印等。"
          />
          <SceneCard
            title="全景拼接"
            content="支持将多张图像拼接起来，拼成一幅大的图像来创建全景图像。"
          />
          <SceneCard
            title="动图合成"
            content="将多张图片合成 GIF 动图。"
          />
          <Link href="https://developer.qiniu.com/dora/3683/img-directions-for-use" className={styles.detailLink} blue>了解详情 &gt;</Link>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="audio" title="音视频处理" verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="普通音视频转码"
            content="实现对音频、视频资源的编码和格式转换。"
          />
          <SceneCard
            title="锐智转码"
            linkText="了解详情"
            link={urlMap[Product.Avsmart]}
            content="根据视频场景内容自适应进行转码，在不损失画质的情况下（肉眼无感知）以总体更低的码率进行转码。"
          />
          <SceneCard
            title="倍速转码"
            content="加速对视频资源进行编码。"
          />
          <SceneCard
            title="音视频通用处理"
            content="对音视频进行分段、切片、打水印、拼接、获取音视频元信息等操作。"
          />
          <SceneCard
            title="多码率自适应转码"
            content="用于对已经上传到七牛云的视频转码成包含多种码率的 HLS 视频流。以便能随着终端网络带宽的变化动态选择适应的码率播放。"
          />
          <SceneCard
            title="视频缩略图"
            content="支持获取视频的帧缩略图和采样缩略图。"
          />
          <SceneCard
            title="智能多媒体平台"
            linkText="立即使用"
            link="https://portal.qiniu.com/dora/media-gate/overview"
            content="通过控制台可视化操作，可对海量视频进行流程化处理，支持工作流、预设集、任务触发器等配置。"
          />
          <Link href="https://developer.qiniu.com/dora/3685/directions-for-use-av" className={styles.detailLink} blue>了解详情 &gt;</Link>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="censor" title={nameMap[Product.Censor]} verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="图片审核"
            content="高效精准识别图片中的违规内容，支持的审核类型包括：图片鉴黄、图片鉴暴恐、图片敏感人物识别、图片广告识别、图片水印 Logo、不良场景等类型。"
          />
          <SceneCard
            title="视频审核"
            content="高效精准识别视频中的违规内容，包括涉黄、涉暴恐、涉政敏感人物检测等，准确率高达 99.95%，可替代 80% 以上的人工审核。"
          />
          <SceneCard
            title="语音审核"
            content="为音频文件的内容审核场景提供涉政、国歌、色情、广告、娇喘等违规内容的识别，并支持识别唱歌、性别、音色标签等功能。"
          />
          <SceneCard
            title="文本审核"
            content="帮助您检测文本是否存在色情、暴恐、涉政、辱骂、灌水、违禁、无意义等违规内容。"
          />
          <SceneCard
            title="直播审核"
            content="帮助您检测直播中的不良信息，并给出审核结果管控建议。支持的审核类型包括：直播鉴黄、直播鉴暴恐、直播敏感人物识别、直播语音违规内容识别。"
          />
          <SceneCard
            title="审核工作台"
            linkText="立即使用"
            link="https://portal.qiniu.com/censor/main/overview"
            content="可视化操作，支持存量和增量审核，以及直播流审核配置。"
          />
          <Link href={urlMap[Product.Censor]} className={styles.detailLink} blue>了解详情 &gt;</Link>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="faceid" title={nameMap[Product.FaceID]} verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="身份证 OCR"
            content="检测单张身份证图片信息，例如：身份证中姓名、性别、民族、住址和身份证号码、有效期、签发地址等关键信息。"
          />
          <SceneCard
            title="人脸检测"
            content="检测单张图片中的人脸信息。"
          />
          <SceneCard
            title="活体检测"
            content="深度神经网络的活体检测技术，检测图片或视频中的人脸是否是活体，有效防止伪造照片、视频、人脸面具，抵御人脸伪造攻击。"
          />
          <SceneCard
            title="人脸比对"
            content="将用户人脸照片和预留照片进行比对，判断是否为同一人。"
          />
          <SceneCard
            title="权威人脸核验"
            content="将用户照片与权威公安接口数据进行比对，核验是否为本人。"
          />
          <SceneCard
            title="自由组合"
            linkText="立即使用"
            link="https://portal.qiniu.com/faceid/sdk-auth"
            content="人脸相关接口可根据场景组合调用，并支持 SDK 授权下载。"
          />
          <Link href={urlMap[Product.FaceID]} className={styles.detailLink} blue>了解详情 &gt;</Link>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="voice" title={nameMap[Product.Voice]} verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="语音识别"
            content="支持录音文件识别，一句话识别和实时语音识别。"
          />
          <SceneCard
            title="语音合成"
            content="将文本转化为拟人化语音。"
          />
          <SceneCard
            title="声纹识别"
            content="高效提取说话人的声纹特征，辨别说话人的信息。"
          />
          <Link href={urlMap[Product.Voice]} className={styles.detailLink} blue>了解详情 &gt;</Link>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="ocr" title={nameMap[Product.Ocr]} verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="票证识别 OCR"
            content="识别车险保单、营业执照、新车发票、车辆登记等票证文件，返回结构化信息。"
          />
          <Link href={urlMap[Product.Ocr]} className={styles.detailLink} blue>了解详情 &gt;</Link>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="vii" title={nameMap[Product.Vii]} verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="视频智能分析"
            linkText="立即使用"
            link="https://portal.qiniu.com/vii/tasks"
            content="通过对视频、图片、音频等内容的多维理解，对其实现结构化标签提取、审核和识别等功能的产品，可广泛应用于多媒体内容的管理、搜索和推荐，并且支持工作台体验。"
          />
          <Link href={urlMap[Product.Vii]} className={styles.detailLink} blue>了解详情 &gt;</Link>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="openapi" title={nameMap[Product.OpenAPI]} verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="AI 开放市场"
            linkText="加入我们"
            link={`${urlMap[Product.OpenAPI]}/partner`}
            content="协同合作伙伴共同为七牛的客户提供高质量的数据处理服务，也欢迎更多的合作伙伴加入我们。"
          />
          <Link href={urlMap[Product.OpenAPI]} className={styles.detailLink} blue>了解详情 &gt;</Link>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="handle" title="自定义数据处理" verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="自定义数据处理"
            content="容器化的形式运行用户自定义的数据处理程序，为您的数据处理业务提供稳定、可靠、按需弹性缩放的服务。"
          />
          <Link href="https://developer.qiniu.com/dora/3687/ufop-directions-for-use" className={styles.detailLink} blue>了解详情 &gt;</Link>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
