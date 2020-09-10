import React, { useState, useEffect, useMemo } from 'react'
import { useApiWithParams } from 'hooks/api'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'
import { ImageOptions, getApiByName } from 'apis/ocr/function'
import { OcrDemo, getRequestMesgByName } from 'apis/ocr/common'
import { Upload, Modal } from 'react-icecream'
import Button from 'components/UI/Button'
import { RcFile } from 'react-icecream/esm/upload'
import ApiResult, { getResultByName } from './ApiResult'

import style from './index.less'
import idCard from './images/idCard.base64.jpg'
import carBd from './images/carBd.base64.jpg'
import bs from './images/bs.base64.jpg'
import cz from './images/cz.base64.jpg'
import newCar from './images/newCar.base64.jpg'

// 图片筛选
const imgFilter = '.png, .jpg, .jpeg'
const imgRegex = /^data:(image\/)?(png|jpg|jpeg)?;base64,/

export default function Function() {
  const panelArr = [
    { name: OcrDemo.IdCard, title: '身份证' },
    { name: OcrDemo.CarBd, title: '车险保单' },
    { name: OcrDemo.Bs, title: '营业执照' },
    { name: OcrDemo.NewCar, title: '新车发票' },
    { name: OcrDemo.Cz, title: '车辆登记证' }
  ]
  return (
    <Scene name="demo" title="Demo 体验">
      {panelArr.map(panel => (
        <MyPanel {...panel} key={panel.name} />
      ))}
    </Scene>
  )
}
type PanelProps = {
  name: OcrDemo
  title: string
}
function MyPanel({ name, title }: PanelProps) {
  const [imgData, setImgData] = useState<Blob | undefined>(undefined)
  const [imgUrl, setImgUrl] = useState(getImgByName(name))
  const [reqBody, setReqBody] = useState<ImageOptions>({ image: getImgByName(name) })

  useEffect(() => {
    if (imgData) {
      const reader = new FileReader()
      const setImg = function() {
        if (typeof reader.result === 'string') {
          setImgUrl(reader.result)
        }
      }
      reader.addEventListener('load', setImg)
      reader.readAsDataURL(imgData)
      return () => reader.removeEventListener('load', setImg)
    }
  }, [imgData])
  useEffect(() => {
    if (imgUrl) {
      setReqBody({ image: removeImageBase64Prefix(imgUrl) })
    }
  }, [imgUrl])
  const { $: apiResult, error: apiError, loading } = useApiWithParams(
    getApiByName(name),
    { params: [reqBody] }
  )

  const results = useMemo(() => {
    if (!apiResult) return null
    return getResultByName(name, apiResult)
  }, [apiResult, name])

  function beforeUpload(file: RcFile) {
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      Modal.info({
        content: (
          <>
            上传的图片大小不能超过 5M
          </>
        ),
        okText: '知道了'
      })
    }
    return isLt5M
  }

  return (
    <ScenePanel name={name} title={title} verticalCenter>
      <SceneBlock blockType="fixed" className={style.blockLeft}>
        <div className={style.imgBlock}>
          <div className={style.imgInner}>
            <div className={style.img} style={{ backgroundImage: `url(${imgUrl})` }}></div>
          </div>
        </div>
        <Upload name="file" accept={imgFilter} beforeUpload={e => beforeUpload(e)} showUploadList={false} className={style.upload} onChange={info => setImgData(info.file.originFileObj)}>
          <Button type="hollow" className={style.button} withBorder >上传图片</Button>
        </Upload>
      </SceneBlock>
      <SceneBlock shadow className={style.blockRight}>
        <ApiResult
          result={results}
          request={makeRequestForDisplay(name, reqBody)}
          response={apiResult}
          error={apiError}
          loading={loading}
        />
      </SceneBlock>
    </ScenePanel>
  )
}

function removeImageBase64Prefix(url: string) {
  return url.replace(imgRegex, '')
}

function makeRequestForDisplay(name: OcrDemo, body: any) {
  const req = getRequestMesgByName(name)
  return {
    Method: 'POST ' + req.path + ' HTTP/1.1',
    Host: req.host,
    'Content-Type': 'application/json',
    Authorization: 'Qiniu <AccessKey>:<Sign>',
    body
  }
}
function getImgByName(name: OcrDemo) {
  switch (name) {
    case OcrDemo.IdCard:
      return idCard
    case OcrDemo.CarBd:
      return carBd
    case OcrDemo.Bs:
      return bs
    case OcrDemo.NewCar:
      return newCar
    case OcrDemo.Cz:
      return cz
    default:
      return idCard
  }
}
