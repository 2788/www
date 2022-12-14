/**
 * @file utils for type
 * @desc 类型定义相关 utils
 */

import { MutableRefObject } from 'react'

export type Ref<T> = ((instance: T | null) => void) | MutableRefObject<T | null>

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
export type ReplaceBy<T, U extends Partial<Record<keyof T, any>>> = Omit<T, keyof U> & U
