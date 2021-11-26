import { SelectValue } from 'react-icecream-2'
import { textNotEmpty, textOfPattern } from 'utils/form'

export const validateTextRequired = textNotEmpty('请填写')
export function validateSelectorRequired<T extends SelectValue>(value: T | null) {
  return value == null ? '请选择' : null
}
export const validatePhone = textOfPattern(/^(13[0-9]|14[579]|15[012356789]|166|17[235678]|18[0-9]|19[01589])[0-9]{8}$/, '请填写正确的手机号')
export const validateEmail = textOfPattern(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[a-zA-Z0-9](?:[\w-]*[\w])?/, '请填写正确的 E-mail 地址')
