/**
 * @file 产品图标
 * @description 所有需要用到产品对应的图标的地方都用本组件，以保持一致
 */

import React, { SVGAttributes } from 'react'
import { Product } from 'constants/products'

import IconKodo from './kodo.svg'
import IconArchive from './archive.svg'
import IconHdfs from './hdfs.svg'
import IconCdn from './cdn.svg'
import IconSsl from './ssl.svg'
import IconPili from './pili.svg'
import IconQvm from './qvm.svg'
import IconSms from './sms.svg'
import IconDora from './dora.svg'
import IconCensor from './censor.svg'
import IconRtn from './rtn.svg'
import IconPlsv from './plsv.svg'
import IconPlms from './plms.svg'
import IconInsight from './insight.svg'
import IconExpress from './express.svg'

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
  [Product.Sms]: IconSms,
  [Product.Dora]: IconDora,
  [Product.Censor]: IconCensor,
  [Product.Rtn]: IconRtn,
  [Product.Plsv]: IconPlsv,
  [Product.Plms]: IconPlms,
  [Product.Insight]: IconInsight,
  [Product.Express]: IconExpress
}

export default function ProductIcon({ product, ...others }: Props) {
  const Icon = iconMap[product]
  return <Icon {...others} />
}
