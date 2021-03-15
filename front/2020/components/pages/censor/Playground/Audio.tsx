/**
 * @file 音频审核
 */

import React, { useState, useMemo } from 'react'
import Loading from 'components/UI/Loading'
import { useApiWithParams } from 'hooks/api'
import { useUserInfo } from 'components/UserInfo'
import { audioCensor, CreateAudioJobOptions } from 'apis/censor/audio'
import showModal from './Modal'
import UrlForm from './UrlForm'
import { ResultPanel, ApiResult } from '.'

import Icon from './audio.svg'
import style from './style.less'

function wrappedAudioCensor(options: CreateAudioJobOptions): Promise<any> {
  if (!options.data.url) {
    return Promise.resolve()
  }
  return audioCensor(options)
}

export default function AudioPlayground() {
  const [audioUrl, setAudioUrl] = useState('')
  const userInfo = useUserInfo()

  const apiRequestBody = useMemo(() => ({
    type: 'POLITICAL_ANTHEN_PORN_AD_GENDER_TIMBRE_SING',
    data: { url: audioUrl }
  }), [audioUrl])

  const { $: apiResult, error: apiError, loading } = useApiWithParams(
    wrappedAudioCensor,
    { params: [apiRequestBody] }
  )

  const results = useMemo(() => (['politics', 'anthen', 'pulp', 'ads', 'gender', 'timbre', 'sing'] as const)
    .map(scene => {
      if (!apiResult) {
        return ({ scene, suggestion: '' })
      }
      switch (scene) {
        case 'politics':
        case 'anthen':
        case 'pulp':
        case 'ads': {
          const riskType = { politics: 100, anthen: 120, pulp: 200, ads: 300 }[scene]
          let suggestion = 'pass'
          if (apiResult?.detail) {
            for (const item of apiResult.detail) {
              if (item.riskType === riskType) {
                suggestion = ({
                  REJECT: 'block',
                  REVIEW: 'review'
                } as Record<string, string>)[item.riskLevel]
              }
            }
          }
          return ({ scene, suggestion })
        }
        case 'gender':
          return ({ scene, suggestionText: (apiResult?.gender?.label || '无') })
        case 'timbre': {
          let suggestionText = '无'
          if (apiResult?.tags) {
            suggestionText = apiResult?.tags[0].label
          }
          return ({ scene, suggestionText })
        }
        case 'sing': {
          let suggestionText = ''
          if (Number.isInteger(apiResult?.isSing)) {
            suggestionText = apiResult?.isSing ? '是' : '否'
          }
          return ({ scene, suggestionText })
        }
        default:
          return ({ scene })
      }
    }), [apiResult])

  function handleSubmit(url: string) {
    // 用户登录时，提示需要收费
    if (userInfo && userInfo.signedIn) {
      showModal().then(() => setAudioUrl(url))
    } else { // 未登录则直接调用接口
      setAudioUrl(url)
    }
  }

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
                    音频文件格式支持: wav、mp3、amr、m4a、wma、ape、ogg。<br />
                    大小限制 50 M，时长小于 10 分钟。
                  </p>
                  : <p className={style.filename}>
                    { audioUrl && audioUrl.substring(audioUrl.lastIndexOf('/') + 1).split('?')[0] }
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
          response={apiResult}
          error={apiError}
          loading={loading}
        />
      </div>
    </div>
  )
}

function makeRequestForDisplay(body: CreateAudioJobOptions) {
  if (!body.data.url) {
    return {}
  }
  return {
    Method: 'POST /anti_fraud/v2/audio HTTP/1.1',
    Host: 'censor-open.qiniuapi.com',
    'Content-Type': 'application/json',
    Authorization: 'Qiniu <AccessKey>:<Sign>',
    body
  }
}
