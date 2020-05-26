/**
 * @file 内容审核“在此体验丰富功能”
 */

import React, { useState } from 'react'
import { Scene, Suggestion } from 'apis/censor/common'
import Tabs, { TabPane } from 'components/UI/Tabs'
import RadioGroup, { ButtonRadio as Radio } from 'components/UI/ButtonRadio'

import JSONViewer from './JSONViewer'
import ImagePlayground from './Image'
import VideoPlayground from './Video'
import style from './style.less'

enum Type {
  Image = 'image',
  Video = 'video'
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
    </Tabs>
  )
}

const sceneTextMap = {
  ads: '广告',
  pulp: '色情',
  terror: '暴恐',
  politician: '政治敏感人物'
}

const suggestionTextMap = {
  block: '违规',
  review: '疑似',
  pass: '正常'
}

type ResultItem = {
  scene: Scene
  suggestion: Suggestion
}

type ResultPanelProps = {
  results: ResultItem[] | null
  loading: boolean
}

// 图片/视频右侧的结果块
export function ResultPanel({ results, loading }: ResultPanelProps) {
  const resultsView = (results || []).map(({ scene, suggestion }) => {
    if (suggestion == null) return null
    const isNegative = suggestion === 'block' || suggestion === 'review'
    const className = [style.resultItem, isNegative && style.nopass].filter(Boolean).join(' ')
    return (
      <div key={scene} className={className}>
        <p className={style.scene}>{sceneTextMap[scene]}识别</p>
        <p className={style.suggestion}>{suggestionTextMap[suggestion]}</p>
      </div>
    )
  })
  const contentView = loading ? '检测中' : resultsView
  return (
    <div className={style.resultBlock}>
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
  request: object | null
  response: object | null
}

export function ApiResult({ request, response }: ApiResultProps) {

  const [type, setType] = useState(ApiInfoType.Request)

  const requestView = type === ApiInfoType.Request && request && (
    <JSONViewer src={request} />
  )
  const responseView = type === ApiInfoType.Response && (
    <JSONViewer src={response || {}} />
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
