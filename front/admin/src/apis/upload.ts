import { injectable } from 'qn-fe-core/di'
import { BaseClient } from 'admin-base/common/apis/base'

const uploadToken = '/api/tools/upload-token'

@injectable()
export default class UploadApis {

  constructor(private client: BaseClient) { }

  genToken(options: { putPolicy: string }) {
    return this.client.get<string>(uploadToken, options)
  }
}
