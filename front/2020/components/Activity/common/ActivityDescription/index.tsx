/**
 * @author yinxulai <yinxulai@qiniu.com>
 */

import React from 'react'

import styles from './style.less'
import image01 from './images/01.png'
import image02 from './images/02.png'
import image03 from './images/03.png'
import image04 from './images/04.png'

export interface Props {
}

function Description() {
  return (
    <div className={styles.description}>
      <h5 className={styles.title}>赛事介绍</h5>
      <p className={styles.text}>
        欢迎来到第二届七牛云1024创作节！
        在首届活动中，我们看到了大学生开发者们无与伦比的创造力，
        近百支队伍的作品异彩纷呈，
        更让我们相信，「改变从校园发生」。
        <br />
        现在，校园编程马拉松的发令枪又将打响，
        欢迎你加入这场属于青春和技术的嘉年华，
        让改变延续，让进步不止！
      </p>
    </div>
  )
}

interface HighlightItem {
  icon: string
  title: string
  description: string
}

function Highlights() {
  const data: HighlightItem[] = [
    {
      icon: image01,
      title: '丰厚奖金池',
      description: '十七万总奖金池，一等奖十万元，凭借技术实力赚到人生第一桶金！'
    },
    {
      icon: image02,
      title: '直通实习机会',
      description: '是金子总会发光，我们不会错过你的每次闪耀。OFFER就在决赛现场，等你来拿！'
    },
    {
      icon: image03,
      title: '热门赛道项目实践经验',
      description: '从校园到职场，从功课到工程，提前感受一线开发气氛，还没毕业就有工作经验'
    }, {
      icon: image04,
      title: '大咖面对面',
      description: '优胜团队将受邀参加技术交流私享会，与行业大咖近距离交流、获得实践指导！'
    }
  ]

  const renderItem = (item: HighlightItem) => (
    <div key={item.title} className={styles.highlightItem}>
      <img className={styles.icon} src={item.icon} />
      <div className={styles.content}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.desc}>{item.description}</div>
      </div>
    </div>
  )

  return (
    <div className={styles.highlights}>
      <h5 className={styles.title}>活动亮点</h5>
      <div className={styles.list}>
        {data.map(item => renderItem(item))}
      </div>
    </div>
  )
}

export default function ActivityDescription(_props: Props) {
  return (
    <div className={styles.root}>
      <Description />
      <Highlights />
    </div>
  )
}
