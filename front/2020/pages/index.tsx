/**
 * @file 首页内容
 */

import React from 'react'
import Layout from '../components/Layout'
import UsageGuide, { Button } from '../components/Product/UsageGuide'
import style from './style.less'

export default function IndexPage() {
  return (
    <Layout>
      <section className={style.banner}></section>
      <section className={style.slogan}>
        连接数据，重塑价值
      </section>
      <UsageGuide
        title="开始试用七牛云 SMS"
        description="完成实名认证，即可轻松使用七牛云 SMS"
      >
        <Button href="/products/kodo/">立即创建</Button>
      </UsageGuide>
    </Layout>
  )
}
