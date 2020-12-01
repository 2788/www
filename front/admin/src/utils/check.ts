type StateProps = {
  effectTime: number
  invalidTime: number
}

// 判断当前时间段是否和之前已有的重叠
export function checkOverlap<C extends StateProps, T extends StateProps>(current: C, times: T[]) {
  return times.some(time => (time.effectTime <= current.effectTime && time.invalidTime >= current.effectTime)
    || (current.effectTime <= time.effectTime && current.invalidTime >= time.effectTime))
}
