/**
 * @file 产品基本配置
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'

import { wwwPaths } from 'constants/deploy/refresh'
import {
  MongoApiStdClientPutOptions, MongoApiBaseClient, MongoApiStdClient, ListStdOptions, StdInfo, generateStdInfo
} from 'apis/mongo-api-client'
import { ProductId, ProductInfo as BaseProductInfo } from 'constants/product'

const resource = 'www-product-info'
const refreshPaths = wwwPaths

export interface ProductInfo extends BaseProductInfo, StdInfo {}

@injectable()
export default class ProductInfoApis {
  private client: MongoApiStdClient<BaseProductInfo>

  constructor(client: MongoApiBaseClient) {
    this.client = new MongoApiStdClient(resource, client)
  }

  async get(productId: ProductId) {
    return this.client.get(productId)
  }

  async list(options: ListStdOptions) {
    return this.client.list({ sort: '+path', ...options })
  }

  async listAll() {
    return this.client.listAll({ sort: '+path' })
  }

  async delete(productId: ProductId) {
    await this.client.delete(productId, refreshPaths)
  }

  async create(record: BaseProductInfo) {
    await this.client.post(record, refreshPaths)
  }

  async update(record: MongoApiStdClientPutOptions<BaseProductInfo>) {
    const data = {
      ...record,
      updatedAt: generateStdInfo().updatedAt
    }
    delete (data as any)._id // FIXME: 干掉这个
    await this.client.client.put( // FIXME: 待优化，client 支持自定义 id
      `${resource}/${encodeURIComponent(record.path)}`,
      data,
      { wwwRefresh: refreshPaths }
    )
  }
}
