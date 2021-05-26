import React from 'react'
import Scene, { Panel } from 'components/Product/Scene'
import { Type, CardProps, typeArr, textMap } from '..'
import ArrowIcon from './arrow.svg'
import style from './style.less'

export default function ForMobile({ dataMap }: { dataMap: { [k in Type]: Array<CardProps | null> } }) {
  return (
    <Scene name="services" title="服务精选">
      {
        typeArr.map(type => (
          <Panel name={type} title={textMap[type]} key={type} className={style.container}>
            {
              dataMap[type].map(item => (
                item ? (
                  <a className={style.linkItem} href={item.href}>
                    <div className={style.item}>
                      <div className={style.itemContent}>
                        <h3 className={style.itemTitle}>{item.title}</h3>
                        <p className={style.desc}>{item.desc}</p>
                      </div>
                      <ArrowIcon className={style.arrowIcon} />
                    </div>
                  </a>
                ) : null
              ))
            }
          </Panel>
        ))
      }
    </Scene>
  )
}
