import React, { useCallback } from 'react'
import { Modal } from 'react-icecream'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import { useUserInfo } from 'components/UserInfo'
import { useUrl } from 'hooks/url'
import { urlForSignin } from 'utils/route'

import Benefit from 'components/pages/openapi-partner/Benefit'
import Process from 'components/pages/openapi-partner/Process'
import Cases from 'components/pages/openapi-partner/Cases'

import { useBtns } from 'hooks/product-btn'

import banner from './banner.png'

function Page() {
  const currentUrl = useUrl()
  const userInfo = useUserInfo()
  const handelClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // 未登录
    if (!userInfo || !userInfo.signedIn) {
      e.preventDefault()
      Modal.info({
        content: '未登录，请先登录再申请',
        okText: <a target="_blank" rel="noopener" href={urlForSignin(currentUrl)}>登录</a>
      })
    }
  }, [currentUrl, userInfo])

  const btns = useBtns(
    { children: '立即申请', href: 'https://jinshuju.net/f/SfA0D0', target: '', onClick: handelClick }
  )

  return (
    <>
      <PageBanner
        title="让我们成为合作伙伴"
        desc="加入我们成为合作伙伴，让我们一起为用户提供更加优质和便捷的服务"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Benefit />

      <Process />

      <Cases withTailPadding />
    </>
  )
}

export default function Partner() {
  return (
    <Layout
      title="合作申请_合作伙伴_服务商"
      keywords="合作申请, 合作伙伴, 服务商"
      description="加入我们成为合作伙伴，让我们一起为用户提供更加优质和便捷的服务"
    >
      <Page />
    </Layout>
  )
}
