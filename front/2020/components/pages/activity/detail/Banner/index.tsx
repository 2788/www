import React, { useCallback } from 'react'
import { Modal } from 'react-icecream'
import { IActivity } from 'apis/admin/activity'
import { urlForSignin } from 'utils/route'
import { useUrl } from 'hooks/url'
import { useUserInfo } from 'components/UserInfo'
import { useOverlay } from 'components/Overlay'
import { ProgressState } from 'constants/activity'
import Button from 'components/UI/Button'
import MyModal from './Modal'
import style from './style.less'

// 默认展示数据
const defaultBannerData = {
  id: '',
  imgUrl: '',
  title: '',
  desc: '',
  startTime: '',
  endTime: '',
  applyEndTime: '',
  noLoginRequired: true,
  location: '',
  progressState: ProgressState.End,
  isOverApplyTime: true
} as IActivity

Banner.defaultProps = defaultBannerData

export default function Banner(props: IActivity) {
  const {
    id, imgUrl, title, desc, startTime, endTime, applyEndTime, noLoginRequired,
    location, progressState, isOverApplyTime, sessions
  } = props
  const currentUrl = useUrl()
  const { add: addModal } = useOverlay()
  const userInfo = useUserInfo()

  const handelClick = useCallback(() => {
    // 不需要登录或者已登录则弹出报名框
    if (noLoginRequired || (userInfo && userInfo.signedIn)) {
      return addModal(<MyModal marketActivityId={id} sessions={sessions} />)
    }
    // 需要登录且未登录
    Modal.info({
      content: '未登录，请先登录再报名',
      okText: <a target="_blank" rel="noopener" href={urlForSignin(currentUrl)}>登录</a>
    })
  }, [addModal, currentUrl, id, noLoginRequired, sessions, userInfo])

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.icon} style={{ backgroundImage: `url(${imgUrl})` }}></div>
        <div className={style.content}>
          <p className={style.title}>{title}</p>
          <p className={style.desc}>{desc}</p>
          <div className={style.card}>
            <div className={style.row}>
              <label>活动时间：</label>
              <p>{`${startTime} 至 ${endTime}`}</p>
            </div>
            <div className={style.row}>
              <label>活动地点：</label>
              <p>{location}</p>
            </div>
            <div className={style.row}>
              <label>报名截止时间：</label>
              <p>{applyEndTime}</p>
            </div>
            <div className={style.row}>
              <label>活动状态：</label>
              <p>{progressState}</p>
            </div>
            <Button
              className={style.btn}
              type="primary"
              onClick={handelClick}
              disabled={isOverApplyTime}
              withBorder
            >
              {isOverApplyTime ? '报名已截止' : '立即报名'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
