/**
 * @file utils for type
 * @desc 类型定义相关 utils
 */

import { MutableRefObject } from 'react'

export type Ref<T> = ((instance: T | null) => void) | MutableRefObject<T | null>
