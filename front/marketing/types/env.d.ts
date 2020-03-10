// declare let pageData: object
interface Window {
  // TODO
  pageData: {
    activityCode: string
  }
}

// process.env
declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
  }
}
