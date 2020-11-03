
/**
 * @file 新推官
 */
import React from 'react'

import { useMobile } from 'hooks/ua'
import { useApiWithParams } from 'hooks/api'
import { getCpsInfo } from 'apis/cps'

import Button from 'components/UI/Button'
import Layout from 'components/Product/Layout'
import Banner from 'components/Banner'

import Activities from 'components/pages/cps/Activities'
import Reward from 'components/pages/cps/Reward'
import Process from 'components/pages/cps/Process'
import Raiders from 'components/pages/cps/Raiders'
import Cases from 'components/pages/cps/Cases'
import Rule from 'components/pages/cps/Rule'

import banner from './images/banner.png'
import banner_mobile from './images/banner_mobile.png'
import style from './style.less'

function Page() {
  const isMobile = useMobile()
  const { $: result } = useApiWithParams(getCpsInfo, { params: [] })
  const bgImg = isMobile ? banner_mobile : banner
  const btnText = result ? '立即推广' : '加入新推官'
  return (
    <>
      <Banner
        className={style.banner}
        background={bgImg}
        backgroundSize="contain"
        backgroundPosition="center"
        showMobileBgImg
      >
        <Button
          className={style.btn}
          key="1"
          href="https://portal.qiniu.com/invitation"
          type="default"
        >
          {btnText}
        </Button>
      </Banner>

      <Activities />

      <Reward />

      <Process />

      <Raiders />

      <Cases />

      <Rule />
    </>
  )
}

export default function Cps() {
  return (
    <Layout
      title="新推官"
      keywords="七牛云, 新推官, 推广, 权益返现, 返佣, 爆款云产品, 30 天关联期, 佣金, 推广攻略, 推广流程, 奖励, 多渠道, 注册"
      description="七牛云新推官 火热招募中,推广简单易上手，权益返现新升级"
    >
      <Page />
    </Layout>
  )
}
