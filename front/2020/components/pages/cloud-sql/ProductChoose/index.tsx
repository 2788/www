/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Wed May 06 2020
 * @file: 存储类型
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Section from 'components/Product/Section'
import Card, { Title, Desc, List, HookItem, Button } from 'components/OperationCard'
import { Row } from 'components/UI/Card'

import style from './index.less'

const products = [
  {
    title: '云数据库 MySQL',
    desc: '性能 3 倍于自建，降低 60% 运维量，金融级安全及稳定保障',
    sellPoints: [
      '地域：青岛',
      '版本：8.0',
      '系列：基础版',
      '规格：4 核 8G（单机基础版）'
    ],
    prePrice: '4401.74',
    nowPrice: '3350.54',
    href: 'https://portal.qiniu.com/qvm/db/rds/create?db_instance_class=mysql.n2.large.1&region_id=cn-qingdao&buymonth=12&engine_version=8.0'
  },
  {
    title: '云数据库 Redis',
    desc: '兼容 Redis 协议标准，提供持久化的内存数据库服务',
    sellPoints: [
      '地域：青岛',
      '版本类型：社区版',
      '引擎版本：Redis 5.0',
      '架构类型：集群版',
      '分片数：4 分片',
      '节点类型：双副本',
      '实例规格：16G 集群版（4 节点）'
    ],
    prePrice: '17100',
    nowPrice: '12780',
    href: 'https://portal.qiniu.com/qvm/db/redis/create?region_id=cn-qingdao&buymonth=12&edition=Community&version=5.0&architecture=cluster&shard_num=4&node_type=double&instance_class=redis.logic.sharding.4g.4db.0rodb.4proxy.default'
  },
  {
    title: '云数据库 MongoDB 版',
    desc: '提供多节点副本集高可用架构、弹性扩容、容灾、备份回滚、性能优化等解决方案',
    sellPoints: [
      '地域：青岛',
      '实例类型：副本集',
      '版本：MongoDB 4.2',
      '存储引擎：WiredTiger',
      '节点数量：三节点',
      '规格：8 核 32G'
    ],
    prePrice: '45868.81',
    nowPrice: '39028.81',
    href: 'https://portal.qiniu.com/qvm/db/mongo/create?type=replicate&region_id=cn-qingdao&buymonth=12&engine_version=4.2&storage_engine=WiredTiger&replication_factor=3&db_instance_class=dds.mongo.2xlarge'
  },
  {
    title: '云数据库 PolarDB 版',
    desc: '兼容三种数据库引擎：MySQL、PostgreSQL、高度兼容 Oracle 语法',
    sellPoints: [
      '地域：杭州',
      '数据库类型：MySQL',
      '版本：MySQL 5.6',
      '规格：4 核 16G',
      '节点数量：双节点'
    ],
    prePrice: '22800',
    nowPrice: '17040',
    href: 'https://portal.qiniu.com/qvm/db/polardb/create?region_id=cn-hangzhou&buymonth=12&db_type=MySQL&db_version=mysql56&db_node_class=polar.mysql.x4.large&replication_factor=2'
  }
]
export default function ProductChoose() {
  return (
    <Section name="product-choose" title="产品选购">
      <Row>
        {
          products.map((item, index) => (
            <ProductCard {...item} index={index} key={index} />
          ))
        }
      </Row>
    </Section>
  )
}

type CardProps = {
  title: string
  desc: string
  sellPoints: string[]
  prePrice: string
  nowPrice: string
  href: string
  index: number
}

export function ProductCard({ title, desc, sellPoints, prePrice, nowPrice, href, index }: CardProps) {
  const headerView = (
    <>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </>
  )
  const footerView = (
    <>
      <p className={style.nowPrice}>
        {nowPrice}
        <span className={style.unit}> 元/年</span>
      </p>
      <p className={style.prePrice}>
        原价：{prePrice} 元/年
      </p>
      <Button className={style.button} target="_blank" href={href}>立即购买</Button>
    </>
  )
  return (
    <Card header={headerView} footer={footerView} className={style.card}>
      <>
        <List>
          {
            sellPoints.map((sellPoint, i) => (
              <HookItem key={`${index}-${i}`}>{sellPoint}</HookItem>
            ))
          }
        </List>
      </>
    </Card>
  )
}
