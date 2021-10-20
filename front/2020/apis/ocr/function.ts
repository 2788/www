/**
 * @file 票证自动识别ocr相关 API
 * @description 接口文档
 * 身份证识别OCR   https://developer.qiniu.com/dora/api/6820/ocr-idcard
 * 车险保单OCR    https://developer.qiniu.com/dora/api/7032/car-insurance-policy-ocr
 * 营业执照OCR    https://developer.qiniu.com/dora/api/7033/business-license-of-ocr
 * 新车发票OCR   https://developer.qiniu.com/dora/api/7030/new-invoice-ocr
 * 车辆登记OCR   https://developer.qiniu.com/dora/api/7031/vehicle-registration-ocr
 * 单张发票OCR    https://developer.qiniu.com/dora/7764/invoice-to-identify
 * 多张发票OCR    https://developer.qiniu.com/dora/7769/more-than-the-invoice-identification-ocr
 */

import { post, ApiException, postBlob } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'
import { OcrDemo, pathMap } from './common'

const singleInvoicePrefix = `${basePrefix}/ocr_single_invoice`
const multipleInvoicePrefix = `${basePrefix}/ocr_multiple_invoice`
const idcardPrefix = `${basePrefix}/ocr_idcard`
const carbdPrefix = `${basePrefix}/ocr_carbd`
const bsPrefix = `${basePrefix}/ocr_bs`
const newcarPrefix = `${basePrefix}/ocr_newcar`
const czPrefix = `${basePrefix}/ocr_cz`

export type ImageOptions = {
  image: string
  blob: Blob | undefined
}

export type IdCardResponse = {
  session_id?: string
  errorcode?: number
  errormsg?: string
  warnmsg?: number[]
  ocr_result: object
  image_result: object
}

export async function getMesgByIdCard(options: ImageOptions): Promise<IdCardResponse> {
  const response: IdCardResponse = await post(`${idcardPrefix}${pathMap[OcrDemo.IdCard]}`, options).catch(resCatch)
  return response
}

export type CarBdResponse = {
  uuid?: string
  errorcode?: number
  items: object
}

export async function getMesgByCarBd(options: ImageOptions): Promise<CarBdResponse> {
  const response: CarBdResponse = await post(`${carbdPrefix}${pathMap[OcrDemo.CarBd]}`, options).catch(resCatch)
  return response
}

export type BsResponse = {
  uuid?: string
  errorcode?: number
  items: object
}

export async function getMesgByBs(options: ImageOptions): Promise<BsResponse> {
  const response: BsResponse = await post(`${bsPrefix}${pathMap[OcrDemo.Bs]}`, options).catch(resCatch)
  return response
}

export type NewCarResponse = {
  uuid?: string
  errorcode?: number
  items: object
}

export async function getMesgByNewCar(options: ImageOptions): Promise<NewCarResponse> {
  const response: NewCarResponse = await post(`${newcarPrefix}${pathMap[OcrDemo.NewCar]}`, options).catch(resCatch)
  return response
}

export type CzResponse = {
  uuid?: string
  errorcode?: number
  items: object
}

export async function getMesgByCz(options: ImageOptions): Promise<CzResponse> {
  const response: CzResponse = await post(`${czPrefix}${pathMap[OcrDemo.Cz]}`, options).catch(resCatch)
  return response
}

export type InvoiceResponse = {
  result: number
  code?: number
  message?: string
  response?: {
    data: {
      identify_results: Array<Record<string, any>>
    }
  }
}

export async function getMesgBysingleInvoice(options: ImageOptions): Promise<InvoiceResponse> {
  const response: InvoiceResponse = await postBlob(`${singleInvoicePrefix}${pathMap[OcrDemo.singleInvoice]}`, options.blob!).catch(resCatch)
  return response
}

export async function getMesgBymultipleInvoice(options: ImageOptions): Promise<InvoiceResponse> {
  const response: InvoiceResponse = await postBlob(`${multipleInvoicePrefix}${pathMap[OcrDemo.multipleInvoice]}`, options.blob!).catch(resCatch)
  return response
}

function resCatch(e: any) {
  if (!(e instanceof ApiException)) {
    throw e
  }
  return e.data
}

export function getApiByName(name: OcrDemo) {
  switch (name) {
    case OcrDemo.IdCard:
      return getMesgByIdCard
    case OcrDemo.CarBd:
      return getMesgByCarBd
    case OcrDemo.Bs:
      return getMesgByBs
    case OcrDemo.NewCar:
      return getMesgByNewCar
    case OcrDemo.Cz:
      return getMesgByCz
    case OcrDemo.singleInvoice:
      return getMesgBysingleInvoice
    case OcrDemo.multipleInvoice:
      return getMesgBymultipleInvoice
    default:
      return getMesgByIdCard
  }
}

