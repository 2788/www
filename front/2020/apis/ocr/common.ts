export enum OcrDemo {
  IdCard = 'idCard',
  CarBd = 'carBd',
  Bs = 'bs',
  NewCar = 'newCar',
  Cz = 'cz'
}

export const methodMap = {
  [OcrDemo.IdCard]: '/ocr/idcard',
  [OcrDemo.CarBd]: '/ocr/car_bd',
  [OcrDemo.Bs]: '/ocr/bs',
  [OcrDemo.NewCar]: '/ocr/new_car',
  [OcrDemo.Cz]: '/ocr/cz'
} as const

export const hostMap = {
  [OcrDemo.IdCard]: 'ocr-idcard.qiniuapi.com',
  [OcrDemo.CarBd]: 'ocr-car-bd.qiniuapi.com',
  [OcrDemo.Bs]: 'ocr-bs.qiniuapi.com',
  [OcrDemo.NewCar]: 'ocr-new-car.qiniuapi.com',
  [OcrDemo.Cz]: 'ocr-cz.qiniuapi.com'
} as const

export function getRequestMesgByName(name: OcrDemo) {
  return {
    Method: methodMap[name],
    Host: hostMap[name]
  }
}

export function getResultByName(name: OcrDemo, respose: any) {
  switch (name) {
    case OcrDemo.IdCard:
      return getResultByIdCard(respose)
    case OcrDemo.CarBd:
      return getResultByCarBd(respose)
    case OcrDemo.Bs:
      return getResultByBs(respose)
    case OcrDemo.NewCar:
      return getResultByNewCar(respose)
    case OcrDemo.Cz:
      return getResultByCz(respose)
    default:
      return getResultByIdCard(respose)
  }
}

function getResultByIdCard(respose: any) {
  if (respose.errorcode) {
    return respose.errormsg
  }
  const res = respose.ocr_result
  if (res.side === 'F') {
    const text = `姓名： ${res.name}<br/>性别： ${res.gender}<br/>民族： ${res.nation}<br/>出生： ${res.birthdate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1年$2月$3日')}<br/>住址： ${res.address}<br/>身份证号码： ${res.idno}`
    return text
  }
  const text = `有效期： ${res.validthru.replace(/^(\d{4})(\d{2})(\d{2})-(\d{4})(\d{2})(\d{2})$/, '$1年$2月$3日至$4年$5月$6日')}<br/>签发机关： ${res.issuedby}`
  return text
}

function getResultByCarBd(respose: any) {
  if (respose.errorcode) {
    switch (respose.errorcode) {
      case 1:
        return '检测图中文本区域失败'
      case 2:
        return '输入的图片是无效图片(比如不是一张图片)'
      case 3:
        return '遇到了其他错误，无法正确返回结果'
      case 4:
        return '系统正忙，无法正确返回结果'
      default:
        return ''
    }
  }
  const items = respose.items
  let text = ''
  for (const item in items) {
    // eslint-disable-next-line no-prototype-builtins
    if (items.hasOwnProperty(item)) {
      const type = typeof (items[item])
      let val = items[item]
      // 实际上都是array(对应承保险种等)或者null
      if (type === 'object') {
        if (val) {
          val = ''
          for (const i of items[item]) {
            val += '、' + i
          }
          val = val.replace('、', '')
        } else {
          val = ''
        }
      }
      text += item + '：' + val + '<br/>'
    }
  }
  return text
}
const bsObj: any = {
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

function getResultByBs(respose: any) {
  if (respose.errorcode) {
    switch (respose.errorcode) {
      case 10001:
        return '请求解析失败'
      case 10002:
        return '鉴权失败'
      case 10003:
        return '图像解码错误'
      case 10004:
        return '请求超时'
      case 10005:
        return 'OCR 内部错误'
      case 10006:
        return '未知错误'
      default:
        return ''
    }
  }
  const items = respose.items
  let text = ''
  for (const prop in bsObj) {
    if (items[prop]) {
      const val = items[prop].value ? items[prop].value : ''
      text += bsObj[prop] + '：' + val + '<br/>'
    }
  }
  return text
}

function getResultByNewCar(respose: any) {
  if (respose.errorcode) {
    switch (respose.errorcode) {
      case 10002:
        return '对输入的图片解码错误'
      case 10003:
        return '遇到了其他错误，无法正确返回结果'
      case 10004:
        return '服务器正忙'
      case 10005:
        return '参数错误'
      default:
        return ''
    }
  }
  const items = respose.items
  let text = ''
  for (const item in items) {
    // eslint-disable-next-line no-prototype-builtins
    if (items.hasOwnProperty(item)) {
      text += items[item].chinese_key + '：' + items[item].words + '<br/>'
    }
  }
  return text
}
function getResultByCz(respose: any) {
  if (respose.errorcode) {
    switch (respose.errorcode) {
      case 1:
        return '检测图中文本区域失败'
      case 2:
        return '输入的图片是无效图片(比如不是一张图片)'
      case 3:
        return '遇到了其他错误，无法正确返回结果'
      case 4:
        return '系统正忙，无法正确返回结果'
      default:
        return ''
    }
  }
  const items = respose.items
  let text = ''
  for (const item in items) {
    // eslint-disable-next-line no-prototype-builtins
    if (items.hasOwnProperty(item)) {
      const type = typeof (items[item])
      let val = items[item]
      // 实际上都是array(对应承保险种等)或者null
      if (type === 'object') {
        if (val) {
          val = ''
          for (const i of items[item]) {
            val += '、' + i
          }
          val = val.replace('、', '')
        } else {
          val = ''
        }
      }
      text += item + '：' + val + '<br/>'
    }
  }
  return text
}
