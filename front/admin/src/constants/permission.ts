// 命名：${target/group}_${action}
export enum PermissionCode {

  // 帐户中心查看、编辑权限
  ACCOUNT = 'ACCOUNT',

  // 解决方案
  SOLUTION = 'SOLUTION',

  // 官网全局公告查看、编辑权限
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GLOBAL_BANNER = 'GLOBAL_BANNER',

  // 官网产品相关的查看、编辑权限
  PRODUCT = 'PRODUCT',

  // 官网在线咨询查看、编辑的相关权限
  CONSULT = 'CONSULT',

  // 官网活动查看、编辑权限
  ACTIVITY = 'ACTIVITY',

  // 内容站查看、编辑权限
  PGC = 'PGC',

  // 发布上线、缓存刷新、刷新预取等
  DEPLOY = 'DEPLOY',

  // 图标管理
  ICON = 'ICON'
}
