import * as React from 'react'
import { observer } from 'mobx-react'
import Select from 'react-icecream/lib/select'
import { FieldState } from 'formstate-x'
import { useInjection } from 'qn-fe-core/di'
import { bindSelect } from 'admin-base/common/utils/form'
import DetailStore from '../store'

interface IProps {
  state: FieldState<string>
}

export default observer(function ProductField(props: IProps) {
  const detailStore = useInjection(DetailStore)
  const pageList = detailStore.pageList
  return (
    <Select
      placeholder="请选择关联产品页"
      {...bindSelect(props.state)}
    >
      {pageList.map((item, index) => (
        <Select.Option key={index} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  )
})
