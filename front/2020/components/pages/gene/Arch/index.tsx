import React from 'react'
import Scene, { Panel, Block } from 'components/Product/Scene'
import ArchImg1 from './images/archImg1.svg'
import ArchImg2 from './images/archImg2.svg'
import style from './style.less'

export default function GeneArch() {
  return (
    <Scene name="arch" title="方案架构">
      <Panel name="arch-1" title="基因数据存储解决方案" className={style.panel}>
        <Block blockType="fixed"><ArchImg1 className={style.image} /></Block>
      </Panel>
      <Panel name="arch-2" title="基因计算解决方案" className={style.panel}>
        <Block blockType="fixed"><ArchImg2 className={style.image} /></Block>
      </Panel>
    </Scene>
  )
}
