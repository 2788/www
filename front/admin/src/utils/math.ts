/**
 * @file math
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

/** 求最大公约数 */
export function gcd(m: number, n: number): number {
  return n === 0 ? m : gcd(n, m % n)
}
