/**
 * @file Tags
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { IState } from 'formstate-x'
import { InputWrapper } from 'react-icecream-form'
import { Select } from 'react-icecream-1'

import { categoryTagsMap, tagCategories, tagCategoryTextMap } from 'constants/pgc/content'

export interface Props {
  state: IState<string[]>
}

export default observer(function Form({ state }: Props) {
  return (
    <InputWrapper state={state}>
      <Select
        mode="tags"
        value={state.value}
        onChange={v => state.onChange(v as string[])}
      >
        {
          tagCategories.map(category => (
            <Select.OptGroup key={category} label={tagCategoryTextMap[category]}>
              {categoryTagsMap[category].map(tag => (
                <Select.Option key={tag} value={tag}>{tag}</Select.Option>
              ))}
            </Select.OptGroup>
          ))
        }
      </Select>
    </InputWrapper>
  )
})
