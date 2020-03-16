/**
 * @file money utils
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

export function asYuan(origin: number): number {
  return Number.isFinite(origin) ? origin / 1e4 : 0
}
