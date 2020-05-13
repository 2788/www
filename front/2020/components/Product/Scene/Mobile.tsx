/**
 * @file 使用场景组件移动端
 * @description 包含使用场景等
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react'

import Menu, { SubMenu } from 'components/UI/Menu'

import {
  ISceneProps, IPanelProps, IBlockProps
} from '.'

import { context, PanelInfo } from './utils'

import styles from './style.less'

export interface IMobileSceneProps extends ISceneProps {}

export interface IMobilePanelProps extends IPanelProps {}

export interface IMobileBlockProps extends IBlockProps {}

/** 可切换 panel 区块信息集合 */
export type PanelInfoMap = {
  [name: string]: PanelInfo
}

export default function MobileScene(props: IMobileSceneProps) {
  const { children } = props
  const [panelMap, setPanelMap] = useState<PanelInfoMap>({})

  const register = useCallback((info: PanelInfo) => setPanelMap(current => ({
    ...current,
    [info.name]: info
  })), [])

  const panels = useMemo(() => Object.values(panelMap), [panelMap])
  const [active, setActive] = useState<string>('')

  useEffect(
    () => {
      const defaultActive = panels.length > 0 ? panels[0].name : ''
      setActive(defaultActive)
    },
    [panels]
  )

  function handlePanelsChange(activeKey: string) {
    if (active === activeKey) {
      setActive('')
      return
    }

    setActive(activeKey)
  }

  const scenePanelsView = panels.map(({ name, title, node }) => (
    <SubMenu key={name} title={title} mode="inline" onTitleClick={({ key }: any) => {
      handlePanelsChange(key)
    }}>{node}</SubMenu>
  ))

  const className = [
    props.className,
    styles.mobile
  ].filter(Boolean).join(' ')

  return (
    <context.Provider value={{ panels, active, setActive, register }}>
      <div className={className}>
        <Menu className={className} mode="inline" level={-1} openKeys={[active]}>
          {scenePanelsView}
        </Menu>
        {children}
      </div>
    </context.Provider>
  )
}

export function MobilePanel(props: IMobilePanelProps) {
  const { name, title, children } = props
  const contextValue = useContext(context)

  function renderMain() {
    const className = [
      props.className,
      styles.panel
    ].filter(Boolean).join(' ')
  
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  // 当前 panel 信息向上注册
  const register = contextValue?.register
  useEffect(() => {
    if (!register) {
      return
    }

    register({
      name,
      title,
      node: renderMain()
    })
  }, [register, name, title])

  if (!contextValue) {
    throw new Error('Component `MobilePanel` should be used in `MobileScene`')
  }

  return null
}

export function MobileBlock(props: IMobileBlockProps) {
  const { children } = props

  const className = [
    props.className,
    styles.block
  ].filter(Boolean).join(' ')

  return (
    <div className={className}>
      {children}
    </div>
  )
}
