/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/**
 * @file 产品图标
 * @description 所有需要用到产品对应的图标的地方都用本组件，以保持一致
 */

import React, { SVGAttributes } from 'react'
import { Product } from 'constants/products'

export type Props = SVGAttributes<SVGElement> & {
  product: Product
  small?: boolean // 是否为 24px的，默认为 32px
}

const iconMap = {
  [Product.Kodo]: require('./images/default/kodo.svg').default,
  [Product.Archive]: require('./images/default/archive.svg').default,
  [Product.Hdfs]: require('./images/default/hdfs.svg').default,
  [Product.Cdn]: require('./images/default/cdn.svg').default,
  [Product.Ssl]: require('./images/default/ssl.svg').default,
  [Product.Pili]: require('./images/default/pili.svg').default,
  [Product.Qvm]: require('./images/default/qvm.svg').default,
  [Product.Ddos]: require('./images/default/ddos.svg').default,
  [Product.Sms]: require('./images/default/sms.svg').default,
  [Product.Dora]: require('./images/default/dora.svg').default,
  [Product.Censor]: require('./images/default/censor.svg').default,
  [Product.FaceID]: require('./images/default/faceid.svg').default,
  [Product.Rtn]: require('./images/default/rtn.svg').default,
  [Product.Plsv]: require('./images/default/plsv.svg').default,
  [Product.Plms]: require('./images/default/plms.svg').default,
  [Product.Insight]: require('./images/default/insight.svg').default,
  [Product.Express]: require('./images/default/express.svg').default,
  [Product.Qvs]: require('./images/default/qvs.svg').default,
  [Product.OpenAPI]: require('./images/default/openapi.svg').default,
  [Product.Ocr]: require('./images/default/ocr.svg').default,
  [Product.Pcdn]: require('./images/default/pcdn.svg').default,
  [Product.Plesdk]: require('./images/default/plesdk.svg').default,
  [Product.CloudSql]: require('./images/default/cloud-sql.svg').default,
  [Product.Geek]: require('./images/default/geek.svg').default,
  [Product.Vii]: require('./images/default/vii.svg').default,
  [Product.QnPlayer]: require('./images/default/qnplayer.svg').default
}

const smallIconMap = {
  [Product.Kodo]: require('./images/small/kodo.svg').default,
  [Product.Archive]: require('./images/small/archive.svg').default,
  [Product.Hdfs]: require('./images/small/hdfs.svg').default,
  [Product.Cdn]: require('./images/small/cdn.svg').default,
  [Product.Ssl]: require('./images/small/ssl.svg').default,
  [Product.Pili]: require('./images/small/pili.svg').default,
  [Product.Qvm]: require('./images/small/qvm.svg').default,
  [Product.Ddos]: require('./images/small/ddos.svg').default,
  [Product.Sms]: require('./images/small/sms.svg').default,
  [Product.Dora]: require('./images/small/dora.svg').default,
  [Product.Censor]: require('./images/small/censor.svg').default,
  [Product.FaceID]: require('./images/small/faceid.svg').default,
  [Product.Rtn]: require('./images/small/rtn.svg').default,
  [Product.Plsv]: require('./images/small/plsv.svg').default,
  [Product.Plms]: require('./images/small/plms.svg').default,
  [Product.Insight]: require('./images/small/insight.svg').default,
  [Product.Express]: require('./images/small/express.svg').default,
  [Product.Qvs]: require('./images/small/qvs.svg').default,
  [Product.OpenAPI]: require('./images/small/openapi.svg').default,
  [Product.Ocr]: require('./images/small/ocr.svg').default,
  [Product.Pcdn]: require('./images/small/pcdn.svg').default,
  [Product.Plesdk]: require('./images/small/plesdk.svg').default,
  [Product.CloudSql]: require('./images/small/cloud-sql.svg').default,
  [Product.Geek]: require('./images/small/geek.svg').default,
  [Product.Vii]: require('./images/small/vii.svg').default,
  [Product.QnPlayer]: require('./images/small/qnplayer.svg').default
}

export default function ProductIcon({ product, small, ...others }: Props) {
  const Icon = small ? smallIconMap[product] : iconMap[product]
  return Icon && <Icon {...others} />
}
