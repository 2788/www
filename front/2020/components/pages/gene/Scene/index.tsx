import React, { ReactNode } from 'react'
import Scene, { Panel as ScenePanel, Block as SceneBlock } from 'components/Product/Scene'
import { urlMap, Product, nameMap } from 'constants/products'
import { useMobile } from 'hooks/ua'
import ArrowDownIcon from 'components/UI/Menu/arrow-down.svg'
import Link from 'components/Link'
import style from './style.less'
import scene1 from './images/scene1.png'
import scene2 from './images/scene2.png'
import KodoIcon from './images/icon1.svg'
import StorageIcon from './images/icon2.svg'
import CdnIcon from './images/icon3.svg'
import QvmIcon from './images/icon4.svg'

const storeCombination = [
  { name: nameMap[Product.Kodo], url: urlMap[Product.Kodo], icon: <KodoIcon /> },
  { name: nameMap[Product.Storage], url: urlMap[Product.Storage], icon: <StorageIcon /> },
  { name: 'KodoFS', icon: <KodoIcon /> },
  { name: nameMap[Product.Cdn], url: urlMap[Product.Cdn], icon: <CdnIcon /> }
]
const computeCombination = [
  { name: nameMap[Product.Qvm], url: urlMap[Product.Qvm], icon: <QvmIcon /> },
  { name: nameMap[Product.Kodo], url: urlMap[Product.Kodo], icon: <KodoIcon /> },
  { name: nameMap[Product.Cdn], url: urlMap[Product.Cdn], icon: <CdnIcon /> }
]

interface ProductItemProps {
  name: string
  icon: ReactNode
  url?: string
}

function ProductItem({ name, icon, url }: ProductItemProps) {
  const isMobile = useMobile()
  if (!url) {
    return (
      <span className={style.productItem}>
        {icon}
        <span className={style.productItemName} style={{ cursor: 'default' }}>{name}</span>
      </span>
    )
  }
  return (
    <Link href={url} className={style.productItem}>
      {icon}
      <span className={style.productItemName}>{name}</span>
      {isMobile && <ArrowDownIcon className={style.arrow} />}
    </Link>
  )
}

export default function GeneSecne() {
  return (
    <Scene name="scene" title="应用场景">
      <ScenePanel name="scene-1" title="基因数据存储解决方案">
        <SceneBlock blockType="fixed">
          <img src={scene1} className={style.image} />
        </SceneBlock>
        <SceneBlock className={style.sceneContentBlock}>
          <h4 className={style.sceneTitle}>场景说明</h4>
          <p className={style.sceneDesc}>
            提供一体化的存储解决方案，帮助客户构建完备的私有云存储及公有云存储资源池。通过多种网络连通方式打通线下资源与云上资源，形成按需、弹性、易于扩展的异构数据湖。
          </p>
          <h4 className={style.sceneTitle}>方案描述</h4>
          <ul className={style.contentItemContainer}>
            <li className={style.sceneContentItem}>本地 IDC 部署的 Kodo 一体机及云端的对象存储 Kodo 构建统一的异构数据湖。</li>
            <li className={style.sceneContentItem}>在本地，支持不同性能的存储池管理和数据自动迁移，实现存储性能和成本之间的最佳平衡。</li>
            <li className={style.sceneContentItem}>在云端，按照数据特征进行数据生命周期管理。</li>
            <li className={style.sceneContentItem}>遍布全球的内容分发网络，加速数据传输和分发，便于用户、科研单位、监管机构等获得所需的相关数据和文件。</li>
          </ul>
          <h4 className={style.sceneTitle}>推荐产品</h4>
          <div className={style.productsContainer}>
            {
              storeCombination.map(item => (
                <ProductItem key={item.name} name={item.name} icon={item.icon} url={item.url} />
              ))
            }
          </div>
        </SceneBlock>
      </ScenePanel>
      <ScenePanel name="scene-2" title="基因计算解决方案">
        <SceneBlock blockType="fixed">
          <img src={scene2} className={style.image} />
        </SceneBlock>
        <SceneBlock className={style.sceneContentBlock}>
          <div className={style.sceneContainer}>
            <h4 className={style.sceneTitle}>场景说明</h4>
            <p className={style.sceneDesc}>提供一体化的解决方案，帮助基因测序客户构建完备的计算、存储资源池。针对本地计算资源不足场景，通过专线与云端资源互通，按需、快速上线所需云基础资源。</p>
            <h4 className={style.sceneTitle}>方案描述</h4>
            <ul className={style.contentItemContainer}>
              <li className={style.sceneContentItem}>强大云基础设施支撑，支持多种接入方式，提供完备的计算、网络、数据库、存储等云产品。</li>
              <li className={style.sceneContentItem}>按需灵活扩展所需的云基础资源，降低 TCO。</li>
              <li className={style.sceneContentItem}>遍布全球的内容分发网络，便于各类用户获取所需的数据和文件。</li>
            </ul>
            <h4 className={style.sceneTitle}>推荐产品</h4>
            <div className={style.productsContainer}>
              {
                computeCombination.map(item => (
                  <ProductItem key={item.name} name={item.name} icon={item.icon} url={item.url} />
                ))
              }
            </div>
          </div>
        </SceneBlock>
      </ScenePanel>
    </Scene>
  )
}

