import React from 'react'
import Scene, { Panel, Block } from 'components/Product/Scene'
import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import style from './style.less'

export default function Architecture() {
  return (
    <Scene name="architecture" title="方案架构">
      <Panel name="arch-1" title="车载云上视频管理方案" className={style.panel}>
        <Block blockType="fixed"><Icon1 className={style.icon} /></Block>
      </Panel>
      <Panel name="arch-2" title="车企智能运维分析方案" className={style.panel}>
        <Block blockType="fixed"><Icon2 className={style.icon} /></Block>
      </Panel>
    </Scene>
  )
}
