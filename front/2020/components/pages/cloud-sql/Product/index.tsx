import React, { ReactNode } from 'react'
import { useMobile } from 'hooks/ua'
import ForMobile from './Mobile'
import ForPc from './Pc'
import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import Icon4 from './images/icon4.svg'
import Icon5 from './images/icon5.svg'
import Icon6 from './images/icon6.svg'

export interface CardProps {
  icon: ReactNode
  title: string
  desc: string
  href: string
}

export type ProductProps = {
  data: CardProps[][]
  title?: string
  header?: string
}

const products: CardProps[][] = [
  [
    {
      icon: <Icon1 />,
      title: '云数据库 PolarDB 版',
      desc: '下一代关系型分布式云原生数据库，目前兼容 MySQL 引擎。存储容量最高可达 100 TB，单库最多可扩展到 16 个节点，适用于企业多样化的数据库应用场景。',
      href: 'https://developer.qiniu.com/qvm/manual/6695/polardb-product-introduction'
    },
    {
      icon: <Icon2 />,
      title: '云数据库 RDS MySQL 版 ',
      desc: 'MySQL 是全球最受欢迎的开源数据库之一，作为开源软件组合 LAMP 中的重要一环，广泛应用于各类应用场景。RDS MySQL 支持数据库管理、备份恢复、白名单以及数据迁移等基本功能。',
      href: 'https://developer.qiniu.com/qvm/manual/4272/mysql-introduction'
    },
    {
      icon: <Icon3 />,
      title: '云数据库 RDS SQL Server 版',
      desc: 'SQL Server 支持复杂的 SQL 查询，性能优秀，对基于 Windows 平台 .NET 架构的应用程序具有完美的支持。RDS SQL Server 拥有高可用架构和任意时间点的数据恢复功能，强力支撑各种企业应用。',
      href: 'https://developer.qiniu.com/qvm/manual/7177/SQLSever-product-introduction'
    }
  ],
  [
    {
      icon: <Icon4 />,
      title: '云数据库 Redis 版',
      desc: '云数据库 Redis 版是兼容开源 Redis 协议标准、提供内存加硬盘的混合存储方式的数据库服务，基于高可靠双机热备架构及可平滑扩展的集群架构，满足高读写性能场景及弹性变配的业务需求。',
      href: 'https://developer.qiniu.com/qvm/manual/4220/qvm-redis-introduction'
    },
    {
      icon: <Icon5 />,
      title: '云数据库 MongoDB 版',
      desc: '云数据库 MongoDB 版是高可靠存储引擎，提供三节点副本集高可用架构，实现容灾切换、故障迁移完全透明化；提供强大的数据库管理功能，实现数据库的在线扩容、备份回滚、性能优化等。',
      href: 'https://developer.qiniu.com/qvm/manual/5476/what-is-mongodb-cloud-database'
    },
    {
      icon: <Icon6 />,
      title: '云数据库 PostgreSQL 版',
      desc: 'RDS PostgreSQL 的优点主要集中在对 SQL 规范的完整实现以及丰富多样的数据类型支持，包括 JSON 数据、IP 数据和几何数据等，完美支持事务、子查询、多版本控制（MVCC）、数据完整性检查等特性。',
      href: 'https://developer.qiniu.com/qvm/manual/7180/cloud-postgresql-database-Product-Introduction'
    }
  ]
]
export default function SqlProduct() {
  return <CustomProduct data={products} title="产品简介" header="丰富的云数据库产品" />
}

export function CustomProduct(props: ProductProps) {
  return useMobile() ? <ForMobile {...props} /> : <ForPc {...props} />
}
