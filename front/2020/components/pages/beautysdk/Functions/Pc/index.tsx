import React from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import style from './style.less'
import { ItemType } from '..'

export default function ForPc({ productFunctions }: any) {
  return (
    <Tabs defaultValue="0" vertical contentClassName={style.content}>
      {
        productFunctions.map((item: ItemType, index: number) => (
          <TabPane tab={item.title} value={index.toString()} key={index}>
            <div className={style.container}>
              <p className={style.desc}>{item.desc}</p>
              <img src={item.url} className={style.pic} />
            </div>
          </TabPane>
        ))
      }
    </Tabs>
  )
}
