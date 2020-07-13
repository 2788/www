/**
 * @file 视频审核
 */

import React, { useState, useMemo } from 'react'
import Loading from 'components/UI/Loading'
import { useOnChange } from 'hooks'
import { useApiWithParams } from 'hooks/api'
import { videoCensor, defaultParams } from 'apis/censor/video'
import Slides, { Slide } from './Slides'
import UrlForm from './UrlForm'
import { ResultPanel, ApiResult, ResultMask } from '.'

import style from './style.less'

const videos = [
  'https://dn-mars-assets.qbox.me/Fi1UC6waXtXYCpnTGHa8XxIziGNk',
  'https://dn-mars-assets.qbox.me/Fos2uiHzcuvF6HZF3RarMp9J1ewZ',
  'https://dn-mars-assets.qbox.me/FgV6wvTgRv8ZgUZBecKojdIlfs58',
  'https://dn-mars-assets.qbox.me/lrBYuiLwg0zFRUP97w59FmmN6H01'
]

export default function VideoPlayground() {
  const [activeIndex, setActive] = useState(0)
  const [videoUrl, setVideoUrl] = useState(videos[activeIndex])

  useOnChange(() => setVideoUrl(videos[activeIndex]), [activeIndex])

  const apiRequestBody = useMemo(() => ({
    data: { uri: videoUrl },
    params: defaultParams
  }), [videoUrl])

  const { $: apiResult, error: apiError, loading } = useApiWithParams(
    videoCensor,
    { params: [apiRequestBody] }
  )

  const results = useMemo(() => {
    if (!apiResult) return null
    return (['pulp', 'terror', 'politician', 'ads'] as const).map(
      scene => ({ scene, suggestion: apiResult.scenes[scene]?.suggestion })
    )
  }, [apiResult])

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
        <UrlForm placeholder="请输入网络视频 URL" onSubmit={setVideoUrl} />
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
