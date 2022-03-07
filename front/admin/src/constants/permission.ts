// 命名：${target/group}_${action}
export enum PermissionCode {

  // 帐户中心查看、编辑权限
  ACCOUNT = 'ACCOUNT',

  // 官网首页查看、编辑权限
  HOMEPAGE = 'HOMEPAGE',

  // 官网全局公告查看、编辑权限
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GLOBAL_BANNER = 'GLOBAL_BANNER',

  // 官网产品查看、编辑权限
  PRODUCT = 'PRODUCT',

  // 官网在线咨询查看、编辑的相关权限
  CONSULT = 'CONSULT',

  // 官网活动查看、编辑权限
  ACTIVITY = 'ACTIVITY'
}
