/**
 * @file 使用场景组件 Pc 端
 * @description 包含使用场景等
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, {
  useContext, useState, useCallback, useMemo, useEffect
} from 'react'

import Tabs, { Tab } from '../../UI/Tabs'

import {
  ISceneProps, IPanelProps, IBlockProps,
  BlockType
} from '.'

import { context, PanelInfo } from './utils'

import styles from './style.less'

export interface IPcSceneProps extends ISceneProps {}

export interface IPcPanelProps extends IPanelProps {}

export interface IPcBlockProps extends IBlockProps {}

/** 可切换 panel 区块信息集合 */
export type PanelInfoMap = {
  [name: string]: PanelInfo
}

export default function PcScene(props: IPcSceneProps) {
  const { children } = props
  const [panelMap, setPanelMap] = useState<PanelInfoMap>({})

  const register = useCallback((info: PanelInfo) => setPanelMap(current => ({
    ...current,
    [info.name]: info
  })), [])

  const panels = useMemo(() => Object.values(panelMap), [panelMap])
  const [active, setActive] = useState<string | null>(null)

  useEffect(
    () => {
      const defaultActive = panels.length > 0 ? panels[0].name : null
      setActive(defaultActive)
    },
    [panels]
  )

  function handlePanelsChange(activeKey: string) {
    setActive(activeKey)
  }

  const sceneTabsView = panels.map(
    ({ name, title }) => <Tab key={name} value={name}>{title}</Tab>
  )

  const className = [
    props.className,
    styles.pc
  ].filter(Boolean).join(' ')

  return (
    <context.Provider value={{ panels, active, setActive, register }}>
      <div className={className}>
        <Tabs className={styles.tabs} value={active} onChange={handlePanelsChange}>
          {sceneTabsView}
        </Tabs>
        {children}
      </div>
    </context.Provider>
  )
}

export function PcPanel(props: IPcPanelProps) {
  const { name, title, children, verticalCenter } = props
  const contextValue = useContext(context)

  // 当前 panel 信息向上注册
  const register = contextValue?.register
  useEffect(() => {
    if (!register) {
      return
    }

    register({
      name, title
    })
  }, [register, name, title])

  if (!contextValue) {
    throw new Error('Component `PcPanel` should be used in `PcScene`')
  }

  const active = contextValue?.active === name

  const className = [
    props.className,
    styles.panel,
    active && styles.active,
    verticalCenter && styles.verticalCenter
  ].filter(Boolean).join(' ')

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export function PcBlock(props: IPcBlockProps) {
  const { children, shadow, blockType } = props

  function getClassByBlockType(type: BlockType) {
    switch (type) {
      case 'zoom':
        return styles.zoom
      case 'fixed':
        return styles.fixed
      default:
        return styles.zoom
    }
  }

  const className = [
    props.className,
    styles.block,
    shadow && styles.shadow,
    getClassByBlockType(blockType)
  ].filter(Boolean).join(' ')

  return (
    <div className={className}>
      {children}
    </div>
  )
}
