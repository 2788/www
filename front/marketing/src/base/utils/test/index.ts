/**
 * @file 测试相关辅助工具
 * @author nighca <nighca@live.cn>
 */

import * as di from 'qn-fe-core/di'
import { defaultProvides } from '../../components/Provider'

export { RendererUtils } from './renderer'

// 构造 DI container，可用于对 store 进行测试（通过 DI container 构造 store 实例）
// TODO: 把这个跟 RendererUtils 合到一起？
export function createContainer(
  provides?: di.Provides,
  containerOptions?: di.IContainerOptions,
  parentContainer?: di.IContainer
) {
  provides = di.mergeProvides(defaultProvides, provides)
  return di.createContainer(provides, containerOptions, parentContainer)
}
