/**
 * @file dora 适用场景 index.tsx
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'
import classnames from 'classnames'

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
  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const isFeedbackCard = link === feedbackHash

  if (isFeedbackCard || !link) {
    const feedbackAction = isFeedbackCard ? () => handleConsult() : undefined
    const cardProps = {
      onClick: feedbackAction
    }
    return (
      <div {...cardProps} className={classnames(styles.sceneCard, isFeedbackCard && styles.feedback)}>
        <h5 className={styles.title}>{title}</h5>
        {linkText && <span className={styles.link}>{linkText} &gt;&gt;</span>}
        <p className={styles.content}>{content}</p>
      </div>
    )
  }

  return (
    <Link className={styles.sceneCard} href={link}>
      <h5 className={styles.title}>{title}</h5>
      {linkText && <span className={styles.link}>{linkText} &gt;&gt;</span>}
      <p className={styles.content}>{content}</p>
    </Link>
  )
}

export default function DoraFuctions() {
  return (
    <Scene name="functions" title="产品功能" grey>
      <ScenePanel name="scene-tab-1" title="图片处理" verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="图片瘦身"
            linkText="立即试用"
            link="https://portal.qiniu.com/dora/fop/imageslim?source_page=dora"
            content="支持对 PNG、JPG 图片实时压缩，缩小图片体积，节省流量，提升产品体验。"
          />
          <SceneCard
            title="图片基本处理"
            content="提供简单快捷的图片格式转换、缩略、剪裁、自定义裁剪功能。"
          />
          <SceneCard
            title="图片高级处理"
            linkText="了解详情"
            link="https://developer.qiniu.com/dora/manual/1270/the-advanced-treatment-of-images-imagemogr2?source_page=dora"
            content="提供一系列高级图片处理功能，并支持控制台操作，包括格式转换、缩放、裁剪、旋转等。"
          />
          <SceneCard
            title="图片水印处理"
            linkText="立即试用"
            link="https://portal.qiniu.com/dora/fop/imageprocess?source_page=dora"
            content="提供添加图片、文字、图文混合水印三种处理方式。"
          />
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="音视频处理" verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="音视频转码"
            content="超大规模转码集群，主流转码格式全覆盖，支持转封装、水印、截图等功能满足您的各种场景应用。"
          />
          <SceneCard
            title="转码模板"
            linkText="立即申请"
            link="#feedback-modal"
            content="提供控制台图形化操作，通过设置任务模板，可对海量音视频文件进行流程化处理，一站式完成转码、截图、水印、鉴黄等基本操作，满足您的多样化转码需求。"
          />
          <SceneCard
            title="视频瘦身"
            linkText="了解详情"
            link="https://developer.qiniu.com/dora/manual/5135/avsmart?source_page=dora"
            content="利用视频内容自适应转码技术，在相同的观看体验下，在节省码率的同时降低宽带成本，并可通过视频增强处理，达到更优的观看效果。"
          />
          <SceneCard
            title="倍速转码"
            content="适用于 25 分钟以上的长视频，通过对视频分片并行转码，大幅提升转码速度。"
          />
          <SceneCard
            title="水印"
            content="支持在输出视频上覆盖图片、文字水印，各类分辨率视频均可支持，满足开发者各种需要。"
          />
          <SceneCard
            title="安全加密"
            content="提供多样化的视频加密服务，可有效保障视频资源安全性，防止文件泄露或盗用，适用于在线教育，付费观看等场景。"
          />
          <SceneCard
            title="完善的 API 体系"
            content="转码服务提供完善全面的服务端 API 和简洁易懂的接入文档，方便客户快速对接。"
          />
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="智能识别" verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="人脸识别"
            linkText="了解详情"
            link="https://developer.qiniu.com/dora/manual/4281/face-detection?source_page=dora"
            content="业界领先的人脸检测、五官关键点定位、人脸属性分析和快速的人脸聚类功能。 可广泛应用在美颜、智能相册分类、新零售、安防监控和金融领域身份识别等多种场景。"
          />
          <SceneCard
            title="OCR 文字识别"
            linkText="立即申请"
            link="#feedback-modal"
            content="自然场景下对整图和文字进行检测、定位和识别。常用于对各种证件、票据、水电表所含信息进行自动识别和结构化处理，快速实现信息电子化入库，减少人力成本。"
          />
          <SceneCard
            title="以图搜图"
            linkText="了解详情"
            link="https://developer.qiniu.com/dora/manual/4680/image-search?source_page=dora"
            content="可对一张图片在底库中进行相似图片搜索，结果返回与搜索图语义最相似的多张图片，实现精准的图像匹配。"
          />
          <SceneCard
            title="场景物体识别"
            linkText="立即申请"
            link="#feedback-modal"
            content="360+ 类的场景检测和 200+ 类的物体识别，Top-5 准确率达 90.07%。可应用于相册中不同维度的分类， 场景化的广告营销和特定物体的识别与检索等场景。"
          />
          <SceneCard
            title="物体分割"
            linkText="立即申请"
            link="#feedback-modal"
            content="80+ 类的物体识别和定位，精确划分出物体的边界信息。可应用于抠图、增强现实等领域。"
          />
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-4" title="视频分析" verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="视频截图"
            content="从视频流中截取指定时刻的截图，提供雪碧图、视频首图功能，优化视觉体验，提升视频点击率。"
          />
          <SceneCard
            title="视频摘要"
            linkText="立即申请"
            link="#feedback-modal"
            content="对视频内容进行深度学习和理解，提取一组截图，自动生成视频摘要。"
          />
          <SceneCard
            title="视频精彩集锦"
            linkText="立即申请"
            link="#feedback-modal"
            content="通过对视频内容的全面分析，对视频进行关键点识别，智能生成视频精彩集锦。"
          />
          <SceneCard
            title="智能封面"
            linkText="立即申请"
            link="#feedback-modal"
            content="抽取精彩画面，智能推荐更吸引用户的视频封面。"
          />
          <SceneCard
            title="智能标签"
            linkText="立即申请"
            link="#feedback-modal"
            content="对视频进行场景分类、任务识别、语音识别、文字识别等多维度分析，形成层次化的分类标签，可用于视频搜索和视频推荐等应用场景。"
          />
          <SceneCard
            title="智能识别"
            linkText="立即申请"
            link="#feedback-modal"
            content="利用人脸识别、语音识别、 OCR 文本识别以及图像识别等技术，对直播、点播、UGC 视频进行全媒体内容识别，支持涉黄、涉暴、涉恐、涉政检测等功能。"
          />
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-5" title="音频画质优化" verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="高帧率重制服务"
            linkText="立即申请"
            // todo
            link="#feedback-modal"
            content="对于 30 帧/秒以内的普通帧率高清节目，生成 60 帧/秒的高帧率版本，消除在播放中的顿挫感。"
          />
          <SceneCard
            title="超高清重制服务"
            linkText="立即申请"
            // todo
            link="#feedback-modal"
            content="使用超分辨率、HDR、噪音抑制等技术，将标清的影片重置为高清版本和将 1080p 影片重制为 4K 版本，提供极致清晰的视频观感。"
          />
          <SceneCard
            title="受损片源修复"
            linkText="立即申请"
            // todo
            link="#feedback-modal"
            content="针对被过度压缩的网络视频，去除画面中的毛刺和马赛克，生成更高清晰度的修复重制版。"
          />
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-6" title="自定义数据处理" verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="自定义数据处理平台"
            linkText="了解详情"
            link="https://developer.qiniu.com/dora/manual/3687/ufop-directions-for-use?source_page=dora"
            content="容器化的形式运行用户自定义的数据处理程序，为您的数据处理业务提供稳定、可靠、按需弹性缩放的运行平台，支持各种主流开发语言，并提供可视化管理界面让您更好地监控各种应用运行和使用状态。"
          />
          <SceneCard
            title="安全可靠"
            content="使用内核级别的资源隔离和访问控制，数据安全可靠，您无需担心您的运行实例及其相关数据会被相同物理主机上的其他实例非法访问。"
          />
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-7" title="智能审核" verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="图片审核"
            linkText="了解详情"
            link="https://developer.qiniu.com/censor/api/5588/image-censor?source_page=dora"
            content="高效精准识别图片中的违规内容，支持的审核类型包括：图片鉴黄、图片鉴暴恐、图片敏感人物识别、图片广告识别。"
          />
          <SceneCard
            title="视频审核"
            linkText="了解详情"
            link="https://developer.qiniu.com/censor/api/5620/video-censor?source_page=dora"
            content="高效精准识别视频中的违规内容，包括涉黄、涉暴、涉恐、涉政检测等，准确率高达 99.95%，可替代 80% 以上的人工审核，节省人力成本。并且能通过机器学习不断提高准确率。"
          />
          <SceneCard
            title="文本内容审核"
            linkText="了解详情"
            link="https://developer.qiniu.com/dora/manual/1258/text-as-jian-zheng-huang-service?source_page=dora"
            content="能够有效帮助您识别文本中的垃圾广告、色情暴恐、政治违规、不文明用语等垃圾、恶意内容；提高平台用户体验，降低平台运营成本。"
          />
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-8" title="版权保护" verticalCenter>
        <SceneBlock className={styles.sceneContainer}>
          <SceneCard
            title="视频加密"
            content="提供多密钥加密、视频防盗链的视频加密服务，实现对视频的全方位加密保护。"
          />
          <SceneCard
            title="DRM 算法加密"
            content="广泛认可的视频版权保护系统，可有效保障视频资源安全性。"
          />
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}
