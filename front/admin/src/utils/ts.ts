/**
 * @file typescript utils
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

export type ValueOf<T> = T[keyof T]

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ReplaceValue<T, U> = keyof U extends keyof T ? Omit<T, keyof U> & U : never

export function unionStringsFrom<T extends string>(keys: T[]): Array<keyof { [K in T]: K }> {
  return keys
}
