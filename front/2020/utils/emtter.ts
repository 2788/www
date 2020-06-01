/**
 * @file 事件触发器
 */

type Listener = () => void

export default class Emitter {

  listeners: Listener[] = []

  on(listener: Listener) {
    this.listeners = [...this.listeners, listener]
    return () => {
      this.listeners = this.listeners.filter(
        item => item !== listener
      )
    }
  }

  fire() {
    this.listeners.forEach(
      listener => listener()
    )
  }

}
