/**
 * @file 内容审核“在此体验丰富功能”
 */

import React, { useState, ReactNode, Fragment } from 'react'
import { withLoading } from 'utils/loading'
import RadioGroup, { ButtonRadio as Radio } from 'components/UI/ButtonRadio'

import JSONViewer from 'components/pages/censor/Playground/JSONViewer'
import { OcrDemo } from 'apis/ocr/common'
import { InvoiceResponse } from 'apis/ocr/function'
import Button from 'components/UI/Button'
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
    case OcrDemo.singleInvoice:
    case OcrDemo.multipleInvoice:
      return <ResultByInvoice response={response} />
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
        姓名：{res.name}<br />
        性别：{res.gender}<br />
        民族：{res.nation}<br />
        出生：{res.birthdate && res.birthdate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1年$2月$3日')}<br />
        住址：{res.address}<br />
        身份证号码：{res.idno}
      </>
    )
  }
  return (
    <>
      有效期：{res.validthru && res.validthru.replace(/^(\d{4})(\d{2})(\d{2})-(\d{4})(\d{2})(\d{2})$/, '$1年$2月$3日至$4年$5月$6日')}<br />
      签发机关：{res.issuedby}
    </>
  )
}

function ResultByCarBd({ response }: { response: any }) {
  if (hasErrorcode(response)) {
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
  if (hasErrorcode(response)) {
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
        content = '出错了，请尝试其他图片'
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
  if (hasErrorcode(response)) {
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
        content = '出错了，请尝试其他图片'
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
  if (hasErrorcode(response)) {
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

const invoiceObj: Record<string, string> = {
  orientation: '发票顺时针旋转方向',
  code: '发票代码',
  number: '发票号码',
  date: '开票日期',
  pretax_amount: '税前金额',
  total: '总金额',
  tax: '税额',
  check_code: '校验码',
  seller: '销售方名称',
  seller_tax_id: '销售方纳税人识别号',
  buyer: '购买方名称',
  buyer_tax_id: '购买方纳税人识别号',
  company_seal: '是否有公司印章',
  form_type: '发票是第几联',
  form_name: '发票联次',
  kind: '发票消费类型',
  ciphertext: '密码区',
  transit_mark: '通行费标志',
  oil_mark: '成品油标志',
  machine_code: '机器编号/机打代码',
  travel_tax: '车船税',
  receiptor: '收款人',
  reviewer: '复核',
  issuer: '开票人',
  province: '省',
  city: '市',
  service_name: '服务类型',
  remark: '备注',
  item_names: '品名',
  agent_mark: '是否代开',
  acquisition_mark: '是否收购',
  block_chain: '区块链标记',
  code_confirm: '机打发票代码',
  number_confirm: '机打发票号码',
  time_geton: '上车时间',
  time_getoff: '下车时间',
  mileage: '里程',
  place: '发票所在地',
  license_plate: '车牌号',
  time: '时间',
  name: '姓名',
  station_geton: '上车车站/地点',
  station_getoff: '下车车站/地点',
  train_number: '车次',
  seat: '座位类型',
  serial_number: '序列号',
  user_id: '身份证号',
  category: '种类',
  entrance: '入口',
  exit: '出口',
  highway_flag: '高速标志',
  user_name: '姓名',
  agentcode: '销售单位代号',
  issue_by: '填开单位',
  fare: '票价',
  fuel_surcharge: '燃油附加费',
  caac_development_fund: '民航发展基金',
  insurance: '保险费',
  flights: '航班信息',
  from: '出发站',
  to: '到达站',
  flight_number: '航班号',
  carrier: '承运人',
  class_name: '舱位等级',
  international_flag: '国内国际标签',
  print_number: '印刷序号',
  registration_number: '登记证号',
  car_code: '车架号/车辆识别代码',
  car_model: '厂牌型号',
  machine_number: '机打号码',
  tax_authorities: '主管税务机关',
  tax_authorities_code: '主管税务机关代码',
  car_engine_code: '发动机号码',
  certificate_number: '合格证号',
  tax_rate: '税率',
  store_name: '店名',
  subtotal: '税前金额',
  discount: '折扣',
  tips: '小费',
  currency_code: '币种',
  type: '消费类型',
  date_start: '行程开始时间',
  date_end: '行程结束时间',
  phone: '行程人手机号',
  items: '行程信息',
  car_type: '车型',
  check_code_candidates: '校验码备选',
  check_code_last_six: '校验码后六位备选',
  number_order_error: '发票号码备选',
  qrcode: '二维码',
  barcode: '条码'
}

function ResultByInvoice({ response }: { response: InvoiceResponse }) {
  const [activeKey, setActiveKey] = useState(0)

  if (response.code) {
    return <>{response.message}</>
  }

  // 列举发票中的简单属性(Primitive)
  const list: Array<Record<string, string | number>> = response.response!.data.identify_results
    .map(item => Object.keys(item).reduce((prev, key) => {
      const value = item[key]
      if (typeof value !== 'object') {
        prev[key] = value
      } else if (!Array.isArray(value)) {
        Object.entries(value).forEach(([itemKey, itemValue]) => {
          if (typeof itemValue !== 'object') {
            prev[itemKey] = itemValue as any
          }
        })
      }
      return prev
    }, {} as Record<string, string | number>))

  return (
    <>
      {list.length > 1 && (
        <div className={style.invoiceSwitch}>
          {list.map((_, index) => (
            <Button
              key={index}
              type={activeKey === index ? 'primary' : 'default'}
              withBorder
              className={style.invoiceButton}
              onClick={() => setActiveKey(index)}
            >发票 {index + 1}</Button>))}
        </div>
      )}
      {list.map((detail, index) => {
        if (activeKey !== index) return null
        return (
          <>
            {Object.keys(detail)
              .filter(key => !!invoiceObj[key])
              .map(key => <Fragment key={key}>{invoiceObj[key]}：{detail[key]}<br /></Fragment>)}
          </>
        )
      })}
    </>
  )
}

function hasErrorcode(data: any): data is { errorcode: number } {
  return Boolean(data.errorcode) && typeof data.errorcode === 'number'
}
