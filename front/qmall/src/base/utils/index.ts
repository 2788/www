/**
 * @file util methods
 * @author nighca <nighca@live.cn>
 */

// helper for replace original method in decorator realization
// sample:
//    decoratorCreator(params) {
//      return replaceMethod(origin => function (...args) {
//        // new method realization
//      })
//    }
export function replaceMethod<T = any>(replacer: (...args: any[]) => any) {
  return (
    _: any, // target
    __: string, // propertyKey
    descriptor: TypedPropertyDescriptor<T>
  ) => {
    descriptor.value = replacer(descriptor.value)
    return descriptor
  }
}

export function bind(
  _: any, // target
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value
  return {
    configurable: true,
    get() {
      const bound = method.bind(this)
      Object.defineProperty(this, propertyKey, {
        value: bound,
        configurable: true,
        writable: true
      })
      return bound
    }
  }
}

// check if given Component functional
export function isFunctionalComponent<P>(
  Component: React.ComponentClass<P> | React.StatelessComponent<P>
): Component is React.StatelessComponent<P> {
  return typeof Component !== 'string' && !Component.prototype.render
}

export function isPromise(obj: any): obj is Promise<any> {
  if (!obj) {
    return false
  }
  if (typeof obj === 'object' || typeof obj === 'function') {
    if (typeof obj.then === 'function') {
      return true
    }
  }
  return false
}

// export { toPromise as antdToPromise } from './antd'
