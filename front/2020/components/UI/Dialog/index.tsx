/**
 * @file Dialog
 */

import React, { useState, useCallback, useRef } from 'react'

// FIXME: 查一下 Modal / Dialog 是不是也需要 cancel 啥的
import IcecreamBaseDialog from 'react-icecream-2/lib/Dialog'
import * as icecreamDialog from 'react-icecream-2/lib/Dialog'

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

  const showDialog = useCallback((props?: UseDialogProps) => {
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
      />
    )
  }, [IcecreamDialog, visible, shownDialogProps])

  return [showDialog, Dialog] as const
}

export function useBaseDialog() {
  return useDialog(IcecreamBaseDialog)
}

function useStatusDialog(IcecreamDialog: DialogType, isCancelable = true) {
  const [showDialog, Dialog] = useDialog(IcecreamDialog)

  // TODO: need sth like `maskClosable` & `keyboardClosable` to avoid cancel
  const showDialogWithoutCancel = useCallback((props?: UseDialogProps) => (
    showDialog(props).catch(() => undefined)
  ), [showDialog])

  return [isCancelable ? showDialogWithoutCancel : showDialog, Dialog] as const
}

export function useSuccessDialog(isCancelable?: boolean) {
  return useStatusDialog(icecreamDialog.SuccessDialog, isCancelable)
}

export function useErrorDialog(isCancelable?: boolean) {
  return useStatusDialog(icecreamDialog.ErrorDialog, isCancelable)
}

export function useInfoDialog(isCancelable?: boolean) {
  return useStatusDialog(icecreamDialog.InfoDialog, isCancelable)
}

export function useWarningDialog(isCancelable?: boolean) {
  return useStatusDialog(icecreamDialog.WarningDialog, isCancelable)
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
