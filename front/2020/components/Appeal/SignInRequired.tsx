/**
 * @file 登录
 */

import React, { ReactNode, useEffect } from 'react'

import Button from 'react-icecream-2/lib/Button'

import { urlForSignin } from 'utils/route'
import { useUserInfo, useIsLoadingUserInfo } from 'components/UserInfo'
import Loading from 'components/UI/Loading'
import { useInfoDialog, useDialogFooterCtx } from 'components/UI/Dialog'

import style from './style.less'

export interface Props {
  children: ReactNode
}

function SignInFooter() {
  const { onOk } = useDialogFooterCtx()
  return (<Button type="primary" onClick={onOk}>去登录</Button>)
}

export default function SignInRequired({ children }: Props) {
  const [showDialog, Dialog] = useInfoDialog('none')
  const isLoadingUserInfo = useIsLoadingUserInfo()
  const uesrInfo = useUserInfo()
  const isSignedIn = !!uesrInfo && uesrInfo.signedIn

  useEffect(() => {
    if (!isLoadingUserInfo && !isSignedIn) {
      showDialog().then(() => {
        window.location.href = urlForSignin(window.location.href)
      })
    }
  }, [isLoadingUserInfo, isSignedIn, showDialog])

  if (isLoadingUserInfo) {
    return (
      <Loading className={style.signInRequiredLoading} />
    )
  }

  return isSignedIn
    ? (<>{children}</>)
    : (
      <div className={style.unavailableTips}>
        <p>请登录</p>
        <Dialog
          title="提示"
          footer={<SignInFooter />}
        >
          尊敬的用户，在提交申诉前请先登录账号。
        </Dialog>
      </div>
    )
}
