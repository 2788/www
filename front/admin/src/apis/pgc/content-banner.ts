/**
 * @file 内容站 - 首页轮播图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'

import { BannerInfo } from 'constants/pgc/content-banner'
import { WwwRefreshPath } from 'apis/base-client'
import { MongoApiBaseClient, MongoApiStdClient, MongoApiStdClientPutOptions } from 'apis/mongo-api-client'

const resource = 'pgc-content-banner'
const refreshPaths: WwwRefreshPath[] = ['/pgc']

@injectable()
export default class PgcContentBannerApis {
  private client: MongoApiStdClient<BannerInfo>

  constructor(client: MongoApiBaseClient) {
    this.client = new MongoApiStdClient(resource, client)
  }

  async listAll() {
    const list = await this.client.listAll({ sort: '+order,-effectTime,-updatedAt' })
    return list // TODO: 二次排序优化 & 根据状态筛选
  }

  delete(id: string) {
    return this.client.delete(id, refreshPaths)
  }

  post(record: BannerInfo) {
    return this.client.post(record, refreshPaths)
  }

  put(record: MongoApiStdClientPutOptions<BannerInfo>) {
    return this.client.put(record, refreshPaths)
  }
}
