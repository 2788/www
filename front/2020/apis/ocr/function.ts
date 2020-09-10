/*
 * @Author: your name
 * @Date: 2020-09-10 10:52:43
 * @LastEditTime: 2020-09-10 19:04:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /2020/apis/ocr/function.ts
 */
/**
 * @file 票证自动识别ocr相关 API
 * @description 接口文档
 * 身份证识别OCR   https://developer.qiniu.com/dora/api/6820/ocr-idcard
 * 车险保单OCR    https://developer.qiniu.com/dora/api/7032/car-insurance-policy-ocr
 * 营业执照OCR    https://developer.qiniu.com/dora/api/7033/business-license-of-ocr
 * 新车发票OCR   https://developer.qiniu.com/dora/api/7030/new-invoice-ocr
 * 车辆登记OCR   https://developer.qiniu.com/dora/api/7031/vehicle-registration-ocr
 */

import { post } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'
import { OcrDemo, pathMap } from './common'

const idcardPrefix = `${basePrefix}/ocr_idcard`
const carbdPrefix = `${basePrefix}/ocr_carbd`
const bsPrefix = `${basePrefix}/ocr_bs`
const newcarPrefix = `${basePrefix}/ocr_newcar`
const czPrefix = `${basePrefix}/ocr_cz`

export type ImageOptions = {
  image: string
}

type IdCardResponse = {
  session_id?: string
  errorcode?: number
  errormsg?: string
  warnmsg?: string[]
  ocr_result: object
  image_result: object
}

export async function getMesgByIdCard(options: ImageOptions): Promise<IdCardResponse> {
  const response: IdCardResponse = await post(`${idcardPrefix}${pathMap[OcrDemo.IdCard]}`, options)
  return response
}

type CarBdResponse = {
  uuid?: string
  errorcode?: number
  items: object
}

export async function getMesgByCarBd(options: ImageOptions): Promise<CarBdResponse> {
  const response: CarBdResponse = await post(`${carbdPrefix}${pathMap[OcrDemo.CarBd]}`, options)
  return response
}

type BsResponse = {
  uuid?: string
  errorcode?: number
  items: object
}

export async function getMesgByBs(options: ImageOptions): Promise<BsResponse> {
  const response: BsResponse = await post(`${bsPrefix}${pathMap[OcrDemo.Bs]}`, options)
  return response
}

type NewCarResponse = {
  uuid?: string
  errorcode?: number
  items: object
}

export async function getMesgByNewCar(options: ImageOptions): Promise<NewCarResponse> {
  const response: NewCarResponse = await post(`${newcarPrefix}${pathMap[OcrDemo.NewCar]}`, options)
  return response
}

type CzResponse = {
  uuid?: string
  errorcode?: number
  items: object
}

export async function getMesgByCz(options: ImageOptions): Promise<CzResponse> {
  const response: CzResponse = await post(`${czPrefix}${pathMap[OcrDemo.Cz]}`, options)
  return response
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
    default:
      return getMesgByIdCard
  }
}

