/**
 * @file 产品图标
 * @description 所有需要用到产品对应的图标的地方都用本组件，以保持一致
 */

import React, { SVGAttributes } from 'react'
import { Product } from 'constants/products'

import IconKodo from './images/kodo.svg'
import IconArchive from './images/archive.svg'
import IconHdfs from './images/hdfs.svg'
import IconCdn from './images/cdn.svg'
import IconSsl from './images/ssl.svg'
import IconPili from './images/pili.svg'
import IconQvm from './images/qvm.svg'
import IconSms from './images/sms.svg'
import IconDdos from './images/ddos.svg'
import IconDora from './images/dora.svg'
import IconCensor from './images/censor.svg'
import IconFaceID from './images/faceid.svg'
import IconRtn from './images/rtn.svg'
import IconPlsv from './images/plsv.svg'
import IconPlms from './images/plms.svg'
import IconInsight from './images/insight.svg'
import IconExpress from './images/express.svg'
import IconQvs from './images/qvs.svg'
import IconOpenApi from './images/openapi.svg'
import IconOcr from './images/ocr.svg'
import IconPcdn from './images/pcdn.svg'
import IconPlesdk from './images/plesdk.svg'
import IconCloudSql from './images/cloud-sql.svg'

export type Props = SVGAttributes<SVGElement> & {
  product: Product
}

export const iconMap = {
  [Product.Kodo]: IconKodo,
  [Product.Archive]: IconArchive,
  [Product.Hdfs]: IconHdfs,
  [Product.Cdn]: IconCdn,
  [Product.Ssl]: IconSsl,
  [Product.Pili]: IconPili,
  [Product.Qvm]: IconQvm,
  [Product.Ddos]: IconDdos,
  [Product.Sms]: IconSms,
  [Product.Dora]: IconDora,
  [Product.Censor]: IconCensor,
  [Product.FaceID]: IconFaceID,
  [Product.Rtn]: IconRtn,
  [Product.Plsv]: IconPlsv,
  [Product.Plms]: IconPlms,
  [Product.Insight]: IconInsight,
  [Product.Express]: IconExpress,
  [Product.Qvs]: IconQvs,
  [Product.OpenAPI]: IconOpenApi,
  [Product.Ocr]: IconOcr,
  [Product.Pcdn]: IconPcdn,
  [Product.Plesdk]: IconPlesdk,
  [Product.CloudSql]: IconCloudSql
}

export default function ProductIcon({ product, ...others }: Props) {
  const Icon = iconMap[product]
  return <Icon {...others} />
}
