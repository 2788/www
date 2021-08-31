type WX = {
  miniProgram: {
    navigateTo(options: { url: string }): void
    navigateBack(): void
    reLaunch(options: { url: string }): void
    getEnv(get: (res: { miniprogram: any }) => void): void
  }
  config: (options: {
    debug: boolean, appId: string, timestamp: number, nonceStr: string, signature: string, jsApiList: string[]
  }) => void
  ready: (cb: () => void) => void
  scanQRCode: (options: {
    needResult: 0 | 1
    scanType: Array<'qrCode' | 'barCode'>
    success: (res: { resultStr: string }) => void
    fail: (res: { errMsg: string }) => void
  }) => void
}

declare const wx: WX
