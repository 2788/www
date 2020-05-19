/**
 * @file 内容审核“在此体验丰富功能”图片审核
 */

import React, { useState, useMemo, FormEvent } from 'react'
import { useApiWithParams } from 'hooks/api'
import { useOnChange } from 'hooks'
import Button from 'components/UI/Button'
import { imageCensor, defaultParams } from 'apis/censor/image'
import Slides, { Slide } from './Slides'
import { ResultPanel, ApiResult, ResultMask } from '.'

import style from './style.less'

const images = [
  // TODO: 图片地址换下
  'https://www.qiniu.com/assets/censor/image-xinggan-91b2d170414acee47526bbda4f36d885c3d8fac0b037dfdd64ad62ae1f136751.jpg',
  'https://www.qiniu.com/assets/censor/image-baokong-1-67aa2a533fdc9f24a583c75c10eef88df1e7d6edfb6fdbea6d2d37104423f7e9.jpg',
  'https://www.qiniu.com/assets/censor/image-baokong-2-9c578f7dc68155d3a2526d7e9114942682f7e25ccf10fc7d69a37961c003046d.jpg',
  'https://www.qiniu.com/assets/censor/image-zhengzhi-3af9a70b9d70e450ae276d23c1aaf37712ee28dd8d0031e586ce5eefff7c9140.jpg'
]

export default function ImagePlayground() {
  const [activeIndex, setActive] = useState(0)
  const [input, setInput] = useState('')
  const [imgUrl, setImgUrl] = useState(images[activeIndex])

  function handleInputSubmit(e: FormEvent) {
    e.preventDefault()
    setImgUrl(input)
  }

  useOnChange(() => setImgUrl(images[activeIndex]), [activeIndex])

  const apiRequestBody = useMemo(() => ({
    data: { uri: imgUrl },
    params: defaultParams
  }), [imgUrl])

  const { $: apiResult, loading } = useApiWithParams(
    imageCensor,
    { params: [apiRequestBody] }
  )

  const results = useMemo(() => {
    if (!apiResult) return null
    return (['pulp', 'terror', 'politician', 'ads'] as const).map(
      scene => ({ scene, suggestion: apiResult.scenes[scene].suggestion })
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
            <div className={style.activeBlock}>
              <div className={style.imgBlock}>
                <img src={imgUrl} />
                <ResultMask suggestion={apiResult?.suggestion} loading={loading} />
              </div>
              <ResultPanel results={results} loading={loading} />
            </div>
          )}
        >
          <Slide value={0}><img src={images[0]} /></Slide>
          <Slide value={1}><img src={images[1]} /></Slide>
          <Slide value={2}><img src={images[2]} /></Slide>
          <Slide value={3}><img src={images[3]} /></Slide>
        </Slides>
        <form className={style.inputLine} onSubmit={handleInputSubmit}>
          <input
            type="text"
            className={style.input}
            placeholder="请输入网络图片URL"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <Button type="primary" className={style.submitBtn}>检测</Button>
        </form>
      </div>
      <div className={style.right}>
        <ApiResult request={requestForDisplay} response={responseForDisplay} />
      </div>
    </div>
  )
}

function makeRequestForDisplay(body: any) {
  return {
    Method: 'POST /v3/image/censor HTTP/1.1',
    Host: 'ai.qiniuapi.com',
    'Content-Type': 'application/json',
    Authorization: 'Qiniu <AccessKey>:<Sign>',
    body
  }
}
