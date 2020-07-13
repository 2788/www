/**
 * @file 神策统计脚本 API
 * @description API 参考文档 https://manual.sensorsdata.cn/sa/latest/sdk-web-7545346.html
 * @description pages/_document.tsx 中引入对应的 script
 */

interface Window {
  sensors: {
    login(uid: string): void
    track(eventName: string, options: { [key: string]: any }): void
    quick(name: string, options: { [key: string]: any }): void
  }
}
