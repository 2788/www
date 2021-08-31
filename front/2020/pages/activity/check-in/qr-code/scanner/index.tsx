/**
 * @file          component  Scanner
 * @description   扫码(专指签到二维码)页面
 * @author        renpanpan
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import cls from 'classnames'
import Layout from 'components/Layout'
import Button from 'components/UI/Button'
import { useUrl, useQueryValue } from 'hooks/url'
import { useApiWithParams } from 'hooks/api'
import { useWx } from 'hooks/ua'
import { getConfig, IWechatConfig } from 'apis/wx'
import { getRegistrationInfo } from 'apis/admin/activity'
import { checkIn, getIsScannerIdValid } from 'apis/admin/activity/check-in'

import * as style from './style.less'

export function PageContent() {
  const [id] = useQueryValue('id', '')
  const isWx = useWx()
  const { $: isIdValid, loading: isIdValidLoading } = useApiWithParams(
    getIsScannerIdValid,
    { params: [id], delay: 100 }
  )
  const btnVisible = isWx && !isIdValidLoading && isIdValid
  const [scanQrCodeResult, setScanQrCodeResult] = useState<string | null>(null)
  const tips = useMemo(() => {
    if (!isWx) return '请在微信中查看！'
    if (isIdValidLoading) return '加载中'
    if (!isIdValid) return '链接已失效'
    return scanQrCodeResult
  }, [scanQrCodeResult, isIdValid, isIdValidLoading, isWx])

  const wrappedGetConfig = useCallback((url: string): Promise<IWechatConfig | null> => {
    if (!isWx) return new Promise(resolve => resolve(null))
    return getConfig(url)
  }, [isWx])

  const { $: config } = useApiWithParams(
    wrappedGetConfig,
    { params: [useUrl()], delay: 100 }
  )
  useEffect(() => {
    if (config === null) return
    wx.config({
      debug: process.env.NODE_ENV !== 'production', // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: config.app_id, // 必填，公众号的唯一标识
      timestamp: config.timestamp, // 必填，生成签名的时间戳
      nonceStr: config.nonce_str, // 必填，生成签名的随机串
      signature: config.signature, // 必填，签名
      jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
    })
  }, [config])
  const handleClick = useCallback(() => {
    wx.ready(() => {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
        scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
        async success(res) {
          const registrationId = res.resultStr
          try {
            const info = await getRegistrationInfo(registrationId)
            if (info.checkedIn) return setScanQrCodeResult('已签到，勿重复操作！')
            try {
              await checkIn(registrationId)
              setScanQrCodeResult(`${info.userName}签到成功`)
            } catch (_) {
              setScanQrCodeResult('签到失败！')
            }
          } catch (error) {
            if (error && error.code === 404) {
              return setScanQrCodeResult('签到失败，用户未报名！')
            }
            return setScanQrCodeResult('签到失败！')
          }
        },
        fail: res => {
          setScanQrCodeResult(res.errMsg)
        }
      })
    })
  }, [])

  return (
    <div className={style.wrapper}>
      <div className={cls(style.tips, tips === null && style.hidden)}>
        {tips}
      </div>
      {btnVisible && <Button type="primary" onClick={handleClick}>扫码签到</Button>}
    </div>
  )
}

export default function Scanner() {
  return (
    <Layout title="扫码签到" keywords="" description="" simple>
      <PageContent />
    </Layout>
  )
}
