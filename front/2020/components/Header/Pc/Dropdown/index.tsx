import React, { useContext } from 'react'
import { DropdownProps } from 'rc-dropdown/lib/Dropdown'
import Dropdown from 'components/UI/Dropdown'
import { headerDropdownContext } from '..'

export default function DropdownForHeader({ onVisibleChange: _onVisibleChange, ...rest }: DropdownProps) {
  const setTotal = useContext(headerDropdownContext)?.setDisplayedDropdownTotal
  const handleVisibleChange = (visible: boolean) => {
    if (_onVisibleChange) {
      _onVisibleChange(visible)
    }
    if (setTotal) {
      if (visible) {
        setTotal((v: number) => v + 1)
      } else {
        setTotal((v: number) => v - 1)
      }
    }
  }

  return (
    <Dropdown onVisibleChange={handleVisibleChange} {...rest} />
  )
}
