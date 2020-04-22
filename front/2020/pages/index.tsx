/**
 * @file 首页内容
 */

import React from 'react'
import Layout from '../components/Layout'
import style from './style.less'

export default function IndexPage() {
  return (
    <Layout>
      <section className={style.banner}></section>
      <section className={style.slogan}>
        连接数据，重塑价值
      </section>
    </Layout>
  )
}
