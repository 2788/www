/**
 * @file 视频审核
 */

import React, { useState, useMemo } from 'react'
import Loading from 'components/UI/Loading'
import { useOnChange } from 'hooks'
import { useApiWithParams } from 'hooks/api'
import { useUserInfo } from 'components/UserInfo'
import { videoCensor, defaultParams, CreateVideoJobOptions, VideoJobResult } from 'apis/censor/video'
import { defaultResponse, videos } from './default-resp/video'
import showModal from './Modal'
import Slides, { Slide } from './Slides'
import UrlForm from './UrlForm'
import { ResultPanel, ApiResult, ResultMask } from '.'

import style from './style.less'

function wrappedVideoCensor(options: CreateVideoJobOptions): Promise<VideoJobResult> {
  const uri = options.data.uri
  if (defaultResponse[uri]) {
    return new Promise(resolve => setTimeout(() => resolve(defaultResponse[uri]), 300))
  }
  return videoCensor(options)
}

export default function VideoPlayground() {
  const [activeIndex, setActive] = useState(0)
  const [videoUrl, setVideoUrl] = useState(videos[activeIndex])
  const userInfo = useUserInfo()

  useOnChange(() => setVideoUrl(videos[activeIndex]), [activeIndex])

  const apiRequestBody = useMemo(() => ({
    data: { uri: videoUrl },
    params: defaultParams
  }), [videoUrl])

  const { $: apiResult, error: apiError, loading } = useApiWithParams(
    wrappedVideoCensor,
    { params: [apiRequestBody] }
  )

  const results = useMemo(() => {
    if (!apiResult) return null
    return (['pulp', 'terror', 'politician', 'ads'] as const).map(
      scene => ({ scene, suggestion: apiResult.scenes[scene]?.suggestion })
    )
  }, [apiResult])

  function handleSubmit(url: string) {
    // 用户登录时，提示需要收费
    if (userInfo && userInfo.signedIn) {
      showModal().then(() => setVideoUrl(url))
    } else { // 未登录则直接调用接口
      setVideoUrl(url)
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
                <div className={style.videoBlock}>
                  <video autoPlay loop src={videoUrl} />
                  <ResultMask suggestion={apiResult?.suggestion} loading={loading} />
                </div>
                <ResultPanel results={results} loading={loading} />
              </div>
            </Loading>
          )}
        >
          <Slide value={0}><video src={videos[0]} /></Slide>
          <Slide value={1}><video src={videos[1]} /></Slide>
          <Slide value={2}><video src={videos[2]} /></Slide>
          <Slide value={3}><video src={videos[3]} /></Slide>
        </Slides>
        <UrlForm placeholder="请输入网络视频 URL" onSubmit={handleSubmit} />
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
    Method: 'POST /v3/video/censor HTTP/1.1',
    Host: 'ai.qiniuapi.com',
    'Content-Type': 'application/json',
    Authorization: 'Qiniu <AccessKey>:<Sign>',
    body
  }
}
