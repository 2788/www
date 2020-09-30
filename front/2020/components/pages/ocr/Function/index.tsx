import React, { useState, useMemo, useCallback } from 'react'
import { Upload, Modal } from 'react-icecream'
import { RcFile } from 'react-icecream/esm/upload'

import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'
import { ImageOptions, getApiByName, IdCardResponse, CarBdResponse, BsResponse, NewCarResponse, CzResponse } from 'apis/ocr/function'
import { OcrDemo, getRequestMesgByName } from 'apis/ocr/common'
import Button from 'components/UI/Button'
import { useOnChange } from 'hooks'
import { useApiWithParams } from 'hooks/api'
import { useUserInfo } from 'components/UserInfo'
import defaultResponse from './defaultResp'
import ErrorBoundary from './ErrorBoundary'
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
  const [reqBody, setReqBody] = useState<ImageOptions>({ image: removeImageBase64Prefix(imgUrl) })
  const userInfo = useUserInfo()

  useOnChange(() => {
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

  useOnChange(() => {
    if (imgUrl) {
      setReqBody({ image: removeImageBase64Prefix(imgUrl) })
    }
  }, [imgUrl])

  const wrappedOcr = useCallback(
    (options: ImageOptions): Promise<IdCardResponse | CarBdResponse | BsResponse | NewCarResponse | CzResponse> => {
      if (imgUrl === getImgByName(name)) return new Promise(resolve => resolve(defaultResponse(name)))
      return getApiByName(name)(options)
    },
    [imgUrl, name]
  )

  const { $: apiResult, error: apiError, loading } = useApiWithParams(
    wrappedOcr,
    { params: [reqBody] }
  )

  // 防止不必要的更新调用到getResultByName方法，所以这边使用useMemo来进行性能优化
  const results = useMemo(() => {
    if (!apiResult) return null
    return <ErrorBoundary>{getResultByName(name, apiResult)}</ErrorBoundary>
  }, [apiResult, name])

  function beforeUpload(file: RcFile): Promise<void> {
    return new Promise(resolve => {
      // 用户登陆时，提示需要收费
      if (userInfo && userInfo.signedIn) {
        Modal.confirm({
          title: '提示',
          content: (
            <>
              <p>体验票证识别产品将产生费用</p>
              <p>
                具体参考：
                <a target="_blank" rel="noopener" href="https://developer.qiniu.com/dora/api/7038/pricingofOCR">
                  「计费方式」
                </a>
              </p>
            </>),
          okText: '确定',
          cancelText: '取消',
          onOk: () => resolve(),
          className: style.modal
        })
      } else { // 未登陆则直接调用接口
        resolve()
      }
    }).then(() => {
      const isLt5M = file.size <= 5 * 1024 * 1024
      if (!isLt5M) {
        Modal.info({
          content: '上传的图片大小不能超过 5M',
          okText: '知道了'
        })
        throw new Error('图片大于或等于 5M')
      }
    })
  }

  return (
    <ScenePanel name={name} title={title} verticalCenter>
      <SceneBlock blockType="fixed" className={style.blockLeft}>
        <div className={style.imgBlock}>
          <div className={style.imgInner}>
            <div className={style.img} style={{ backgroundImage: `url(${imgUrl})` }}></div>
          </div>
        </div>
        {/** 使用customRequest来覆盖默认的上传行为，防止upload每次上传时出现刷新页面的行为 */}
        <Upload name="file" accept={imgFilter} beforeUpload={e => beforeUpload(e)} showUploadList={false} className={style.upload} onChange={info => setImgData(info.file.originFileObj)} customRequest={() => false}>
          <Button type="hollow" className={style.button} withBorder>上传图片</Button>
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
