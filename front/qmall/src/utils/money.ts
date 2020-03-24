/**
 * @file money utils
 * @author yanxiaosong <yanxiaosong@qiniu.com>
 */

export function asYuan(origin: number): number {
  return Number.isFinite(origin) ? origin / 1e4 : 0
}
