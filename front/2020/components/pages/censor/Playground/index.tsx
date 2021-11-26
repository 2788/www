/**
 * @file 内容审核“在此体验丰富功能”
 */

import React, { useState } from 'react'
import { Scene, Suggestion } from 'apis/censor/common'
import { withLoading } from 'utils/loading'
import Tabs, { TabPane } from 'components/UI/Tabs'
import RadioGroup, { ButtonRadio as Radio } from 'components/UI/ButtonRadio'

import JSONViewer from './JSONViewer'
import ImagePlayground from './Image'
import VideoPlayground from './Video'
import AudioPlayground from './Audio'
import TextPlayground from './Text'
import style from './style.less'

enum Type {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  Text = 'text'
}

export default function CensorPlayground() {
  return (
    <Tabs className={style.tabs} defaultValue={Type.Image}>
      <TabPane value={Type.Image} tab="图片审核">
        <ImagePlayground />
      </TabPane>
      <TabPane value={Type.Video} tab="视频审核" autoDestroy>
        <VideoPlayground />
      </TabPane>
      <TabPane value={Type.Audio} tab="语音审核" autoDestroy>
        <AudioPlayground />
      </TabPane>
      <TabPane value={Type.Text} tab="文本审核" autoDestroy>
        <TextPlayground />
      </TabPane>
    </Tabs>
  )
}

const sceneTextMap = {
  ad: '广告识别',
  ads: '广告识别',
  pulp: '色情识别',
  porn: '色情识别',
  terror: '暴恐识别',
  politician: '政治敏感人物识别',
  politics: '涉政识别',
  logo: '水印 logo 识别',
  behavior: '不良场景识别',
  gender: '性别识别',
  timbre: '音色标签',
  abuse: '辱骂识别',
  sing: '唱歌识别',
  flood: '灌水识别',
  contraband: '违禁识别',
  meaningless: '无意义识别',
  anthen: '国歌识别',
  antispam: '垃圾识别'
}

const suggestionTextMap = {
  block: '违规',
  review: '疑似',
  pass: '正常'
} as Record<string, string>

type ResultItem = {
  scene: Scene
  suggestion?: Suggestion
  suggestionText?: string
}

type ResultPanelProps = {
  results: ResultItem[] | null
  loading: boolean
  panelStyle?: string
}

// 图片/视频右侧的结果块
export function ResultPanel({ results, loading, panelStyle }: ResultPanelProps) {
  const resultsView = (results || []).map(({ scene, suggestion, suggestionText }) => {
    if (suggestion == null && suggestionText == null) return null
    const isNegative = suggestion === 'block' || suggestion === 'review'
    const className = [style.resultItem, isNegative && style.nopass].filter(Boolean).join(' ')
    let humanizedSuggestion = null
    if (suggestion != null) {
      humanizedSuggestion = suggestionTextMap[suggestion]
    }
    humanizedSuggestion = humanizedSuggestion || suggestionText
    return (
      <div key={scene} className={className}>
        <p className={style.scene}>{sceneTextMap[scene]}</p>
        <p className={style.suggestion}>{humanizedSuggestion}</p>
      </div>
    )
  })
  const contentView = (
    loading
    ? <p className={style.loadingText}>检测中...</p>
    : resultsView
  )
  return (
    <div className={panelStyle ?? style.resultBlock}>
      {contentView}
    </div>
  )
}

type ResultMaskProps = {
  suggestion?: Suggestion
  loading: boolean
}

// 图片/视频之上的结果遮罩层
export function ResultMask({ suggestion, loading }: ResultMaskProps) {
  const className = [
    style.resultMask,
    loading && style.maskLoading,
    suggestion === 'block' && style.maskBlock,
    suggestion === 'review' && style.maskReview,
    suggestion === 'pass' && style.maskPass
  ].filter(Boolean).join(' ')
  return <div className={className}></div>
}

enum ApiInfoType {
  Request = 'request',
  Response = 'response'
}

type ApiResultProps = {
  request: object | object[] | null
  response: object | object[] | null
  error: any | any[]
  loading: boolean
}

export function ApiResult({ request, response, error, loading }: ApiResultProps) {

  const [type, setType] = useState(ApiInfoType.Request)

  const requestView = type === ApiInfoType.Request && request && (
    <JSONViewer src={request} />
  )

  error = Array.isArray(error) ? error : Array.of(error)
  let reponseForDisplay = error.map((err: any, idx: number) => {
    const resp = Array.isArray(response) ? response[idx] : response || {}
    return err != null
    ? { error: err + '' } // 简单地展示下错误信息
    : (resp || {})
  })

  if (reponseForDisplay.length === 1) {
    reponseForDisplay = reponseForDisplay[0]
  }

  const responseView = type === ApiInfoType.Response && withLoading(loading)(
    <JSONViewer src={reponseForDisplay} />
  )

  return (
    <div className={style.apiResult}>
      <RadioGroup className={style.radios} value={type} onChange={t => setType(t as ApiInfoType)}>
        <Radio value={ApiInfoType.Request}>Request</Radio>
        <Radio value={ApiInfoType.Response}>Response</Radio>
      </RadioGroup>
      {requestView}
      {responseView}
    </div>
  )
}
