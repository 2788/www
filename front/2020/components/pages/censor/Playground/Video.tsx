/**
 * @file 视频审核
 */

import React, { useState, useMemo, FormEvent } from 'react'
import Loading from 'components/UI/Loading'
import { useOnChange } from 'hooks'
import { useApiWithParams } from 'hooks/api'
import { videoCensor, defaultParams } from 'apis/censor/video'
import Button from 'components/UI/Button'
import Slides, { Slide } from './Slides'
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
  const [input, setInput] = useState('')
  const [videoUrl, setVideoUrl] = useState(videos[activeIndex])

  function handleInputSubmit(e: FormEvent) {
    e.preventDefault()
    setVideoUrl(input)
  }

  useOnChange(() => setVideoUrl(videos[activeIndex]), [activeIndex])

  const apiRequestBody = useMemo(() => ({
    data: { uri: videoUrl },
    params: defaultParams
  }), [videoUrl])

  const { $: apiResult, loading } = useApiWithParams(
    videoCensor,
    { params: [apiRequestBody] }
  )

  const results = useMemo(() => {
    if (!apiResult) return null
    return (['pulp', 'terror', 'politician', 'ads'] as const).map(
      scene => ({ scene, suggestion: apiResult.scenes[scene]?.suggestion })
    )
  }, [apiResult])

  const requestForDisplay = makeRequestForDisplay(apiRequestBody)
  const responseForDisplay = apiResult

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
        <form className={style.inputLine} onSubmit={handleInputSubmit}>
          <input
            type="text"
            className={style.input}
            placeholder="请输入网络视频URL"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <Button type="primary" className={style.submitBtn}>检测</Button>
        </form>
      </div>
      <div className={style.right}>
        <ApiResult
          request={requestForDisplay}
          response={responseForDisplay}
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