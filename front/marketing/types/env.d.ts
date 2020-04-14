// import { IComponentInfo } from '../src/apis/component'

// declare let previewInitData: object
interface Window {
  // TODO: 对接口
  previewInitData: {
    code: string
    campaignList: any[] // IComponentInfo[] FIXME: 不敢直接 import 进来用，貌似会暴露到全局
  } | undefined
}

// process.env
declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
  }
}
