/**
 * @file 图标库
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'

import { wwwPaths } from 'constants/deploy/refresh'
import { MongoApiBaseClient, MongoApiStdClient, ListStdOptions, StdInfo, MongoApiStdClientPutOptions } from 'apis/mongo-api-client'
import { IconId, IconInfo as BaseIconInfo } from 'constants/icon'

const resource = 'icon'
const refreshPaths = wwwPaths

export type IconInfo = BaseIconInfo & StdInfo

@injectable()
export default class IconInfoApis {
  private client: MongoApiStdClient<BaseIconInfo>

  constructor(client: MongoApiBaseClient) {
    this.client = new MongoApiStdClient(resource, client)
  }

  async get(id: IconId) {
    return this.client.get(id)
  }

  async list(options: ListStdOptions) {
    return this.client.list({ sort: '+id', ...options })
  }

  async listAll() {
    return this.client.listAll({ sort: '+id' })
  }

  async delete(id: IconId) {
    await this.client.delete(id, refreshPaths)
  }

  async create(record: BaseIconInfo) {
    await this.client.post(record, refreshPaths)
  }

  // TODO: `MongoApiStdClient` 不够好用… 需要优化
  async update(origin: MongoApiStdClientPutOptions<BaseIconInfo>, iconInfo: BaseIconInfo) {
    const record = {
      _id: (origin as unknown as { _id: string })._id,
      createdAt: origin.createdAt,
      ...iconInfo
    }
    await this.client.put(record, refreshPaths)
  }
}
