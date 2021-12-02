/**
 * @file 音频审核
 */

import React, { useCallback, useState, useMemo } from 'react'
import Loading from 'components/UI/Loading'
import Button from 'components/UI/Button'
import { useApiWithParams } from 'hooks/api'
import { useUserInfo } from 'components/UserInfo'
import { Scene, Options, TextData, Result } from 'apis/censor/censor-types'
import { textCensor, defaultTextParams } from 'apis/censor/text'
import showModal from './Modal'
import { ResultPanel, ApiResult, ResultItem } from '.'

import style from './style.less'

function wrappedTextCensor(options: Options<TextData>): Promise<Result | void> {
  if (!options.data || !options.data.text) {
    return Promise.resolve()
  }
  return textCensor(options)
}

export default function TextPlayground() {
  const [textContent, setTextContent] = useState('')
  const [text, setText] = useState('')
  const userInfo = useUserInfo()

  const apiRequestBody = useMemo<Options<TextData>>(() => ({
    data: { text: textContent },
    params: defaultTextParams
  }), [textContent])

  const { $: apiResult, error: apiError, loading } = useApiWithParams(
    wrappedTextCensor,
    { params: [apiRequestBody] }
  )

  const results = useMemo(() => {
    const result = apiResult
    return (
      ['antispam'] as Scene[]
    ).map<ResultItem>(scene => {
      if (!apiResult) {
        return ({ scene, suggestion: undefined })
      }
      let suggestion: ResultItem['suggestion'] = 'pass'
      if (result && result.scenes && result.scenes[scene]) {
        suggestion = result.scenes[scene]?.suggestion
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
            <ResultPanel panelStyle={style.audioTextResultBlock} results={results} loading={loading && !!apiResult} />
          </div>
        </Loading>
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

function makeRequestForDisplay(body: Options<TextData>) {
  if (!body.data || !body.data.text) {
    return {}
  }
  return {
    Method: 'POST /handler HTTP/1.1',
    Host: 'ai.qiniuapi.com',
    'Content-Type': 'application/json',
    Authorization: 'Qiniu <AccessKey>:<Sign>',
    body
  }
}
