import { SelectValue } from 'react-icecream-2'
import { textNotEmpty, textOfPattern } from 'utils/form'

export const validateTextRequired = textNotEmpty('请填写')
export function validateSelectorRequired<T extends SelectValue>(value: T | null) {
  return value == null ? '请选择' : null
}
export const validateEmail = textOfPattern(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[a-zA-Z0-9](?:[\w-]*[\w])?/, '请填写正确的 E-mail 地址')
