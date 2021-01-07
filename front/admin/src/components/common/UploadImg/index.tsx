import React, { PropsWithChildren } from 'react'
import autobind from 'autobind-decorator'
import { observer } from 'mobx-react'
import * as qiniu from 'qiniu-js'
import { FieldState } from 'formstate-x'
import { Upload, Button, Modal } from 'react-icecream'
import { RcFile } from 'react-icecream/lib/upload'
import { injectable } from 'qn-fe-core/di'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'
import ToasterStore from 'admin-base/common/stores/toaster'
import moment from 'moment'
import UploadApis from 'apis/upload'
import ImgPreview from '../ImgPreview'
import * as style from './style.m.less'

interface IProps {
  state: State
  maxSize: number // 支持的图片大小，单位为 kb
  onUploaded?: (url: string, file: File) => void // 上传成功之后执行的方法
}
// 图片筛选
const imgFilter = '.png, .jpg, .jpeg, .gif'
// 公共前缀
const uploadKeyPrefix = 'www/admin/'

const publicUrl = 'https://static-file.qiniu.io/'
const bucket = 'admin-v2-static'

export type State = FieldState<string>

export function createState(value: string): State {
  return new FieldState(value)
}

export function getValue(state: State): string {
  return state.value
}

@injectable()
class UploadStore extends Store {

  constructor(
    @injectProps() private props: IProps,
    private uploadApis: UploadApis,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  fetchToken() {
    const putPolicy = {
      scope: bucket,
      deadline: moment().unix() + 3600
    }
    return this.uploadApis.genToken({ putPolicy: JSON.stringify(putPolicy) })
  }

  doUpload(file: File, token: string) {
    return new Promise<string>((resolve, reject) => {
      const obser = qiniu.upload(file, uploadKeyPrefix + moment().unix(), token)
      const subscription = obser.subscribe({
        error: err => {
          // TODO: file 上传状态管理?
          subscription.unsubscribe() // 这里不需要自动重试，直接提示错误即可
          if (err && err.code === 401) {
            return reject('token 已过期，请刷新页面后重试')
          }
          return reject(err)
        },
        complete: (data: { key: string }) => {
          resolve(publicUrl + data.key)
        }
      })
    })
  }

  @autobind
  @ToasterStore.handle('上传成功')
  UploadFile(file: File) {
    const req = this.fetchToken()
      .then(token => this.doUpload(file, token), () => Promise.reject('token 获取失败！'))
      .then(val => {
        this.props.state.onChange(val)
        return val
      })
    req.then(val => this.props.onUploaded && this.props.onUploaded(val, file))
    return req
  }
}

export default observer(function UploadImg(props: PropsWithChildren<IProps>) {
  const store = useLocalStore(UploadStore, props)
  const { state, maxSize, children } = props

  const childrenView = children || (
    <>
      <Button type="link">上传</Button>
      {state.value ? <ImgPreview url={state.value} className={style.icon} /> : null}
    </>
  )

  const handleChange = (file: File | undefined) => {
    if (file) {
      store.UploadFile(file)
    }
  }

  function beforeUpload(file: RcFile): boolean {
    const isOver = file.size > maxSize * 1024
    if (isOver) {
      Modal.info({
        content: `上传的图片大小不能超过 ${maxSize} KB`,
        okText: '知道了'
      })
    }
    return !isOver
  }

  return (
    <Upload name="file"
      accept={imgFilter}
      beforeUpload={beforeUpload}
      onChange={info => handleChange(info.file.originFileObj)}
      showUploadList={false}
      customRequest={() => false}
      className={style.upload}
    >
      {childrenView}
    </Upload>
  )
})
