/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Wed May 20 2020
 * @file: 更严格的数字输入框，只能输入数字
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { useState, ReactNode } from 'react'
import classnames from 'classnames'

import Input, { InputProps } from 'react-icecream/lib/input'

import MinusIcon from './minus.svg'
import PlusIcon from './plus.svg'
import style from './index.less'

type InputNumberProps = Omit<InputProps, 'defaultValue' | 'value' | 'onInput' | 'onChange'> & {
  min?: number
  defaultValue?: string
  // 空字符串会吐出 0
  onChange(value?: number): void
  // 是否显示加减按钮
  showBtns?: boolean
}
// 暂不处理 value
export default function InputNumber({ defaultValue = '', min = 0, onChange, showBtns, ...rest }: InputNumberProps) {
  const [value, setValue] = useState(defaultValue)

  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    const current = (event.target as HTMLInputElement).value

    if (current === '') {
      setValue('')
    }

    // 只能输入空或者大于最小值的值
    if (/^(0|[1-9][0-9]*)$/.test(current) && +current >= min) {
      setValue(current)
    }
  }

  function handleMinus() {
    const num = +value
    if (num > min) {
      setValue(String(num - 1))
      onChange(num - 1)
    }
  }

  function handlePlus() {
    const num = +value
    setValue(String(num + 1))
    onChange(num + 1)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const current = (event.target as HTMLInputElement).value
    if (current === '') {
      onChange(min)
    }

    if (current !== value && /^(0|[1-9][0-9]*)$/.test(current) && +current >= min) {
      onChange(+current)
    }
  }

  return (
    <>
      {showBtns && <Button onClick={handleMinus} disabled={+value <= min} position="left"><MinusIcon /></Button>}
      <Input value={value} onInput={handleInput} onChange={handleChange} {...rest} />
      {showBtns && <Button onClick={handlePlus} position="right"><PlusIcon /></Button>}
    </>
  )
}

const positionMap = {
  left: style.left,
  right: style.right
}

type ButtonProps = {
  children: ReactNode,
  position: 'left' | 'right',
  disabled?: boolean
  onClick?(): void
}

function Button({ children, position, disabled, onClick }: ButtonProps) {
  return (
    <div onClick={onClick} className={classnames(style.button, positionMap[position], disabled && style.disabled)}>
      {children}
    </div>
  )
}
