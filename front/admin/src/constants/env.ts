/**
 * @file 编译器注入的相关常量
 * @author renpanpan <renpanpan@qiniu.com>
 */

// 官网站点 Host
export const wwwHost = must('host', process.env.WWW_HOST)

function must(name: string, variable?: string): string {
  if (variable === undefined) {
    throw new Error(`Invalid value for environment variable ${name}.`)
  }
  return variable
}
