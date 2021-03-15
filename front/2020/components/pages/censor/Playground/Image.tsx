/**
 * @file 内容审核“在此体验丰富功能”图片审核
 */

import React, { useState, useMemo } from 'react'
import Loading from 'components/UI/Loading'
import { useOnChange } from 'hooks'
import { useApiWithParams } from 'hooks/api'
import { useUserInfo } from 'components/UserInfo'
import {
  imageCensor,
  defaultParams,
  ImageCensorOptions,
  ImageCensorRes,
  imageOpenCensor,
  ImageOpenCensorOptions,
  ImageOpenCensorRes
} from 'apis/censor/image'
import { defaultResponse, defaultOpenResponse } from './default-resp/image'
import showModal from './Modal'
import Slides, { Slide } from './Slides'
import UrlForm from './UrlForm'
import { ResultPanel, ApiResult, ResultMask } from '.'
import img1 from './images/playground-1.png'
import img2 from './images/playground-2.png'
import img3 from './images/playground-3.png'
import img4 from './images/playground-4.png'

import style from './style.less'

const images = [img1, img2, img3, img4]

function wrappedImageCensor(options: ImageCensorOptions): Promise<ImageCensorRes> {
  const uri = options.data.uri
  if (defaultResponse[uri]) {
    return new Promise(resolve => setTimeout(() => resolve(defaultResponse[uri]), 300))
  }
  return imageCensor(options)
}

function wrappedImageOpenCensor(options: ImageOpenCensorOptions): Promise<ImageOpenCensorRes> {
  const uri = options.data.img
  if (defaultOpenResponse[uri]) {
    return new Promise(resolve => setTimeout(() => resolve(defaultOpenResponse[uri]), 300))
  }
  return imageOpenCensor(options)
}

function getOpenApiSuggestion(apiResult: ImageOpenCensorRes | null) {
  return {
    PASS: 'pass',
    REJECT: 'block',
    REVIEW: 'review'
  }[apiResult?.riskLevel!]
}

function getSuggestion(apiResult: ImageCensorRes | null, openApiResult: ImageOpenCensorRes | null) {
  const openApiSuggestion = getOpenApiSuggestion(openApiResult)
  const riskLevelToWeight = {
    pass: 0,
    review: 1,
    block: 2
  } as Record<string, number>
  const weightToRiskLevel = {
    0: 'pass',
    1: 'review',
    2: 'block'
  } as Record<number, string>
  return weightToRiskLevel[Math.max(riskLevelToWeight[apiResult?.suggestion!], riskLevelToWeight[openApiSuggestion])]
}

export default function ImagePlayground() {
  const [activeIndex, setActive] = useState(0)
  const [imgUrl, setImgUrl] = useState(images[activeIndex])
  const userInfo = useUserInfo()

  useOnChange(() => setImgUrl(images[activeIndex]), [activeIndex])

  const apiRequestBody = useMemo(() => ({
    data: { uri: imgUrl },
    params: defaultParams
  }), [imgUrl])

  const openApiRequestBody = useMemo(() => ({
    type: 'BEHAVIOR',
    data: { img: imgUrl }
  }), [imgUrl])

  const { $: apiResult, error: apiError, loading } = useApiWithParams(
    wrappedImageCensor,
    { params: [apiRequestBody] }
  )

  const { $: openApiResult, error: openApiError, loading: openApiLoading } = useApiWithParams(
    wrappedImageOpenCensor,
    { params: [openApiRequestBody] }
  )

  const results = useMemo(() => {
    if (!apiResult) return null
    const apiScenes = (['pulp', 'terror', 'politician', 'ads'] as const).map(
      scene => ({ scene, suggestion: apiResult.scenes[scene]?.suggestion })
    )
    const openApiScenes = (['logo', 'behavior'] as const).map(
      scene => {
        const riskType = {
          logo: 320,
          behavior: 510
        }[scene]
        let suggestion = 'pass'
        if (openApiResult?.detail?.riskType === riskType) {
          suggestion = getOpenApiSuggestion(openApiResult)
        }
        return ({ scene, suggestion })
      }
    )
    return [...apiScenes, ...openApiScenes]
  }, [apiResult, openApiResult])

  function handleSubmit(url: string) {
    // 用户登录时，提示需要收费
    if (userInfo && userInfo.signedIn) {
      showModal().then(() => setImgUrl(url))
    } else { // 未登录则直接调用接口
      setImgUrl(url)
    }
  }

  return (
    <div className={style.playground}>
      <div className={style.left}>
        <Slides
          value={activeIndex}
          onChange={setActive}
          renderActive={() => (
            <Loading loading={loading}>
              <div className={style.activeBlock}>
                <div className={style.imgBlock}>
                  <img src={imgUrl} />
                  <ResultMask suggestion={getSuggestion(apiResult, openApiResult)} loading={loading} />
                </div>
                <ResultPanel results={results} loading={loading} />
              </div>
            </Loading>
          )}
        >
          <Slide value={0}><img src={images[0]} /></Slide>
          <Slide value={1}><img src={images[1]} /></Slide>
          <Slide value={2}><img src={images[2]} /></Slide>
          <Slide value={3}><img src={images[3]} /></Slide>
        </Slides>
        <UrlForm placeholder="请输入网络图片 URL" onSubmit={handleSubmit} />
      </div>
      <div className={style.right}>
        <ApiResult
          request={[
            makeRequestForDisplay(apiRequestBody),
            makeRequestForCensorOpenDisplay(openApiRequestBody)
          ]}
          response={[apiResult, openApiResult]}
          error={[apiError, openApiError]}
          loading={loading || openApiLoading}
        />
      </div>
    </div>
  )
}

function makeRequestForDisplay(body: any) {
  return {
    Method: 'POST /v3/image/censor HTTP/1.1',
    Host: 'ai.qiniuapi.com',
    'Content-Type': 'application/json',
    Authorization: 'Qiniu <AccessKey>:<Sign>',
    body
  }
}

function makeRequestForCensorOpenDisplay(body: any) {
  return {
    Method: 'POST /anti_fraud/v2/img HTTP/1.1',
    Host: 'censor-open.qiniuapi.com',
    'Content-Type': 'application/json',
    Authorization: 'Qiniu <AccessKey>:<Sign>',
    body
  }
}
