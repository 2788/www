import * as di from 'qn-fe-core/di'
import * as base from 'admin-base/common/utils/test'

import { defaultProvides } from 'components/App/Provider'

export class RendererUtils extends base.RendererUtils {
  constructor(
    provides?: di.Provides,
    containerOptions?: di.ContainerOptions,
    parentContainer?: di.IContainer
  ) {
    provides = di.mergeProvides(defaultProvides, provides)
    super(provides, containerOptions, parentContainer)
  }
}

export function createContainer(
  provides?: di.Provides,
  options?: di.ContainerOptions,
  parentContainer?: di.IContainer
) {
  provides = di.mergeProvides(defaultProvides, provides)
  return base.createContainer(provides, options, parentContainer)
}
