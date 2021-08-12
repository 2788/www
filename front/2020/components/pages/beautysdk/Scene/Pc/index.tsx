
import React from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { ItemType } from '..'
import style from './style.less'

export default function ForPc({ scenes }: any) {
  return (
    <Tabs defaultValue="0">
      {
        scenes.map((scene: ItemType, index: number) => (
          <TabPane key={index} tab={scene.title} value={index.toString()}>
            <div className={style.container}>
              <p className={style.desc}>{scene.desc}</p>
              <img src={scene.url} className={style.pic} />
            </div>
          </TabPane>
        ))
      }
    </Tabs>
  )
}
