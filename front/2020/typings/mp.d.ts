type WX = {
  miniProgram: {
    navigateTo(options: { url: string }): void
    navigateBack(): void
    reLaunch(options: { url: string }): void
    getEnv(get: (res: { miniprogram: any }) => void): void
  }
}

declare const wx: WX
