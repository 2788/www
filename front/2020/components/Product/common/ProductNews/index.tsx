/**
 * @file          component  ProductNews
 * @description   应用在产品页的产品动态，位置先于相关文档/相关云产品，后于详情页其他模块。
 * @author        renpanpan
 */

import React from 'react'
import { INewsResponse } from 'apis/admin/product'
import { useMobile } from 'hooks/ua'

import ForPc from './Pc'
import ForMobile from './Mobile'

const maxNum = 4

export default function ProductNews({ newsRes }: { newsRes: INewsResponse }) {
  const isMobile = useMobile()
  return (
    isMobile
      ? <ForMobile news={newsRes.data} count={newsRes.count} maxNum={maxNum} />
      : <ForPc news={newsRes.data} count={newsRes.count} maxNum={maxNum} />
  )
}

export function formatTime(time: number): string {
  const date = new Date(time * 1000)
  return `${date.getFullYear()}-${fillSpace(date.getMonth() + 1)}-${fillSpace(date.getDate())}`
}

function fillSpace(num: number): string {
  return num >= 10 ? num.toString() : '0' + num
}
