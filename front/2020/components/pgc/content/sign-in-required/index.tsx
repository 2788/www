/**
 * @file 登录
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useCallback } from 'react'

import { DialogFooter } from 'react-icecream-2/lib/Dialog'

import { urlForSignin } from 'utils/route'
import { useUserInfo } from 'components/UserInfo'
import { useInfoDialog } from 'components/UI/Dialog'

export function useSignInRequired(text: string) {
  const [showDialog, Dialog] = useInfoDialog('reject')
  const uesrInfo = useUserInfo()
  const isSignedIn = !!uesrInfo && uesrInfo.signedIn

  // resolve 表示已登录
  const signInRequired = useCallback(async () => {
    if (isSignedIn) {
      return
    }

    await showDialog()
    window.location.href = urlForSignin(window.location.href)
    return new Promise(() => null) // 页面马上就要跳转，暂时返回一个既不会 resolve 也不会 reject 的 promise 即可
  }, [isSignedIn, showDialog])

  const dialogView = (
    <Dialog
      title="提示"
      footer={<DialogFooter okText="去登录" />}
    >
      登录后即可{text}
    </Dialog>
  )

  return [signInRequired, dialogView] as const
}
