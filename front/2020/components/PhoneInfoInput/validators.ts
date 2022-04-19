import { textNotEmpty, textOfPattern } from 'utils/form'

export const validateTextRequired = textNotEmpty('请填写')
export const validatePhone = textOfPattern(/^(13[0-9]|14[579]|15[012356789]|166|17[235678]|18[0-9]|19[01589])[0-9]{8}$/, '请填写正确的手机号')
