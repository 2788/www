import React, { useState, useLayoutEffect } from 'react'
import { Modal } from 'react-icecream'
import { Button } from 'react-icecream-2'
import { useUserInfo } from 'components/UserInfo'
import Link from 'components/Link'
import { useGlobalEntryContext } from 'components/GlobalEntryProvider'

import { useUrl } from 'hooks/url'
import { useMobile } from 'hooks/ua'
import { urlForSignin } from 'utils/route'
import { useActivity } from '../ActivityContext'
import ActivityRegistrationModal, { ExtraFormItem } from '../ActivityRegistrationModal'

import styles from './style.less'

const activityRegistrationExtraForm: ExtraFormItem[] = [
  {
    type: 'text',
    name: '微信号',
    required: true,
    key: 'wechatNumber',
    placeholder: '请输入微信号'
  }, {
    type: 'select',
    required: true,
    name: '是否完成组队',
    key: 'teamedUp',
    placeholder: '请选择是否完成组队',
    options: ['已组队', '未组队']
  }, {
    type: 'select',
    required: true,
    name: '是否为队长',
    key: 'isTeamLeader',
    placeholder: '请选择是否为队长',
    options: ['是', '不是'],
    isVisible: state => state.teamedUp === '已组队'
  }, {
    type: 'text',
    required: true,
    name: '团队名称',
    key: 'teamName',
    placeholder: '请输入团队名称',
    isVisible: state => state.teamedUp === '已组队'
  }, {
    type: 'text',
    required: true,
    name: '学校名称',
    key: 'schoolName',
    placeholder: '请输入学校名称'
  }, {
    type: 'text',
    required: true,
    name: '专业名称',
    key: 'professionalTitle',
    placeholder: '请输入专业名称'
  }, {
    type: 'text',
    required: true,
    name: '就读年级',
    key: 'grade',
    placeholder: '请输入年级'
  }, {
    type: 'text',
    required: false,
    name: '推荐码',
    key: 'referralCode',
    placeholder: '如果有请输入（可选）'
  },
  {
    type: 'text',
    required: true,
    name: '学信网学籍验证码',
    key: 'xueXinWangVerificationCode',
    placeholder: '请输入学信网学籍验证码',
    tip: (
      <ul>
        <li>1. 访问并登录，中国高等教育学生信息网（<Link href="https://www.chsi.com.cn" target="_break">www.chsi.com.cn</Link>）</li>
        <li>2. 选择【在线验证报告】-【教育部学籍在线验证报告】</li>
        <li>3. 复制并填写【学籍验证码】</li>
      </ul>
    )
  }]

export function RegistrationButton() {
  const currentUrl = useUrl()
  const isMobile = useMobile()
  const userInfo = useUserInfo()
  const activity = useActivity()
  const [visible, setVisible] = useState(false)
  const globalEntryContext = useGlobalEntryContext()

  const noLoginRequired = activity?.noLoginRequired != null
    ? activity.noLoginRequired
    : true

  const handelClick = () => {
    // 不需要登录或者已登录则弹出报名框
    if (noLoginRequired || (userInfo && userInfo.signedIn)) {
      return setVisible(true)
    }

    // 需要登录且未登录
    Modal.info({
      content: '未登录，请先登录再报名',
      okText: <a target="_blank" rel="noopener" href={urlForSignin(currentUrl)}>登录</a>
    })
  }

  const isDisabled = activity?.isOverApplyTime
  const text = activity?.isOverApplyTime ? '报名已结束' : '立即报名'

  const btn = () => (
    <Button
      type="primary"
      disabled={isDisabled}
      onClick={handelClick}
      style={{
        width: '100%',
        height: '48px',
        lineHeight: '48px'
      }}
    >
      {text}
    </Button>
  )

  useLayoutEffect(() => {
    if (globalEntryContext) globalEntryContext.set(btn)
    return () => globalEntryContext.set(null)
  }, [isDisabled, activity, userInfo])

  return (
    <>
      <Button
        type="primary"
        disabled={isDisabled}
        onClick={handelClick}
        size={isMobile ? 'default' : 'large'}
        className={styles.button}
      >
        {text}
      </Button>
      {
        activity && (
          <ActivityRegistrationModal
            visible={visible}
            sessions={activity.sessions}
            marketActivityId={activity.id}
            onCancel={() => setVisible(false)}
            extraForm={activityRegistrationExtraForm}
          />
        )
      }
    </>
  )
}
