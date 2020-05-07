/**
 * @file 可导航区域
 * @description 包裹在 Navigator & Block 之外
 */

import React, { ReactNode, useState, useCallback, useMemo, useEffect } from 'react'
import { useHash } from '../../../hooks/url'
import { useScrollTop } from '../../../hooks/scroll'
import { BlockInfo, isBlockInView, navigatorHeight, context } from './utils'

/** 可导航区块信息集合 */
export type BlockInfoMap = {
  [name: string]: BlockInfo
}

export type Props = {
  children: ReactNode
}

/** 可导航区域，预期包裹在导航栏（`Navigator`）外部，包含多个可导航块（`Block`） */
export default function Navigatable({ children }: Props) {
  const [blockMap, setBlockMap] = useState<BlockInfoMap>({})

  const register = useCallback((info: BlockInfo) => setBlockMap(current => ({
    ...current,
    [info.name]: info
  })), [])

  const blocks = useMemo(() => Object.values(blockMap).sort(
    // 依据 block 在界面上垂直方向的位置排序
    (blockA, blockB) => blockA.offsetTop - blockB.offsetTop
  ), [blockMap])

  const [hash, updateHash] = useHash()
  const firstBlock = blocks.length > 0 ? blocks[0].name : null
  const defaultActive = hash != null ? hash : firstBlock

  const [active, setActive] = useState(defaultActive)
  const [scrollTop, scrollTo] = useScrollTop()

  // tab 切换 -> 同步到 URL hash
  useEffect(
    () => updateHash(active),
    [updateHash, active]
  )

  // 页面滚动时根据滚动位置同步更新当前 active 信息
  useEffect(() => {
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i]
      if (isBlockInView(block, scrollTop)) {
        setActive(block.name)
        return
      }
    }
  }, [blocks, scrollTop])

  const activeBlock = active && blockMap[active]

  // 当前 active block 发生变更时，控制页面滚动到对应的位置
  useEffect(() => {
    if (activeBlock && !isBlockInView(activeBlock, scrollTop)) {
      scrollTo(activeBlock.offsetTop - navigatorHeight)
    }
  }, [activeBlock]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <context.Provider value={{ blocks, active, setActive, register }}>
      {children}
    </context.Provider>
  )
}
