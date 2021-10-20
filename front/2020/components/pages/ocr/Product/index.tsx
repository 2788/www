import React from 'react'
import { Row } from 'components/UI/Card'
import Link from 'components/Link'
import Section from 'components/Product/Section'

import style from './index.less'

const products = [
  [
    {
      title: '单张发票识别 OCR',
      link: 'https://developer.qiniu.com/dora/7764/invoice-to-identify',
      content: '检查图片中的发票信息，返回发票类型和对应对应的结构化内容。'
    },
    {
      title: '多张发票识别 OCR',
      link: 'https://developer.qiniu.com/dora/7769/more-than-the-invoice-identification-ocr',
      content: '检测图片中包含的一张以上的发票信息，并依次返回发票类型和发票内容。'
    },
    {
      title: '身份证识别 OCR',
      link: 'https://developer.qiniu.com/dora/api/6820/ocr-idcard',
      content: '检测身份证照片，识别并返回身份证照片中的文字信息。'
    }
  ],
  [
    {
      title: '车险保单 OCR',
      link: 'https://developer.qiniu.com/dora/api/7032/car-insurance-policy-ocr',
      content: '检测车险保单的照片，识别并返回车险保单中的文字信息。'
    },
    {
      title: '营业执照 OCR',
      link: 'https://developer.qiniu.com/dora/api/7033/business-license-of-ocr',
      content: '检测营业执照照片，识别并返回营业执照中的文字信息。'
    },
    {
      title: '新车发票 OCR',
      link: 'https://developer.qiniu.com/dora/api/7030/new-invoice-ocr',
      content: '检测新车发票的照片，识别并返回新车发票中的文字信息。'
    }
  ],
  [
    {
      title: '车辆登记 OCR',
      link: 'https://developer.qiniu.com/dora/api/7031/vehicle-registration-ocr',
      content: '检测车辆登记证的照片，识别并返回车辆登记中的文字信息。'
    }
  ]
]

export default function Product() {
  return (
    <Section title="产品功能" name="function">
      {
        products.map((product, index) => (
          <Row key={index}>
            {product.map((card, i) => (
              <MyCard {...card} key={`${index}-${i}`} />
            ))}
          </Row>
        ))
      }
    </Section>
  )
}

type MyCardProps = {
  link: string
  title: string
  content: string
}

function MyCard({ link, title, content }: MyCardProps) {
  return (
    <div className={style.card} >
      <h5 className={style.title}>{title}</h5>
      <p className={style.content}>{content}</p>
      <Link className={style.link} href={link} blue>接口文档 &gt;&gt;</Link>
    </div>
  )
}
