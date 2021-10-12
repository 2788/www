import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'
import Link from 'components/Link'
import { useMobile } from 'hooks/ua'
import ArrowDownIcon from 'components/UI/Menu/arrow-down.svg'
import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'
import image4 from './images/image4.png'
import style from './index.less'

const urlMap = {
  ECS: 'https://portal.qiniu.com/qvm/vm/instance/create',
  SLB: 'https://portal.qiniu.com/qvm/slb/instance/create',
  MySQL: 'https://portal.qiniu.com/qvm/db/rds/create',
  Redis: 'https://portal.qiniu.com/qvm/db/redis/create',
  DDOS: 'https://portal.qiniu.com/qvm/security/new-bgp/manage/instance',
  MongoDB: 'https://portal.qiniu.com/qvm/db/mongo/create?type=replicate',
  PolarDB: 'https://portal.qiniu.com/qvm/db/polardb/create'
}

const scenes = [
  {
    url: image1,
    title: '金融',
    suggest: '金融行业对于数据安全和可靠性有非常严格的要求，RDS 既拥有商业数据库的稳定可靠性，又拥有开源数据库的灵活性和低成本',
    desc: [
      { title: 'ECS', href: urlMap.ECS },
      { title: 'SLB', href: urlMap.SLB },
      { title: '云数据库 MySQL', href: urlMap.MySQL },
      { title: '云数据库 Redis', href: urlMap.Redis },
      { title: 'DDOS', href: urlMap.DDOS }
    ]
  },
  {
    url: image2,
    title: '游戏',
    suggest: '游戏公司为了快速抢占市场，需要快速的开发出新产品吸引玩家，云数据库 Redis 版能减少系统开发复杂度，业务爆发时可轻松弹性扩容，满足高性能业务要求',
    desc: [
      { title: 'ECS', href: urlMap.ECS },
      { title: 'SLB', href: urlMap.SLB },
      { title: '云数据库 MySQL', href: urlMap.MySQL },
      { title: '云数据库 Redis', href: urlMap.Redis },
      { title: 'DDOS', href: urlMap.DDOS }
    ]
  },
  {
    url: image3,
    title: '互联网',
    suggest: '互联网行业的发展经常呈爆发性增长，业务波动变化频繁，流量高峰难以预测。RDS 弹性扩展能力至关重要，凭借其强大的弹性能力使得它特别契合这一行业特点',
    desc: [
      { title: 'ECS', href: urlMap.ECS },
      { title: 'SLB', href: urlMap.SLB },
      { title: '云数据库 MySQL', href: urlMap.MySQL },
      { title: '云数据库 MongoDB 版', href: urlMap.MongoDB },
      { title: '云数据库 Redis', href: urlMap.Redis }
    ]
  },
  {
    url: image4,
    title: '电商',
    suggest: '轻松应对高并发的应用场景，在促销、秒杀等流量峰值的场景中实现秒级扩容，支持企业应对大规模数据分析的读写需求。实现海量数据低成本存储、快速弹性扩容，保障数据库集群可用性',
    desc: [
      { title: 'ECS', href: urlMap.ECS },
      { title: 'SLB', href: urlMap.SLB },
      { title: '云数据库 PolarDB', href: urlMap.PolarDB },
      { title: '云数据库 Redis', href: urlMap.Redis }
    ]
  }
]

interface ProductItemProps {
  name: string
  url: string
}

function ProductItem({ name, url }: ProductItemProps) {
  const isMobile = useMobile()

  return (
    <Link href={url} className={style.productItem}>
      <span>{name}</span>
      {isMobile && <ArrowDownIcon className={style.arrow} />}
    </Link>
  )
}

export default function SqlScene() {

  return (
    <Scene name="scene" title="应用场景" header="广泛的应用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} key={index}>
            <SceneBlock blockType="fixed">
              <img src={scene.url} className={style.sceneIcon} />
            </SceneBlock>
            <SceneBlock className={style.blockRight}>
              <h3 className={style.sceneTitle}>上云建议</h3>
              <p>{scene.suggest}</p>
              <h3 className={style.sceneTitle}>推荐产品</h3>
              <div className={style.productsContainer}>
                {
                  scene.desc.map(item => (
                    <ProductItem key={item.title} name={item.title} url={item.href} />
                  ))
                }
              </div>
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
