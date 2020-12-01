// copy 自 portal-fusion/qiniu.com/fusion/src/transforms/form.ts
// 修改以适应 formstate 的类型要求

import * as mustache from 'mustache'
import { every, isInteger } from 'lodash'
import { httpUrl } from 'admin-base/common/constants/pattern'

export type ValidatorError = string | null
export type ValidatorResult = ValidatorError | Promise<ValidatorError>

const isAsyncResult: (result: ValidatorResult) => result is Promise<ValidatorError> = isPromise

function isPromise(obj: any): obj is Promise<any> {
  if (!obj) {
    return false
  }
  if (typeof obj === 'object' || typeof obj === 'function') {
    if (typeof obj.then === 'function') {
      return true
    }
  }
  return false
}

function renderErrTpl(errTpl: string, err: ValidatorError): ValidatorError {
  if (isEmpty(err)) {
    return null
  }
  return (
    errTpl != null
      ? mustache.render(errTpl, { err })
      : err
  )
}

export type Validator<T> = (value: T, errTpl?: string) => ValidatorResult

export function isEmpty(error: ValidatorError): boolean {
  if (error == null) { return true }
  if (typeof error === 'object') { return every(error, isEmpty) }
  return false
}

export function createValidator<T>(validate: Validator<T>): Validator<T> {
  // TODO: 优化，如果传入的已经是一个通过 createValidator 创建出来的方法，则直接 return 之，不再包一层
  return function validator(value: T, errTpl: string) {
    const result = validate(value)
    return (
      isAsyncResult(result)
        ? result.then(res => renderErrTpl(errTpl, res))
        : renderErrTpl(errTpl, result)
    )
  }
}

// 对异步结果做 and
function asyncResultsAnd(asyncResults: Array<Promise<ValidatorError>>): ValidatorResult {
  if (asyncResults.length === 0) {
    return null
  }
  return new Promise(resolve => {
    // 任一不通过，则不通过
    asyncResults.forEach(asyncResult => asyncResult.then(result => {
      if (!isEmpty(result)) {
        resolve(result)
      }
    }))
    // 所有都通过，则通过
    return Promise.all(asyncResults).then(results => {
      if (every(results, isEmpty)) {
        resolve(null)
      }
    })
  })
}

export function and<T>(...validators: Array<Validator<T>>): Validator<T> {
  if (validators.length === 0) {
    return () => null
  }

  if (validators.length === 1) {
    return validators[0]
  }

  return createValidator((value: T): ValidatorResult => {
    const asyncResults: Array<Promise<ValidatorError>> = []

    for (const validator of validators) {
      const result = validator(value)

      if (isAsyncResult(result)) {
        asyncResults.push(result)
        continue
      }

      // 任一不通过，则不通过
      if (!isEmpty(result)) {
        return result
      }
    }

    return asyncResultsAnd(asyncResults)
  })
}

export const textPattern = (pattern: RegExp) => createValidator((v: string) => (pattern.test(v) ? null : '格式不正确'))
// TODO 补全 \s 等空白符范围
export const textNotBlank = createValidator((v: string) => textPattern(/[^\s]+/)(v, '不可为空'))
export const textInterger = createValidator((v: string) => textPattern(/^\d+$/)(v, '请输入整数'))
export const textPositiveInterger = createValidator((v: string) => textPattern(/^\+?[1-9]\d*$/)(v, '请输入正整数'))
export const textLengthMin = (min: number) => createValidator((v: string) => (v.length >= min ? null : `长度不能小于 ${min}`))
export const textLengthMax = (max: number) => createValidator((v: string) => (v.length <= max ? null : `长度不能大于 ${max}`))
export const numberMin = (min: number) => createValidator((v: number) => (v >= min ? null : `要求至少为 ${min}`))
export const numberMax = (max: number) => createValidator((v: number) => (v <= max ? null : `要求至多为 ${max}`))
export const numberNotNaN = createValidator((v: number) => (!Number.isNaN(v) ? null : '请输入数字'))
export const numberInteger = createValidator((v: number) => (isInteger(v) ? null : '请输入整数'))
export const numberLengthMin = <T>(min: number) => createValidator((v: T[]) => (v.length >= min ? null : `要求至少包含 ${min} 项`))
export const numberLengthMax = <T>(max: number) => createValidator((v: T[]) => (v.length <= max ? null : `要求至多包含 ${max} 项`))
export const notSameWith = <T>(target: T) => createValidator((v: T) => (v !== target ? null : `要求与 ${target} 不同`))
export const textHttp = createValidator((v: string) => textPattern(httpUrl)(v, '链接格式错误'))
export const textProductLink = createValidator((v: string) => textPattern(/^\/products\/[a-zA-Z-_0-9#]+$/)(v, '链接格式错误'))
export const textColor = createValidator((v: string) => textPattern(/^#[0-9a-zA-Z]{6}$/)(v, '颜色格式错误'))
