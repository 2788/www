/**
 * @file component Toaster
 * @author nighca <nighca@live.cn>
 */

import * as React from 'react'
import { autorun, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Alert from 'react-icecream/lib/alert'
import Icon from 'react-icecream/lib/icon'
import Store from 'qn-fe-core/store'
import { injectable } from 'qn-fe-core/di'
import { useLocalStore } from 'qn-fe-core/local-store'

import ToasterStore, { IItem } from '../../stores/toaster'

import './style.less'

// 映射 toaster 的类型到具体的图标
const toasterIconMap = {
  info: 'info-circle',
  success: 'check-circle',
  warning: 'warning',
  error: 'close-circle'
}

interface IToasterItem extends IItem {
  id?: number
}

@injectable()
export class LocalStore extends Store {

  constructor(private toasterStore: ToasterStore) {
    super()
  }

  @observable.shallow items: IToasterItem[] = []

  id = 0

  @action.bound add(item: IToasterItem) {
    item.id = this.id++
    this.items.push(item)
    if (this.items.length > 3) {
      this.remove(0)
    }
    return () => {
      const index = this.items.findIndex((i) => item.id === i.id)
      if (index >= 0) {
        this.remove(index)
      }
    }
  }

  @action remove(idx: number) {
    this.items.splice(idx, 1)
  }

  init() {
    this.addDisposer(autorun(() => {
      const item = this.toasterStore.current
      if (!item) {
        return
      }

      const remove = this.add(item)

      setTimeout(
        () => remove(),
        item.delay
      )
    }))
  }
}

export default observer(function Toaster() {
  const store = useLocalStore(LocalStore)

  const itemsView = store.items.map(
    (item, index) => {
      const message = (
        <div className="toaster-message-wrapper">
          <Icon
            type={toasterIconMap[item.type]}
            className="toaster-message-icon"
            theme="filled"
          />
          {item.message}
        </div>
      )

      return (
        <CSSTransition
          key={item.id}
          classNames="toaster-item"
          timeout={{
            exit: 300,
            enter: 500
          }}
        >
          <Alert
            key={index}
            type={item.type}
            message={message}
            closable
            afterClose={() => store.remove(index)}
          />
        </CSSTransition>
      )
    }
  )

  return (
    <div className="comp-toaster">
      <div className="toaster-list">
        <TransitionGroup>
          {itemsView}
        </TransitionGroup>
      </div>
    </div>
  )
})
