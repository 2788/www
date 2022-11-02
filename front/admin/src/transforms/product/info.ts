/**
 * @file 产品基本配置
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { productRoute, productInfoRoute, productPageInfoRoute } from 'constants/route'
import { ProductId } from 'constants/product'

export function getProductInfoPageUrl(): string {
  return productRoute + productInfoRoute
}

export function getProductPageInfoPageUrl(productId: ProductId): string {
  return getProductInfoPageUrl() + productPageInfoRoute + '/' + productId
}
