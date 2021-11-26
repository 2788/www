/**
 * @file 所在省份和地市
 */

import React, { useMemo, useEffect } from 'react'
import { observer } from 'mobx-react'
import { FieldState, FormState } from 'formstate-x'
import { FormItem, Select, SelectOption } from 'react-icecream-2/esm/form-x'

import provinceOptions from './options.json'
import { validateSelectorRequired } from '../validators'
import style from '../style.less'

export type State = FormState<{
  province: FieldState<string | null>
  city: FieldState<string | null>
}>

export type Value = {
  province: string | null
  city: string | null
}

export function createState(value: Value): State {
  return new FormState({
    province: new FieldState(value.province).validators(validateSelectorRequired),
    city: new FieldState(value.city).validators(validateSelectorRequired)
  })
}

export function getValue(state: State) {
  return state.value
}

export interface Props {
  state: State
}

export default observer(function LocationInput({ state }: Props) {
  const fields = state.$

  const cityOptions = useMemo(() => {
    const province = provinceOptions.find(item => item.value === fields.province.value)
    return province?.children || []
  }, [fields.province.value])

  useEffect(() => {
    fields.city.set(cityOptions.length > 0 ? cityOptions[0].value : null)
  }, [cityOptions, fields.city])

  return (
    <>
      <FormItem label="所在省份" required>
        <Select state={fields.province} placeholder="请选择所在省份" className={style.itemContent}>
          {
            provinceOptions.map((item, index) => (
              <SelectOption value={item.value} key={index}>{item.label}</SelectOption>
            ))
          }
        </Select>
      </FormItem>
      {
        fields.province.value && (
          <FormItem label="所在地市" required>
            <Select state={fields.city} placeholder="请选择所在地市" className={style.itemContent}>
              {
                cityOptions.map((item, index) => (
                  <SelectOption value={item.value} key={index}>{item.label}</SelectOption>
                ))
              }
            </Select>
          </FormItem>
        )
      }
    </>
  )
})
