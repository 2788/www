import React, { ReactNode, useRef, useEffect } from 'react'

import style from './index.less'

export default function Section(props: { title: string; children: ReactNode, registerScrollTop(value: number): void }) {
  const { title, registerScrollTop, children } = props
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    registerScrollTop(ref.current?.offsetTop || 0)
  }, [registerScrollTop])

  return (
    <section ref={ref}>
      <div className={style.title}>{title}</div>
      {children}
    </section>
  )
}
