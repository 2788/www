/**
 * @file utils for test
 * @author nighca <nighca@live.cn>
 */

import * as di from 'qn-fe-core/di'
import * as base from '../../base/utils/test'
import { defaultProvides } from '../../components/common/Provider'

export class RendererUtils extends base.RendererUtils {
  constructor(
    provides?: di.Provides,
    containerOptions?: di.IContainerOptions,
    parentContainer?: di.IContainer
  ) {
    provides = di.mergeProvides(defaultProvides, provides)
    super(provides, containerOptions, parentContainer)
  }
}

export function createContainer(
  provides?: di.Provides,
  options?: di.IContainerOptions,
  parentContainer?: di.IContainer
) {
  provides = di.mergeProvides(defaultProvides, provides)
  return base.createContainer(provides, options, parentContainer)
}
