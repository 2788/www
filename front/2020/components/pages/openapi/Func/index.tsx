import React from 'react'
import Button from 'components/UI/Button'
import Block from 'components/Navigator/Block'
import Link from 'components/Link'

import audio from './images/audio.png'
import picture from './images/picture.png'
import text from './images/text.png'
import comment from './images/comment.png'
import person from './images/person.gif'
import Arrow from './images/arrow.svg'

import style from './index.less'

export default function Func() {
  return (
    <div className={style.wrapper}>
      <Row
        preferLeft
        imgUrl={audio}
        usingUrl="https://portal.qiniu.com/dora/thirdparty/create/ali_audio/quickstart"
        docUrl="https://developer.qiniu.com/dora/api/6392/ali-audio-audit-service"
        title="音频文件审核"
        name="audio"
        subtitle="检测音频中是否存在违规的风险内容"
        scenes={['社交 App 内容审核', '语音知识付费内容审核', '直播内容审核']}
      />
      <Row
        imgUrl={picture}
        usingUrl="https://portal.qiniu.com/dora/thirdparty/create/ali_ad/quickstart"
        docUrl="https://developer.qiniu.com/dora/api/6261/ali-image-ads-audit-service"
        title="图片广告审核"
        name="picture"
        subtitle="检测音频中是否存在违规的风险内容"
        scenes={['商品图片过滤', '社交论坛垃圾过滤', 'UGC 垃圾内容过滤']}
      />
      <Row
        preferLeft
        imgUrl={text}
        usingUrl="https://portal.qiniu.com/dora/thirdparty/create/ali_textscan/quickstart"
        docUrl="https://developer.qiniu.com/dora/api/5995/ali-text-anti-spam-service"
        title="文本反垃圾"
        name="text"
        subtitle="检测文本中是否存在违规的风险内容，高效过滤色情、广告、涉政、暴恐等多类垃圾文字及敏感词"
        scenes={['电商内容审核', '著作文章审核', '直播内容审核']}
      />
      <Row
        imgUrl={comment}
        usingUrl="https://portal.qiniu.com/dora/thirdparty/create/dg_spam_filter_v1/quickstart"
        docUrl="https://developer.qiniu.com/dora/api/1259/comment-spam-filtering-services-dg-spam-filter-v1"
        title="垃圾评论过滤"
        name="comment"
        subtitle="帮助您有效判断保存在七牛云的文本是否属于广告以及文本质量如何"
        scenes={['小说、论坛等行业长文本审核和分析', '评论、社区等敏感留言识别和监控', '直播弹幕等实时数据检测和过滤']}
      />
      <Row
        preferLeft
        imgUrl={person}
        usingUrl="https://portal.qiniu.com/dora/thirdparty/create/mkr_seg_human/quickstart"
        docUrl="https://developer.qiniu.com/dora/api/6294/marca-dragon-portrait-division-services"
        title="人像分割"
        name="person"
        subtitle="帮您有效的把图片中人物与背景单独分离开"
        scenes={['图片人像合成', '图片背景和人物特效', '绿幕抠图']}
      />
      <div className={style.more}>
        <Link href="https://portal.qiniu.com/create#openApi" blue>点击了解更多好玩的功能 <Arrow style={{ verticalAlign: 'sub' }} /></Link>
      </div>
    </div>
  )
}

export type RowProps = {
  // true：图左内容右 false：相反
  preferLeft?: boolean
  imgUrl: string
  usingUrl: string
  docUrl: string
  title: string
  subtitle: string
  name: string
  scenes: string[]
}

function Row({ preferLeft, imgUrl, usingUrl, docUrl, title, name, subtitle, scenes }: RowProps) {
  const img = <img className={style.image} src={imgUrl} alt={title} />
  const sceneItems = scenes.map((scene, idx) => <li key={idx} className={style.sceneItem}>{scene}</li>)
  const content = (
    <div className={style.content}>
      <h3 className={style.title}>{title}</h3>
      <div className={style.subtitle}>{subtitle}</div>
      <div className={style.scene}>应用场景</div>
      <ul>
        {sceneItems}
      </ul>
      <div className={style.btns}>
        <Button href={usingUrl} type="primary">立即使用</Button>
        <Button href={docUrl} type="hollow" withBorder style={{ marginLeft: '16px' }}>帮助文档</Button>
      </div>
    </div>
  )
  return (
    <Block className={style.block} title={title} name={name}>
      <section>
        {preferLeft ? img : content}
        {preferLeft ? content : img}
      </section>
    </Block>
  )
}
