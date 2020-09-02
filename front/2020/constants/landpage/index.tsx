export enum Landpage {
  Dora = 'dora',
  /** 视频云 SDK */
  Sdk = 'sdk'
}

export const urlMap = {
  [Landpage.Dora]: '/landpage/dora',
  [Landpage.Sdk]: '/landpage/sdk'
}
