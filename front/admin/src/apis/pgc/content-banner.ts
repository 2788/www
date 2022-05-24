/**
 * @file 内容站 - 首页轮播图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'

import { BannerInfo } from 'constants/pgc/conetnt-banner'
import { MongoApiBaseClient, MongoApiStdClient } from 'apis/mongo-api-client'

const resource = 'pgc-content-banner'

@injectable()
export default class PgcContentBannerApis {
  client: MongoApiStdClient<BannerInfo>

  constructor(client: MongoApiBaseClient) {
    this.client = new MongoApiStdClient(resource, client)
  }

  async listAll() {
    const list = await this.client.listAll({ sort: '+order,-effectTime,-updatedAt' })
    return list // TODO: 二次排序优化 & 根据状态筛选
  }
}
