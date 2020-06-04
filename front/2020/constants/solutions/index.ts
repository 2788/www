export enum Solution {
  // 智能视频云
  Qavs = 'qavs',
  // 短视频
  Plsv = 'plsv',
  // 私有云
  Kodoe = 'kodoe',
  // 视频冷存储
  Vcs = 'vcs',
  // 监控视频
  Ess = 'ess'
}

export enum Category {
  Scene = 'scene',
  Industry = 'industry',
}

export const categoryNameMap = {
  [Category.Scene]: '场景解决方案',
  [Category.Industry]: '行业解决方案'
}

// TODO 首页和底部等等替换成常量
export const nameMap = {
  [Solution.Qavs]: '智能视频云解决方案',
  [Solution.Plsv]: '短视频解决方案',
  [Solution.Kodoe]: '私有云存储解决方案',
  [Solution.Vcs]: '视频冷存储解决方案',
  [Solution.Ess]: '监控视频边缘存储解决方案'
}
