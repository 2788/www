/**
 * @file 解决方案配置
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'

import { WwwRefreshPath } from 'apis/base-client'
import {
  MongoApiStdClientPutOptions, MongoApiBaseClient, MongoApiStdClient, ListStdOptions, StdInfo, generateStdInfo
} from 'apis/mongo-api-client'
import { SolutionId, SolutionInfo as BaseSolutionInfo } from 'constants/solution'

const resource = 'www-solution'
const refreshPaths: WwwRefreshPath[] = ['/solutions']

export interface SolutionInfo extends BaseSolutionInfo, StdInfo {}

@injectable()
export default class SolutionApis {
  private client: MongoApiStdClient<BaseSolutionInfo>

  constructor(client: MongoApiBaseClient) {
    this.client = new MongoApiStdClient(resource, client)
  }

  async get(solutionId: SolutionId) {
    return this.client.get(solutionId)
  }

  async list(options: ListStdOptions) {
    return this.client.list({ sort: '+path', ...options })
  }

  async listAll() {
    return this.client.listAll({ sort: '+path' })
  }

  async delete(solutionId: SolutionId) {
    await this.client.delete(solutionId, refreshPaths)
  }

  async create(record: BaseSolutionInfo) {
    await this.client.post(record, refreshPaths)
  }

  async update(record: MongoApiStdClientPutOptions<BaseSolutionInfo>) {
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
