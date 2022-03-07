import React, { PropsWithChildren } from 'react'
import { observer } from 'mobx-react'
import Upload, { UploadProps } from 'react-icecream/lib/upload'
import moment from 'moment'
import autobind from 'autobind-decorator'

import * as qiniu from 'qiniu-js'
import { injectable } from 'qn-fe-core/di'
import { useLocalStore, injectProps } from 'qn-fe-core/local-store'
import Store from 'qn-fe-core/store'
import { ToasterStore } from 'admin-base/common/toaster'

import UploadApis from 'apis/upload'
import style from './style.m.less'

export interface IProps extends UploadProps {
  onUploaded?: (url: string, file: File) => void // 上传成功之后执行的方法
}

// 图片筛选
const imgFilter = '.png, .jpg, .jpeg, .gif'
// 公共前缀
const uploadKeyPrefix = 'www/admin/'

const publicUrl = 'https://static-file.qiniu.io/'
const bucket = 'admin-v2-static'

@injectable()
class LocalStore extends Store {

  constructor(
    @injectProps() private props: IProps,
    private uploadApis: UploadApis,
    toasterStore: ToasterStore
  ) {
    super()
    ToasterStore.bindTo(this, toasterStore)
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
  uploadFile(file: File) {
    const req = this.fetchToken()
      .then(token => this.doUpload(file, token), () => Promise.reject('token 获取失败！'))
      .then(val => this.props.onUploaded && this.props.onUploaded(val, file))
    return req
  }
}

export default observer(function CommonUpload(props: PropsWithChildren<IProps>) {
  const store = useLocalStore(LocalStore, props)
  const { children, ...rest } = props

  const handleFileChange = (file: File | undefined) => {
    if (file) {
      store.uploadFile(file)
    }
  }

  return (
    <Upload
      name="file"
      accept={imgFilter}
      onChange={info => handleFileChange(info.file.originFileObj)}
      showUploadList={false}
      customRequest={() => false}
      className={style.upload}
      {...rest}
    >
      {children}
    </Upload>
  )
})
