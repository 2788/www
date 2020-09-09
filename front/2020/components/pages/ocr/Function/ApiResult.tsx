/**
 * @file 内容审核“在此体验丰富功能”
 */

import React, { useState } from 'react'
import { withLoading } from 'utils/loading'
import RadioGroup, { ButtonRadio as Radio } from 'components/UI/ButtonRadio'

import JSONViewer from './JSONViewer'
import style from './index.less'

enum ApiInfoType {
  Result = 'result',
  Request = 'request',
  Response = 'response'
}

type ApiResultProps = {
  result: null | string
  request: object | null
  response: object | null
  error: any
  loading: boolean
}

export default function ApiResult({ result, request, response, error, loading }: ApiResultProps) {

  const [type, setType] = useState(ApiInfoType.Request)

  let resultView
  if (type === ApiInfoType.Result && result) {
    // eslint-disable-next-line react/no-danger
    resultView = <p className={style.demoResContent} dangerouslySetInnerHTML={{ __html: result }}></p>
  }

  const requestView = type === ApiInfoType.Request && request && (
    <JSONViewer src={request} />
  )

  const reponseForDisplay = (
    error != null
      ? { error: error + '' } // 简单地展示下错误信息
      : (response || {})
  )

  const responseView = type === ApiInfoType.Response && withLoading(loading)(
    <JSONViewer src={reponseForDisplay} />
  )

  return (
    <div className={style.apiResult}>
      <RadioGroup className={style.radios} value={type} onChange={t => setType(t as ApiInfoType)}>
        <Radio value={ApiInfoType.Result}>识别结果</Radio>
        <Radio value={ApiInfoType.Request}>Request</Radio>
        <Radio value={ApiInfoType.Response}>Response</Radio>
      </RadioGroup>
      {resultView}
      {requestView}
      {responseView}
    </div>
  )
}
