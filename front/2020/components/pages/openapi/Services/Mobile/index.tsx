import React from 'react'
import Scene, { Panel } from 'components/Product/Scene'
import { HandpickValue } from '..'
import ArrowIcon from './arrow.svg'
import style from './style.less'

export default function ForMobile({ data }: { data: HandpickValue }) {
  return (
    <Scene name="services" title="服务精选">
      {
        data.map(({ key, group }) => (
          <Panel name={key} title={key} key={key} className={style.container}>
            {group.map(({ title, list }) => (
              <>
                <div className={style.companyWrapper}>
                  <div className={style.prefix} />
                  <div className={style.company}>{title}</div>
                </div>
                {list.map(item => (
                  <a key={item.title} className={style.linkItem} href={item.href}>
                    <div className={style.item}>
                      <div className={style.itemContent}>
                        <h3 className={style.itemTitle}>{item.title}</h3>
                        <p className={style.desc}>{item.desc}</p>
                      </div>
                      <ArrowIcon className={style.arrowIcon} />
                    </div>
                  </a>
                ))}
              </>
            ))}
          </Panel>
        ))
      }
    </Scene>
  )
}
