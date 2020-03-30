// declare let pageData: object
interface Window {
  // TODO
  pageData: {
    code: string
  } | undefined
}

// process.env
declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'staging' | 'production' | 'test'
  }
}
