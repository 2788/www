import { BitrateUnit, bitrateUnitToBpsMap } from './constants'

/**
 * 计算每天带宽使用量，保留两位小数 Mbps
 * @param bitrate (bps)
 * @param concurrent
 */
export function getTotalBandwidth(bitrate: number, concurrent: number) {
  const bitrateMbps = bitrate / bitrateUnitToBpsMap[BitrateUnit.Mbps]
  return removeExtraDecimals(bitrateMbps * concurrent)
}

/**
 * 计算每天流量使用量 GB，保留两位小数
 * @param bitrate (bps)
 * @param concurrent
 * @param duration (s)
 */
export function getTotalTraffic(bitrate: number, concurrent: number, duration: number) {
  // 估算单位按 1000 进位，1KB = 1000B
  const trafficGB = (bitrate / 8) * concurrent * duration / (1000 ** 3)
  return removeExtraDecimals(trafficGB)
}

/**
 * 最多保留两位小数
 */
function removeExtraDecimals(num: number) {
  return Math.round(num * 100) / 100
}
