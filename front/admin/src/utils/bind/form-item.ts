/**
 * @file FormItem binding for icecream v1
 * @author nighca <nighca@live.cn>
 */

import * as v2 from 'formstate-x-v2'
import * as v3 from 'formstate-x'

export type ValidateStatus = '' | 'error' | 'success' | 'warning' | 'validating'

function getValidateStatus(state: v2.Validatable<unknown> | v3.IState): ValidateStatus {
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

export function bindFormItem(state: v2.Validatable<unknown> | v3.IState) {
  return {
    help: state.error,
    validateStatus: getValidateStatus(state)
  }
}
