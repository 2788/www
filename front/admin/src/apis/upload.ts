import { injectable } from 'qn-fe-core/di'
import FetchStore from 'stores/fetch'

const uploadToken = '/api/tools/upload-token'

@injectable()
export default class UploadApis {

  constructor(private fetchStore: FetchStore) { }

  genToken(options: { putPolicy: string }) {
    return this.fetchStore.get(uploadToken, options)
  }
}
