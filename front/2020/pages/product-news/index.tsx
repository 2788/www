/* eslint-disable no-underscore-dangle */
/**
 * @file          component  product-news
 * @description   全部的产品动态
 * @author        renpanpan
 */

import React, { useCallback, useMemo, useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { chunk } from 'lodash'

import Layout from 'components/Product/Layout'
import Banner, { Title, Desc } from 'components/Banner'
import Link from 'components/Link'
import { Row } from 'components/UI/Card'
import Pagination from 'components/UI/Pagination'
import { NewsType, nameMap, newsTypeArr } from 'constants/products/news'
import { getPages, IPage, getNews, INews } from 'apis/admin/product'
import { getGlobalBanners } from 'apis/admin/global-banners'
import { useApiWithParams } from 'hooks/api'
import { useMobile } from 'hooks/ua'
import { withLoading } from 'utils/loading'
import ResultEmpty from 'components/UI/ResultEmpty'

import banner from './images/banner.png'
import styles from './style.less'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const pcPageSize = 10
const mobilePageSize = 5

function Page({ pages }: Omit<Props, 'globalBanners'>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [product, setProduct] = useState<string | undefined>(undefined)
  const [newsType, setNewsType] = useState<NewsType | undefined>(undefined)

  const isMobile = useMobile()
  const pageSize = isMobile ? mobilePageSize : pcPageSize
  const param = useMemo(() => (
    {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      product,
      type: newsType
    }
  ), [currentPage, newsType, pageSize, product])
  const { $: res, loading } = useApiWithParams(
    getNews,
    {
      params: [param],
      delay: 200
    }
  )
  const data: Array<INews & { page?: IPage }> = useMemo(() => (
    res
      ? res.data.map(item => {
        const page = pages.find(p => p.id === item.product)
        return { ...item, page }
      })
      : []
  ), [pages, res])

  const cardsView = (
    <div className={styles.cards}>
      {
        data.length > 0 && (isMobile
          ? data.map(item => <MyCard data={item} key={item._id} />)
          : chunk(data, 2).map((group, i) => (
            <Row key={i}>
              {
                // 长度只能为1或者2，为1时填充一个隐形卡片占位
                group.length === 2
                  ? group.map(item => <MyCard data={item} key={item._id} />)
                  : (
                    <>
                      {group.map(item => <MyCard data={item} key={item._id} />)}
                      <div className={`${styles.card} ${styles.invisible}`}></div>
                    </>
                  )
              }
            </Row>
          ))
        )
      }
    </div>
  )
  const paginationView = res && res.count > pageSize && (
    <Pagination
      className={styles.pagination}
      current={currentPage}
      total={res.count}
      pageSize={pageSize}
      onChange={page => setCurrentPage(page)}
    />
  )
  const contentView = data.length > 0 ? (
    <>
      {cardsView}
      {paginationView}
    </>
  ) : (
    <ResultEmpty className={styles.emptyBox} tip="该产品暂无动态" />
  )

  return (
    <div className={styles.wrapper}>
      <Banner background={banner} backgroundSize="contain" backgroundPosition="right bottom">
        <Title>产品动态</Title>
        <Desc className={styles.desc}>了解行业最新技术，七牛云产品最新权威动态</Desc>
      </Banner>

      <div className={styles.categories}>
        <Category
          title="产品大类"
          items={pages.map(page => ({ name: page.name, value: page.id }))}
          value={product}
          onChange={val => setProduct(val)}
        />
        <Category
          title="动态类型"
          items={newsTypeArr.map(type => ({ name: nameMap[type], value: type }))}
          value={newsType}
          onChange={val => setNewsType(val)}
        />
      </div>
      {
        withLoading(loading)(
          <>
            {contentView}
          </>
        )
      }
    </div >
  )
}

type CategoryProps<T> = {
  title: string
  items: Array<{
    name: string
    value: T
  }>
  value: T | undefined
  onChange: (val: T | undefined) => void
}

function Category<T>({ title, items, value, onChange }: CategoryProps<T>) {
  const handleClick = useCallback((val: T | undefined) => {
    if (val !== value) {
      onChange(val)
    }
  }, [onChange, value])
  const itemsView = items.map((item, index) => (
    <span
      key={index}
      onClick={() => handleClick(item.value)}
      {...(value === item.value ? { className: styles.active } : {})}
    >
      {item.name}
    </span>
  ))

  return (
    <div className={styles.categoryWrapper}>
      <label>{title}</label>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.items}>
            <span onClick={() => handleClick(undefined)} className={value === undefined ? styles.active : undefined}>
              全部
            </span>
            {itemsView}
          </div>
        </div>
      </div>
    </div>
  )
}

function MyCard({ data }: { data: INews & { page?: IPage } }) {
  return (
    <div className={styles.card}>
      <header>
        <div className={styles.type}>{nameMap[data.type]}</div>
        <span className={styles.time}>{formatTime(data.releaseTime)}</span>
      </header>
      <section className={styles.content}>
        <p className={styles.title}>{`${data.page ? `${data.page.name} | ` : ''}${data.title}`}</p>
        <p className={styles.desc}>{data.desc}</p>
      </section>
      <footer>
        {data.page && <Link href={data.page.link} blue>查看产品 &gt;</Link>}
        {data.link && <Link href={data.link} className={styles.detailLink} blue>查看文档 &gt;</Link>}
      </footer>
    </div>
  )
}

function formatTime(time: number): string {
  const date = new Date(time * 1000)
  return `${date.getFullYear()}-${fillSpace(date.getMonth() + 1)}-${fillSpace(date.getDate())}`
}

function fillSpace(num: number): string {
  return num >= 10 ? num.toString() : '0' + num
}

export default function ProductNews({ globalBanners, ...pageProps }: Props) {
  return (
    <Layout
      title="产品动态"
      keywords="产品, 动态, 产品动态, 最新, 科技趋势, 新产品, 实时动态"
      description="了解行业最新技术，七牛云产品最新权威动态"
      globalBanners={globalBanners}
    >
      <Page {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await getPages()
  const globalBanners = await getGlobalBanners()
  return {
    props: {
      pages: res,
      globalBanners
    }
  }
}
