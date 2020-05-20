/**
 * @file form-item-related utils
 * @author nighca <nighca@live.cn>
 */

import { Validatable } from 'formstate-x'

export type ValidateStatus = '' | 'error' | 'success' | 'warning' | 'validating'

export function getValidateStatus(state: Validatable<any>): ValidateStatus {
  if (state.validating) {
    return 'validating'
  }
  if (state.hasError) {
    return 'error'
  }
  if (state.validated) {
    return 'success'
  }
  return ''
}

export function bindFormItem(state: Validatable<any>) {
  return {
    help: state.error,
    validateStatus: getValidateStatus(state)
  }
}
