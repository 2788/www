import React from 'react'
import Modal, { ModalProps } from 'react-icecream/lib/modal'

export default function EditorModal(props: React.PropsWithChildren<ModalProps>) {
  const { visible, title, onCancel, onOk, confirmLoading, children, ...rest } = props
  return (
    <Modal
      width={740}
      maskClosable={false}
      visible={visible}
      title={title}
      destroyOnClose
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={confirmLoading}
      {...rest}
    >
      {children}
    </Modal>
  )
}
