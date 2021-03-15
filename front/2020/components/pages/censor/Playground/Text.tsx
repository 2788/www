/**
 * @file 音频审核
 */

import React, { useCallback, useState, useMemo } from 'react'
import Loading from 'components/UI/Loading'
import Button from 'components/UI/Button'
import { useApiWithParams } from 'hooks/api'
import { useUserInfo } from 'components/UserInfo'
import { textCensor, TextCensorOptions } from 'apis/censor/text'
import showModal from './Modal'
import { ResultPanel, ApiResult } from '.'

import style from './style.less'

function wrappedTextCensor(options: TextCensorOptions): Promise<any> {
  if (!options.data) {
    return Promise.resolve()
  }
  return textCensor(options)
}

export default function TextPlayground() {
  const [textContent, setTextContent] = useState('')
  const [text, setText] = useState('')
  const userInfo = useUserInfo()

  const apiRequestBody = useMemo(() => ({
    data: textContent
  }), [textContent])

  const { $: apiResult, error: apiError, loading } = useApiWithParams(
    wrappedTextCensor,
    { params: [apiRequestBody] }
  )

  const results = useMemo(() => {
    const result = apiResult?.results[0] || {}
    return (
      ['ad', 'politics', 'terror', 'abuse', 'porn', 'flood', 'contraband', 'meaningless'] as const
    ).map(scene => {
      if (!apiResult) {
        return ({ scene, suggestion: '' })
      }
      let suggestion = 'pass'
      if (result.details) {
        for (const detail of result.details) {
          if (detail.label === scene) {
            suggestion = result.suggestion
          }
        }
      }
      return ({ scene, suggestion })
    })
  }, [apiResult])

  const handleSubmit = useCallback((evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    evt.preventDefault()
    if (userInfo && userInfo.signedIn) {
      showModal().then(() => setTextContent(text))
    } else { // 未登录则直接调用接口
      setTextContent(text)
    }
  }, [userInfo, text])

  return (
    <div className={style.playground}>
      <div className={style.leftText}>
        <Loading loading={loading}>
          <div className={style.activeBlock}>
            <div className={style.textBlock}>
              <textarea
                autoFocus
                onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => setText(evt.target.value)}
                placeholder="请输入需要检测的文本内容" />
              <Button type="primary" disabled={loading || !text} onClick={handleSubmit} className={style.submitBtn}>检测</Button>
            </div>
            <ResultPanel panelStyle={style.audioTextResultBlock} results={results} loading={loading && apiResult} />
          </div>
        </Loading>
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

function makeRequestForDisplay(body: TextCensorOptions) {
  if (!body.data) {
    return {}
  }
  return {
    Method: 'POST /handler HTTP/1.1',
    Host: 'ali_textscan.apistore.qiniu.com',
    'Content-Type': 'application/json',
    Authorization: 'Qiniu <AccessKey>:<Sign>',
    body
  }
}
