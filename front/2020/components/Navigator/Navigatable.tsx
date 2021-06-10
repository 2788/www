/**
 * @file 可导航区域
 * @description 包裹在 Navigator & Block 之外
 */

// TODO: Navigatable & Block 逻辑可以从 Navigator 模块中抽出去，作为更基础的组件

import React, { ReactNode, useState, useCallback, useMemo } from 'react'
import { useHash } from 'hooks/url'
import { useScrollTop } from 'hooks/scroll'
import { useOnChange } from 'hooks'
import { useLoaded } from 'hooks/ua'
import { BlockInfo, isBlockInView, context, NavigatorInfo } from './utils'

/** 可导航区块信息集合 */
export type BlockInfoMap = {
  [name: string]: BlockInfo
}

export type Props = {
  children: ReactNode
}

/** 可导航区域，预期包裹在导航栏（`Navigator`）外部，包含多个可导航块（`Block`） */
export default function Navigatable({ children }: Props) {
  const loaded = useLoaded()
  const [navigatorInfo, registerNavigator] = useState<NavigatorInfo | null>(null)
  const [blockMap, setBlockMap] = useState<BlockInfoMap>({})

  const registerBlock = useCallback((info: BlockInfo) => setBlockMap(current => ({
    ...current,
    [info.name]: info
  })), [])

  const blocks = useMemo(() => Object.values(blockMap).sort(
    // 依据 block 在界面上垂直方向的位置排序
    (blockA, blockB) => blockA.wrapper.offsetTop - blockB.wrapper.offsetTop
  ), [blockMap])

  const [active, setActive] = useHash()
  const [scrollTop, scrollTo] = useScrollTop(0)

  // 页面滚动时根据滚动位置同步更新当前 active 信息
  useOnChange(() => {
    if (!loaded) return
    const navigatorHeight = navigatorInfo?.wrapper.offsetHeight || 0
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i]
      if (isBlockInView(block, scrollTop, navigatorHeight)) {
        setActive(block.name)
        return
      }
    }
    setActive(null)
  }, [scrollTop])

  const activeBlock = active && blockMap[active.split('/')[0]]

  // 控制页面滚动到 active block 对应的位置
  const syncScrollTop = useCallback(() => {
    const navigatorHeight = navigatorInfo?.wrapper.offsetHeight || 0
    if (activeBlock && !isBlockInView(activeBlock, scrollTop, navigatorHeight)) {
      scrollTo(activeBlock.wrapper.offsetTop - navigatorHeight)
    }
  }, [activeBlock, navigatorInfo, scrollTo, scrollTop])

  // activeBlock 发生变更或页面 loaded 后尝试同步位置
  useOnChange(() => {
    if (!loaded) return
    syncScrollTop()
  }, [activeBlock, loaded])

  const contextValue = useMemo(() => ({
    navigator: navigatorInfo,
    registerNavigator,
    blocks,
    registerBlock,
    active,
    setActive
  }), [navigatorInfo, blocks, registerBlock, active, setActive])

  return (
    <context.Provider value={contextValue}>
      {children}
    </context.Provider>
  )
}
