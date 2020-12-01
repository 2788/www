import * as React from 'react'
import { observer } from 'mobx-react'
import Select from 'react-icecream/lib/select'
import { FieldState } from 'formstate-x'
import { bindSelect } from 'admin-base/common/utils/form'

interface IProps {
  state: FieldState<number>
  maxNum?: number
}

export default observer(function OrderField(props: IProps) {
  const max = props.maxNum || 4
  const arr: number[] = []
  for (let i = 1; i <= max; i++) {
    arr.push(i)
  }

  return (
    <Select
      placeholder="请选择展示顺序"
      {...bindSelect(props.state)}
    >
      {arr.map((item, index) => (
        <Select.Option key={index} value={item}>
          {item}
        </Select.Option>
      ))}
    </Select>
  )
})
