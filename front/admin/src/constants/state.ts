
export enum State {
  Start = '等待上架',
  Mid = '上架中',
  End = '已下架'
}

type CheckBoxValue = {
  label: string
  value: string
}

export const stateOption: CheckBoxValue[] = [State.Start, State.Mid, State.End].map(val => ({ label: val, value: val }))

