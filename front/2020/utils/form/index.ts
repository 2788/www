/**
 * @file form-related utils
 * @author nighca <nighca@live.cn>
 */

import { FormState, FieldState } from 'formstate-x'

export * from './input'
export * from './form-item'
export * from './validators'

export function ensureValid(state: FormState<any> | FieldState<any>, isDisabled?: boolean): void {
  if (isDisabled) {
    throw new Error('数据不可用')
  }

  if (!state.validated) {
    throw new Error('未校验或校验未完成')
  }

  if (state.hasError) {
    throw new Error('校验未通过：' + state.error)
  }
}
