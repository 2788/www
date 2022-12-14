/**
 * @file 产品动态
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ProductModule, productModuleTitleMap, ProductSection } from 'constants/product/page'
import { ProductComponentName } from 'constants/product/page/comp-common'
import { ProductComponentNewsConfig, ProductComponentNewsProps } from 'constants/product/page/comp-news'

export default function useCompNews() {
  async function add() {
    const props: ProductComponentNewsProps = {}
    const newConfig: ProductSection<ProductComponentNewsConfig> = {
      name: ProductModule.News,
      title: productModuleTitleMap[ProductModule.News],
      component: {
        name: ProductComponentName.News,
        props
      }
    }
    return newConfig
  }

  const view = null

  return [add, view] as const
}
