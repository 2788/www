/**
 * @file component Activity
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { useLocalStore } from 'qn-fe-core/local-store'

import { ComponentName, IComponentInfo } from 'apis/component'

import ActivityStore from './store'

// TODO: 严格来说它们应该定义在 components/common 里，而不是从属于这个 Activity 组件
// 但挪过去也有挪过去的问题，所以现在先不折腾
import Demo from './components/Demo'
import PageBanner from './components/PageBanner'
import TitleBar from './components/TitleBar'
import PageNav from './components/PageNav'
import RichText from './components/RichText'
import CouponContainer from './components/CouponContainer'
import PackageContainer from './components/PackageContainer'

import * as styles from './style.m.less'

export interface IBaseProps {
  code: string // activity code
  info: IComponentInfo<ComponentName>
  ref?(ele: HTMLElement): void
}

export interface IProps {
  code: string
}

export default observer(function Activity(props: IProps) {
  const activityStore = useLocalStore(ActivityStore, props)

  const elementMap: { [key: string]: HTMLElement } = {}

  function registerElement(key: string, element: HTMLElement) {
    elementMap[key] = element
  }

  // 要不要加滚动动画。。？
  function scrollTo(key: string) {
    // 是不是直接这样简单点。。 就不需要 ref 了
    // document.querySelector(`[data-key="${key}"]`)!.scrollIntoView()

    if (elementMap[key]) {
      elementMap[key].scrollIntoView()
    } else {
      console.error('找不到指定控件', key)
    }
  }

  function renderComponent(componentInfo: IComponentInfo, _index: number) {
    const commonProps = {
      key: componentInfo.key,
      code: props.code
    }

    // 为了让类型能够正确匹配上，这里必须啰哩啰嗦地人肉展开并匹配上每一项
    // 倒也有个好处，就是可以定义各自的参数，而不致于耦合在一起
    switch (componentInfo.value) {
      case ComponentName.Demo:
        return (
          <Demo {...commonProps} info={componentInfo} ref={ele => registerElement(componentInfo.key, ele)} />
        )
      case ComponentName.PageBanner:
        return (
          <PageBanner {...commonProps} info={componentInfo} ref={ele => registerElement(componentInfo.key, ele)} />
        )
      case ComponentName.TitleBar:
        return (
          <TitleBar {...commonProps} info={componentInfo} ref={ele => registerElement(componentInfo.key, ele)} />
        )
      case ComponentName.PageNav:
        return (
          <PageNav
            {...commonProps}
            info={componentInfo}
            onScrollTo={scrollTo}
            ref={ele => registerElement(componentInfo.key, ele)}
          />
        )
      case ComponentName.RichText:
        return (
          <RichText {...commonProps} info={componentInfo} ref={ele => registerElement(componentInfo.key, ele)} />
        )
      case ComponentName.CouponContainer:
        return (
          <CouponContainer {...commonProps} info={componentInfo} ref={ele => registerElement(componentInfo.key, ele)} />
        )
      case ComponentName.PackageContainer:
        return (
          <PackageContainer {...commonProps} info={componentInfo} ref={ele => registerElement(componentInfo.key, ele)} />
        )
      default:
        console.error('找不到控件', componentInfo)
        return null
    }
  }

  return (
    <div className={styles.wrapper}>
      {(activityStore.list || []).map((componentInfo, index) => (
        <div
          key={componentInfo.key}
          data-key={componentInfo.key}
          data-role={componentInfo.value}
          className={styles.component}
        >
          {renderComponent(componentInfo, index)}
        </div>
      ))}
    </div>
  )
})
