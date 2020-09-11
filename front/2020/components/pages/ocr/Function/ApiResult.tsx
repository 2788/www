/**
 * @file 内容审核“在此体验丰富功能”
 */

import React, { useState, ReactNode, Fragment } from 'react'
import { withLoading } from 'utils/loading'
import RadioGroup, { ButtonRadio as Radio } from 'components/UI/ButtonRadio'

import JSONViewer from 'components/pages/censor/Playground/JSONViewer'
import { OcrDemo } from 'apis/ocr/common'
import style from './index.less'

enum ApiInfoType {
  Result = 'result',
  Request = 'request',
  Response = 'response'
}

type ApiResultProps = {
  result: null | ReactNode
  request: object | null
  response: object | null
  error: any
  loading: boolean
}

export default function ApiResult({ result, request, response, error, loading }: ApiResultProps) {

  const [type, setType] = useState(ApiInfoType.Result)

  let resultView
  if (type === ApiInfoType.Result && result) {
    resultView = withLoading(loading)(<p className={style.demoResContent}>{result}</p>)
  }

  const requestView = type === ApiInfoType.Request && request && (
    <JSONViewer src={request} />
  )

  const reponseForDisplay = (
    error != null
      ? { error: error + '' } // 简单地展示下错误信息
      : (response || {})
  )

  const responseView = type === ApiInfoType.Response && withLoading(loading)(
    <JSONViewer src={reponseForDisplay} />
  )

  return (
    <div className={style.apiResult}>
      <RadioGroup className={style.radios} value={type} onChange={t => setType(t as ApiInfoType)}>
        <Radio value={ApiInfoType.Result}>识别结果</Radio>
        <Radio value={ApiInfoType.Request}>Request</Radio>
        <Radio value={ApiInfoType.Response}>Response</Radio>
      </RadioGroup>
      <div className={style.apiContent}>
        {resultView}
        {requestView}
        {responseView}
      </div>
    </div>
  )
}

export function getResultByName(name: OcrDemo, response: any) {
  switch (name) {
    case OcrDemo.IdCard:
      return <ResultByIdCard response={response} />
    case OcrDemo.CarBd:
      return <ResultByCarBd response={response} />
    case OcrDemo.Bs:
      return <ResultByBs response={response} />
    case OcrDemo.NewCar:
      return <ResultByNewCar response={response} />
    case OcrDemo.Cz:
      return <ResultByCz response={response} />
    default:
      return <ResultByIdCard response={response} />
  }
}

function ResultByIdCard({ response }: { response: any }) {
  if (response.errorcode) {
    return response.errormsg
  }
  const res = response.ocr_result
  if (res.side === 'F') {
    return (
      <>
        姓名：{res.name && res.name}<br />
        性别：{res.gender && res.gender}<br />
        民族：{res.nation && res.nation}<br />
        出生：{res.birthdate && res.birthdate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1年$2月$3日')}<br />
        住址：{res.address && res.address}<br />
        身份证号码：{res.idno && res.idno}
      </>
    )
  }
  return (
    <>
      有效期：{res.validthru && res.validthru.replace(/^(\d{4})(\d{2})(\d{2})-(\d{4})(\d{2})(\d{2})$/, '$1年$2月$3日至$4年$5月$6日')}<br />
      签发机关：{res.issuedby && res.issuedby}
    </>
  )
}

function ResultByCarBd({ response }: { response: any }) {
  if (response.errorcode) {
    let content = ''
    switch (response.errorcode) {
      case 1:
        content = '检测失败'
        break
      case 2:
        content = '无效图片'
        break
      case 3:
        content = '未知错误'
        break
      case 4:
        content = '系统正忙'
        break
      default:
        content = '未知错误'
        break
    }
    return (
      <>{content}</>
    )
  }
  const items = response.items
  return (
    <>
      {
        Object.keys(items).map((item: string) => {
          const type = typeof items[item]
          // null时置为空
          let val = ''
          if (items[item]) {
            if (type === 'object') {
              Object.keys(items[item]).forEach((key: string) => {
                val += '、' + items[item][key]
              })
              val = val.replace('、', '')
            } else {
              val = items[item]
            }
          }
          return <Fragment key={item}>{item}：{val} <br /></Fragment>
        })
      }
    </>
  )

}
const bsObj = {
  credit_code: '统一社会信用代码',
  name: '名称',
  type: '类型',
  address: '经营场所/住所',
  legal_representative: '法定代表人',
  found_date: '注册日期',
  operation_term: '营业期限',
  registered_capital: '注册资本',
  business_scope: '范围'
}

function ResultByBs({ response }: { response: any }) {
  if (response.errorcode) {
    let content = ''
    switch (response.errorcode) {
      case 10001:
        content = '请求解析失败'
        break
      case 10002:
        content = '鉴权失败'
        break
      case 10003:
        content = '图像解码错误'
        break
      case 10004:
        content = '请求超时'
        break
      case 10005:
        content = 'OCR 内部错误'
        break
      case 10006:
        content = '未知错误'
        break
      default:
        content = '未知错误'
        break
    }
    return (
      <>{content}</>
    )
  }
  const items = response.items
  return (
    <>
      {
        Object.keys(bsObj).map((prop: string) => {
          if (items[prop]) {
            const val = items[prop].value ? items[prop].value : ''
            return <Fragment key={prop}>{(bsObj as any)[prop]}：{val}<br /></Fragment>
          }
          return null
        })
      }
    </>
  )
}

function ResultByNewCar({ response }: { response: any }) {
  if (response.errorcode) {
    let content = ''
    switch (response.errorcode) {
      case 10002:
        content = '图片解码错误'
        break
      case 10003:
        content = '未知错误'
        break
      case 10004:
        content = '系统正忙'
        break
      case 10005:
        content = '参数错误'
        break
      default:
        content = '未知错误'
        break
    }
    return (
      <>{content}</>
    )
  }

  const items = response.items
  return (
    <>
      {
        Object.keys(items).map(
          (item: string) => <Fragment key={item}>{items[item].chinese_key}：{items[item].words}<br /></Fragment>
        )
      }
    </>
  )
}
function ResultByCz({ response }: { response: any }) {
  if (response.errorcode) {
    let content = ''
    switch (response.errorcode) {
      case 1:
        content = '检测失败'
        break
      case 2:
        content = '无效图片'
        break
      case 3:
        content = '未知错误'
        break
      case 4:
        content = '系统正忙'
        break
      default:
        content = '未知错误'
        break
    }
    return (
      <>{content}</>
    )
  }
  const items = response.items
  return (
    <>
      {
        Object.keys(items).map((item: string) => {
          const type = typeof items[item]
          // null时置为空
          let val = ''
          if (items[item]) {
            if (type === 'object') {
              Object.keys(items[item]).forEach((key: string) => {
                if (typeof items[item][key] === 'object') {
                  Object.keys(items[item][key]).forEach((k: string) => {
                    val += k + '（' + items[item][key][k] + '）'
                  })
                } else {
                  val += '、' + items[item][key]
                }
              })
              val = val.replace('、', '')
            } else {
              val = items[item]
            }
          }
          return <Fragment key={item}>{item}：{val} <br /></Fragment>
        })
      }
    </>
  )
}
