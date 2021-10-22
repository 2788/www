
export enum AccessType {
  GB28181 = 'GB/T28181',
  RTMP = 'RTMP'
}

export enum BillingType {
  Bandwidth = 'bandwidth',
  Traffic = 'traffic'
}

export const billingTypeTextMap = {
  [BillingType.Bandwidth]: '带宽日峰值',
  [BillingType.Traffic]: '流量'
} as const

// 摄像头码率单位
export enum BitrateUnit {
  Kbps = 'Kbps',
  Mbps = 'Mbps'
}

export const bitrateUnitToBpsMap: Record<BitrateUnit, number> = {
  [BitrateUnit.Kbps]: 1000,
  [BitrateUnit.Mbps]: 10 ** 6
} as const

export enum DurationUnit {
  Month = '月',
  Year = '年'
}

export const durationUnitDaysMap: Record<DurationUnit, number> = {
  [DurationUnit.Month]: 30,
  [DurationUnit.Year]: 365
} as const

// 流量计费 上行 0.15元/GB  下行 0.4元/GB
export const trafficUpGBPrice = 0.15
export const trafficDownGBPrice = 0.4

// 带宽日峰值计费 上行 0.31元/Mbps/日  下行 0.4元/Mbps/日
export const bandwidthUpMbPrice = 0.31
export const bandwidthDownMbPrice = 0.7

// 国标设备管理费 0.05元/天/台
export const deviceManagePrice = 0.05
