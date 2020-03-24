/**
 * @file package utils
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

export function splitStrByComma(origin: string): string[] {
  return origin ? origin.split(/,|，/).filter((item: string, _index: number) => !!item) : []
}

export function joinStrListByHyphen(origin: string[]): string {
  return (origin && origin.length && origin[0]) ? origin.join('-') : ''
}
