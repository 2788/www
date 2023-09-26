import React, { useCallback, useState } from 'react'
import { Modal } from 'react-icecream'
import { IActivity } from 'apis/admin/activity'
import { urlForSignin } from 'utils/route'
import { useUrl } from 'hooks/url'
import { useUserInfo } from 'components/UserInfo'
import { ProgressState } from 'constants/activity'
import Button from 'components/UI/Button'
import ActivityRegistrationModal, { ExtraFormItem } from 'components/Activity/common/ActivityRegistrationModal'
import style from './style.less'

const extraFrom: ExtraFormItem[] = [
  {
    type: 'select',
    required: true,
    name: '所在行业',
    key: 'industries',
    options: [
      '政府及公共事业', '教育', '医疗', '交通', '能源', '金融', '制造',
      '信息与通信服务', '传媒', '互联网', '地产建筑', '零售与物流', '其他'
    ]
  },
  {
    type: 'select',
    required: true,
    name: '部门',
    key: 'departments',
    options: [
      '管理部', '技术部', '人力资源', '财务', '行政', '市场营销',
      '销售', '采购', '运营', '生产', '物流', '其他'
    ]
  },
  {
    type: 'select',
    required: true,
    name: '职位',
    key: 'positions',
    options: [
      '首席执行官/总经理', '首席信息官/IT经理', '市场总监/经理', '销售总监/经理',
      '技术总监/经理', '工程技术人员', '专员', '其他'
    ]
  },
  {
    type: 'select',
    required: true,
    name: '职位',
    key: 'relationships',
    options: [
      '客户', '生态伙伴/渠道', '媒体', '开发者', '员工', '分析师', '学生', '其他'
    ]
  }
]

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
  const userInfo = useUserInfo()
  const [visible, setVisible] = useState(false)

  const handelClick = useCallback(() => {
    // 不需要登录或者已登录则弹出报名框
    if (noLoginRequired || (userInfo && userInfo.signedIn)) {
      return setVisible(true)
    }

    // 需要登录且未登录
    Modal.info({
      content: '未登录，请先登录再报名',
      okText: <a target="_blank" rel="noopener" href={urlForSignin(currentUrl)}>登录</a>
    })
  }, [currentUrl, noLoginRequired, userInfo])

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.icon} style={{ backgroundImage: `url("${imgUrl}")` }}></div>
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
            <ActivityRegistrationModal
              visible={visible}
              onCancel={() => setVisible(true)}

              marketActivityId={id}
              sessions={sessions}
              extraForm={extraFrom}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
