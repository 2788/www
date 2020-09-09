import React, { useState, useEffect, useMemo } from 'react'
import { useApiWithParams } from 'hooks/api'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'
import { ImageOptions, getApiByName } from 'apis/ocr/function'
import { OcrDemo, getRequestMesgByName, getResultByName } from 'apis/ocr/common'
import { Upload, Button } from 'react-icecream'
import ApiResult from './ApiResult'

import style from './index.less'

export default function Function() {
  const panelArr = [
    { name: OcrDemo.IdCard, title: '身份证' },
    { name: OcrDemo.CarBd, title: '车险保单' },
    { name: OcrDemo.Bs, title: '营业执照' },
    { name: OcrDemo.NewCar, title: '新车发票' },
    { name: OcrDemo.Cz, title: '车辆登记证' }
  ]
  return (
    <Scene name="demo" title="功能体验" header="在此体验丰富功能" >
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
  const [imgUrl, setImgUrl] = useState<any>()
  const [reqBody, setReqBody] = useState<ImageOptions>({ image: '' })

  useEffect(() => {
    if (imgData) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setImgUrl(reader.result))
      reader.readAsDataURL(imgData)
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

  return (
    <ScenePanel name={name} title={title} verticalCenter>
      <SceneBlock blockType="fixed" className={style.blockLeft}>
        <div className={style.imgBlock}>
          <img src={imgUrl} />
        </div>
        <Upload name="file" accept="image/*" showUploadList={false} className={style.upload} onChange={info => setImgData(info.file.originFileObj)}>
          <Button className={style.button} >上传图片</Button>
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
  return url.replace(/^data:(image\/)?(png|jpg|jpeg)?;base64,/, '')
}

function makeRequestForDisplay(name: OcrDemo, body: any) {
  const req = getRequestMesgByName(name)
  return {
    Method: req.Method,
    Host: req.Host,
    'Content-Type': 'application/json',
    Authorization: 'Qiniu <AccessKey>:<Sign>',
    body
  }
}
