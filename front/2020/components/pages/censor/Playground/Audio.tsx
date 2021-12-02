/**
 * @file 音频审核
 */

import React, { useState, useMemo } from 'react'
import Loading from 'components/UI/Loading'
import { useApiWithParams } from 'hooks/api'
import { useUserInfo } from 'components/UserInfo'
import { audioCensor, defaultAudioParams } from 'apis/censor/audio'
import { Options, Result, Scene } from 'apis/censor/censor-types'
import showModal from './Modal'
import UrlForm from './UrlForm'
import { ResultPanel, ApiResult, ResultItem } from '.'

import Icon from './audio.svg'
import style from './style.less'

function wrappedAudioCensor(options: Options): Promise<void | Result> {
  if (!options.data.uri) {
    return Promise.resolve()
  }
  return audioCensor(options)
}

export default function AudioPlayground() {
  const [audioUrl, setAudioUrl] = useState('')
  const userInfo = useUserInfo()

  const apiRequestBody = useMemo<Options>(() => ({
    params: defaultAudioParams,
    data: { uri: audioUrl }
  }), [audioUrl])

  const { $: apiResult, error: apiError, loading } = useApiWithParams(
    wrappedAudioCensor,
    { params: [apiRequestBody] }
  )

  const results = useMemo(() => (['antispam'] as Scene[])
    .map<ResultItem>(scene => {
      if (!apiResult) {
        return ({ scene, suggestion: undefined })
      }
      let suggestion: ResultItem['suggestion']
      if (apiResult.scenes && apiResult.scenes[scene]) {
        suggestion = apiResult.scenes[scene]?.suggestion
      }
      return { scene, suggestion }

    }), [apiResult])

  function handleSubmit(url: string) {
    // 用户登录时，提示需要收费
    if (userInfo && userInfo.signedIn) {
      showModal().then(() => setAudioUrl(url))
    } else { // 未登录则直接调用接口
      setAudioUrl(url)
    }
  }

  const filename = React.useMemo<string>(
    () => {
      const name = audioUrl ? audioUrl.substring(audioUrl.lastIndexOf('/') + 1).split('?')[0] : ''
      return decodeURIComponent(name)
    },
    [audioUrl]
  )

  return (
    <div className={style.playground}>
      <div className={style.leftAudio}>
        <div className={style.activeBlock}>
          <div className={style.audioBlock}>
            <div className={style.infoBlock}>
              <Loading loading={loading}>
                <Icon />
                {
                  !audioUrl
                  ? <p className={style.tip}>
                    音频文件格式支持 MP3、WAV、AAC、WMA、OGG、M4A、AMR、AUDIO、M3U8。<br />
                    大小限制 200M。
                  </p>
                  : <p className={style.filename}>
                    {filename}
                  </p>
                }
              </Loading>
            </div>
            <UrlForm isAudio placeholder="请输入网络音频 URL" onSubmit={handleSubmit} />
          </div>
          <ResultPanel panelStyle={style.audioTextResultBlock} results={results} loading={loading} />
        </div>
      </div>
      <div className={style.right}>
        <ApiResult
          request={makeRequestForDisplay(apiRequestBody)}
          response={apiResult || {}}
          error={apiError}
          loading={loading}
        />
      </div>
    </div>
  )
}

function makeRequestForDisplay(body: Options) {
  if (!body.data.uri) {
    return {}
  }
  return {
    Method: 'POST /v3/audio/censor HTTP/1.1',
    Host: 'ai.qiniuapi.com',
    'Content-Type': 'application/json',
    Authorization: 'Qiniu <AccessKey>:<Sign>',
    body
  }
}
