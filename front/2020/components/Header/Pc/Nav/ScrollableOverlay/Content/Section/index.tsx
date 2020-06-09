import React, { useRef, useEffect, useContext, ReactNode } from 'react'
import { Context } from '../..'
import style from './index.less'

export default function ContentSection({ title, children }: { title: string, children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  const { registerScrollTop } = useContext(Context)
  useEffect(() => {
    if (registerScrollTop) {
      registerScrollTop(title, ref.current?.offsetTop || 0)
    }
  }, [registerScrollTop, title])
  return (
    <section ref={ref}>
      <div className={style.title}>{title}</div>
      {children}
    </section>
  )
}
