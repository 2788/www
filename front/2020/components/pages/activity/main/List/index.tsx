import React from 'react'
import { urlMap, Activity } from 'constants/activity'
import { IActivity } from 'apis/admin/activity'
import Button from 'components/UI/Button'
import style from './style.less'

export default function Activities({ activities }: { activities: IActivity[] }) {
  return (
    <div className={style.wrapper}>
      <ActivityList activities={activities} />
    </div>
  )
}

export function ActivityList({ activities }: { activities: IActivity[] }) {
  return (
    <div className={style.container}>
      {
        activities.map(item => (
          <MyCard key={item.id} {...item} />
        ))
      }
    </div>
  )
}

export function MyCard({ imgUrl, title, desc, startTime, endTime, id }: IActivity) {
  return (
    <div className={style.card}>
      <div className={style.icon} style={{ backgroundImage: `url("${imgUrl}")` }}></div>
      <div className={style.content}>
        <p className={style.title}>{title}</p>
        <p className={style.desc}>{desc}</p>
        <p className={style.time}>{`活动时间：${startTime} 至 ${endTime}`}</p>
        <Button className={style.btn} type="primary" href={`${urlMap[Activity.Detail]}/${id}`} target="_blank">查看详情</Button>
      </div>
    </div>
  )
}
