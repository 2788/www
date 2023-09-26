/**
 * @file Dialog
 */

import React, { useState, useCallback, useRef } from 'react'

// FIXME: 查一下 Modal / Dialog 是不是也需要类似 `useAlive` 啥的 @huangbinjie
import { Dialog as IcecreamBaseDialog } from 'react-icecream-2/lib/Dialog'
import * as icecreamDialog from 'react-icecream-2/lib/Dialog'

import style from './style.less'

export * from 'react-icecream-2/lib/Dialog'
export { default } from 'react-icecream-2/lib/Dialog'

function doNothing() {
  //
}

/** InfoDialog / SuccessDialog / ErrorDialog / WarningDialog / Dialog */
type DialogType = typeof IcecreamBaseDialog

export type UseDialogProps = Partial<Omit<icecreamDialog.DialogProps, 'visible' | 'onOk' | 'onCancel'>>

export function useDialog(IcecreamDialog: DialogType) {
  const [visible, setVisible] = useState(false)
  const resolveRef = useRef(doNothing)
  const rejectRef = useRef(doNothing)
  const [shownDialogProps, setShownDialogProps] = useState<UseDialogProps | undefined>(undefined)

  const showDialog = useCallback((props?: UseDialogProps): Promise<void> => {
    setVisible(true)
    setShownDialogProps(props)

    function reset() {
      setVisible(false)
      resolveRef.current = doNothing
      rejectRef.current = doNothing
    }

    return new Promise<void>((promiseResolve, promiseReject) => {
      resolveRef.current = () => {
        reset()
        promiseResolve()
      }

      rejectRef.current = () => {
        reset()
        promiseReject()
      }
    })
  }, [])

  const Dialog = useCallback(function ControlledDialog(props: UseDialogProps) {
    const CompIcecreamDialog = IcecreamDialog // FIXME: eslint 依赖检测有 bug
    return (
      <CompIcecreamDialog
        // eslint-disable-next-line react/no-children-prop
        children={null}
        {...props}
        {...shownDialogProps}
        visible={visible}
        onOk={resolveRef.current}
        onCancel={rejectRef.current}
        className={style.dialog}
      />
    )
  }, [IcecreamDialog, visible, shownDialogProps])

  return [showDialog, Dialog] as const
}

export function useBaseDialog() {
  return useDialog(IcecreamBaseDialog)
}

// TODO: 未来 icecream 的 status dialog 如果没有 `onCancel` 的概念 @huangbinjie
//   那么 `CancelType` 也许是不需要的，因为 `reject` 没了，默认行为就是 `resolve`
//   而 `none` 也许可以直接通过配置 Dialog 的各种 closable 行为来实现
type CancelType = 'none' | 'resolve' | 'reject'

function useStatusDialog(IcecreamDialog: DialogType, cancelType: CancelType = 'resolve') {
  const [showBaseDialog, Dialog] = useDialog(IcecreamDialog)

  const showDialog = useCallback((props?: UseDialogProps): Promise<void> => {
    if (cancelType === 'resolve') {
      return showBaseDialog(props).catch(() => undefined)
    }

    if (cancelType === 'reject') {
      return showBaseDialog(props)
    }

    if (cancelType === 'none') {
      return showBaseDialog({
        ...props,
        // `StatusDialog` 本身就没有右上角的叉和取消按钮
        maskClickable: false,
        keyboard: false
      })
    }

    throw new Error(`Unexpect cancel type: ${cancelType}.`)
  }, [showBaseDialog, cancelType])

  return [showDialog, Dialog] as const
}

export function useSuccessDialog(cancelType?: CancelType) {
  return useStatusDialog(icecreamDialog.SuccessDialog, cancelType)
}

export function useErrorDialog(cancelType?: CancelType) {
  return useStatusDialog(icecreamDialog.ErrorDialog, cancelType)
}

export function useInfoDialog(cancelType?: CancelType) {
  return useStatusDialog(icecreamDialog.InfoDialog, cancelType)
}

export function useWarningDialog(cancelType?: CancelType) {
  return useStatusDialog(icecreamDialog.WarningDialog, cancelType)
}

export function useConfirmDialog() {
  const [showDialog, BaseDialog] = useBaseDialog()

  const Dialog = useCallback(function ConfirmDialog(props: UseDialogProps) {
    const CompBaseDialog = BaseDialog // FIXME: eslint 依赖检测有 bug
    return (
      <CompBaseDialog
        title="提示"
        icon
        {...props}
      />
    )
  }, [BaseDialog])

  return [showDialog, Dialog] as const
}
