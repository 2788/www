/**
 * @file 可导航区域
 * @description 包裹在 Navigator & Block 之外
 */

import React, { ReactNode, useState, useCallback, useMemo, useEffect } from 'react'
import { useHash } from 'hooks/url'
import { useScrollTop } from 'hooks/scroll'
import { useOnChange } from 'hooks'
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

  const [active, setActive] = useHash()
  const [scrollTop, scrollTo] = useScrollTop()

  // 页面滚动时根据滚动位置同步更新当前 active 信息
  useOnChange(() => {
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i]
      if (isBlockInView(block, scrollTop)) {
        setActive(block.name)
        return
      }
    }
    setActive(null)
  }, [scrollTop])

  const activeBlock = active && blockMap[active]

  // 控制页面滚动到 active block 对应的位置
  useEffect(() => {
    // TODO: 初次控制滚动的事情会不会挪到页面 onload 之后做更好？可能可以有更好的首屏表现
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
