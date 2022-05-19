import { State } from 'constants/state'

export type StateProps = {
  /** 10 位秒级 unix 时间戳 */
  effectTime: number
  /** 10 位秒级 unix 时间戳 */
  invalidTime: number
}

// 判断当前时间段是否和之前已有的重叠
export function checkOverlap<C extends StateProps, T extends StateProps>(current: C, times: T[]) {
  return times.some(time => (time.effectTime <= current.effectTime && time.invalidTime >= current.effectTime)
    || (current.effectTime <= time.effectTime && current.invalidTime >= time.effectTime))
}

export function getStateName(state: StateProps): State {
  const now = Date.now()
  const start = state.effectTime * 1e3
  const end = state.invalidTime * 1e3

  if (now < start) {
    return State.Start
  }

  if (now > end) {
    return State.End
  }

  return State.Mid
}
