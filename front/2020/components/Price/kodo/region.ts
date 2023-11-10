enum Region {
  EastZheJiang2 = 'east-zhejiang2',
  // 华东-浙江
  East = 'east',
  // 华南-广东
  South = 'south',
  // 华北-河北
  North = 'north',
  // 北美-洛杉矶
  USLA = 'us-la',
  // 亚太-新加坡
  AsiaSgp = 'asia-sgp',
  // 亚太-首尔
  // AsiaSeoul = 'asia-seoul'
  AsiaHanoi = 'asia-Hanoi'
}

export const defaultRegion = Region.EastZheJiang2

export const nameMap: { [key in Region]: string } = {
  [Region.EastZheJiang2]: '华东-浙江2',
  [Region.East]: '华东-浙江',
  [Region.South]: '华南-广东',
  [Region.North]: '华北-河北',
  [Region.USLA]: '北美-洛杉矶',
  [Region.AsiaSgp]: '亚太-新加坡',
  [Region.AsiaHanoi]: '亚太-河内'
}

export const regionOptions = [
  { label: nameMap[Region.EastZheJiang2], value: Region.EastZheJiang2 },
  { label: nameMap[Region.East], value: Region.East },
  { label: nameMap[Region.South], value: Region.South },
  { label: nameMap[Region.North], value: Region.North },
  { label: nameMap[Region.USLA], value: Region.USLA },
  { label: nameMap[Region.AsiaSgp], value: Region.AsiaSgp },
  { label: nameMap[Region.AsiaHanoi], value: Region.AsiaHanoi }
]

export default Region
