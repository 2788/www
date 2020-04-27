import React from 'react'

import styles from './style.less'

export interface HeaderNotificationProps {
  content: React.ReactNode
  closeText?: string
  closeable?: boolean
}

const defaultProps: HeaderNotificationProps = {
  content: null,
  closeText: '我知道了',
  closeable: true
}

export default function HeaderNotification(props: HeaderNotificationProps) {
  const { closeText, closeable, content } = { ...defaultProps, ...props }
  const [hidden, setHidden] = React.useState(false)
  if (hidden) {
    return null
  }
  return (
    <div className={styles.headerNotification}>
      <span className={styles.content}>{content}</span>
      {closeable && <a className={styles.closeIcon} onClick={() => setHidden(true)} type="link">{closeText}</a>}
    </div>
  )
}
