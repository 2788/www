/**
 * @file 编译器注入的相关常量
 * @author renpanpan <renpanpan@qiniu.com>
 */

/** 官网站点 Host */
export const wwwHost = must('wwwHost', process.env.WWW_HOST)

/** 官网源站 Host */
export const wwwSourceHost = must('wwwSourceHost', process.env.WWW_SOURCE_HOST)

function must(name: string, variable?: string): string {
  if (variable === undefined) {
    throw new Error(`Invalid value for environment variable ${name}.`)
  }
  return variable
}
