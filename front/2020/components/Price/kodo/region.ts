enum Region {
  EastZheJiang2 = 'east-zhejiang2',
  East = 'east',
  South = 'south',
  North = 'north',
  // 北美
  US = 'us',
  // 东南亚
  SouthAsia = 'south-asia'
}

export const defaultRegion = Region.EastZheJiang2

export const nameMap: { [key in Region]: string } = {
  [Region.EastZheJiang2]: '华东-浙江2',
  [Region.East]: '华东',
  [Region.South]: '华南',
  [Region.North]: '华北',
  [Region.US]: '北美',
  [Region.SouthAsia]: '东南亚'
}

export const regionOptions = [
  { label: nameMap[Region.EastZheJiang2], value: Region.EastZheJiang2 },
  { label: nameMap[Region.East], value: Region.East },
  { label: nameMap[Region.South], value: Region.South },
  { label: nameMap[Region.North], value: Region.North },
  { label: nameMap[Region.SouthAsia], value: Region.SouthAsia },
  { label: nameMap[Region.US], value: Region.US }
]

export default Region
