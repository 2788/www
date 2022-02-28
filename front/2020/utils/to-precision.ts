/**
 * @file 精度设置
 */

/**
 * @param num 是需要做精度变化的数
 * @param precision 代表期望精度保留小数点后 precision 位，传入的数应为正整数
 * @description 严格地将输入的数字转换为小数点后两位的形式。如果输入数字小数点后多余两位，多余的位数直接舍去；如果输入数字小数点后不够两位，需要进行补零操作
 * 此方法与 Number.toFixed() 方法的区别在于:
 * Number.toFixed() 方法在保留小数点位数时，采用的是四舍五入的方式
 * 此方法采用的是向下取整的方式
 */
export default function toPrecision(num: unknown, precision: number): string {
  const tempNum = Number(num)
  if (Number.isNaN(tempNum)) {
    return Number(0).toFixed(precision)
  }
  const n = 10 ** precision
  // 乘 n 取整，再除以 n 之后，舍去原来小数点后 precision 位的数字，同时可能造成小数点后没有数字或者只有一位，故转换成字符串处理
  let result = (Math.floor(tempNum * n) / n).toString()
  // 获取小数点的位置
  let decimalIndex = result.indexOf('.')
  // 整数时，首先添加小数点
  if (decimalIndex < 0) {
    decimalIndex = result.length
    result += '.'
  }
  // 不够指定位数的的情况进行补零处理
  while (result.length <= decimalIndex + precision) {
    result += '0'
  }
  return result
}
