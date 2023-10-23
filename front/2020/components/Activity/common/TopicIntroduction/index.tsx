/**
 * @author yinxulai <yinxulai@qiniu.com>
 */

import React from 'react'
import styles from './style.less'

export interface Props { }

export default function TopicIntroduction(_props: Props) {
  interface Block {
    title: string
    content: string[]
  }

  const renderBlock = (item: Block) => (
    <div className={styles.block} key={item.title}>
      <div className={styles.title}>{item.title}</div>
      <ol className={styles.content}>
        {item.content.map((p, index) => (<li key={index}>{p}</li>))}
      </ol>
    </div>
  )

  const data: Block[] = [
    {
      title: '基础功能（必须实现）',
      content: [
        '视频播放：播放、暂停、进度条拖拽',
        '内容分类：视频内容分类页，如热门视频、体育频道',
        '­视频切换：可通过上下键翻看视频'
      ]
    },
    {
      title: '高级功能（可选实现）',
      content: [
        '账户系统：用户可登录，收藏视频',
        '可参考常见短视频应用自由增加功能，提升完善度，如点赞、分享、关注、搜索等'
      ]
    }
  ]

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.title}>网页短视频应用</div>
        <p className={styles.content}>使用七牛云存储、七牛视频相关产品（如视频截帧等）开发一款Web端短视频应用</p>
        {data.map(renderBlock)}
      </div>
    </div >
  )
}
