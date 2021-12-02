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
  defaultImageParams
} from 'apis/censor/image'
import { Options, Scene, Result } from 'apis/censor/censor-types'
import { defaultResponse } from './default-resp/image'
import showModal from './Modal'
import Slides, { Slide } from './Slides'
import UrlForm from './UrlForm'
import { ResultPanel, ApiResult, ResultMask, ResultItem } from '.'
import img1 from './images/playground-1.png'
import img2 from './images/playground-2.png'
import img3 from './images/playground-3.png'
import img4 from './images/playground-4.png'

import style from './style.less'

const images = [img1, img2, img3, img4]

function wrappedImageCensor(options: Options): Promise<Result> {
  const uri = options.data.uri
  if (defaultResponse[uri]) {
    return new Promise(resolve => setTimeout(() => resolve(defaultResponse[uri]), 300))
  }
  return imageCensor(options)
}

export default function ImagePlayground() {
  const [activeIndex, setActive] = useState(0)
  const [imgUrl, setImgUrl] = useState(images[activeIndex])
  const userInfo = useUserInfo()

  useOnChange(() => setImgUrl(images[activeIndex]), [activeIndex])

  const apiRequestBody = useMemo<Options>(() => ({
    data: { uri: imgUrl },
    params: defaultImageParams
  }), [imgUrl])

  const { $: apiResult, error: apiError, loading } = useApiWithParams(
    wrappedImageCensor,
    { params: [apiRequestBody] }
  )

  const result = useMemo(() => {
    if (!apiResult) return null
    return (['pulp', 'terror', 'politician', 'ads', 'behavior'] as Scene[]).map<ResultItem>(
      scene => ({ scene, suggestion: apiResult.scenes[scene]?.suggestion })
    )
  }, [apiResult])

  const suggestion = apiResult ? apiResult.suggestion : undefined

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
                  <ResultMask suggestion={suggestion} loading={loading} />
                </div>
                <ResultPanel results={result} loading={loading} />
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
          request={makeRequestForDisplay(apiRequestBody)}
          response={apiResult}
          error={apiError}
          loading={loading}
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
