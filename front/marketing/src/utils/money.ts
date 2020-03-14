/**
 * @file money utils
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

export function asYuan(origin: any): number {
  return (origin / 1e4) || 0
}
