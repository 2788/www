export enum OcrDemo {
  singleInvoice = 'singleInvoice',
  multipleInvoice = 'multipleInvoice',
  IdCard = 'idCard',
  CarBd = 'carBd',
  Bs = 'bs',
  NewCar = 'newCar',
  Cz = 'cz'
}

export const pathMap = {
  [OcrDemo.singleInvoice]: '/invoice/single',
  [OcrDemo.multipleInvoice]: '/invoice/multiple',
  [OcrDemo.IdCard]: '/ocr/idcard',
  [OcrDemo.CarBd]: '/ocr/car_bd',
  [OcrDemo.Bs]: '/ocr/bs',
  [OcrDemo.NewCar]: '/ocr/new_car',
  [OcrDemo.Cz]: '/ocr/cz'
} as const

export const hostMap = {
  [OcrDemo.singleInvoice]: 'ap-gate-z0.qiniuapi.com',
  [OcrDemo.multipleInvoice]: 'ap-gate-z0.qiniuapi.com',
  [OcrDemo.IdCard]: 'ocr-idcard.qiniuapi.com',
  [OcrDemo.CarBd]: 'ocr-car-bd.qiniuapi.com',
  [OcrDemo.Bs]: 'ocr-bs.qiniuapi.com',
  [OcrDemo.NewCar]: 'ocr-new-car.qiniuapi.com',
  [OcrDemo.Cz]: 'ocr-cz.qiniuapi.com'
} as const

export function getRequestMesgByName(name: OcrDemo) {
  return {
    path: pathMap[name],
    host: hostMap[name]
  }
}
