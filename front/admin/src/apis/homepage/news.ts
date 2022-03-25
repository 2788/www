import moment from 'moment'
import { injectable } from 'qn-fe-core/di'
import { BaseClient } from 'admin-base/common/apis/base'

import { apiMongo, apiBlog } from 'constants/api-prefix'

export interface INews {
  order: number
  articleId: string
  title: string
  summary: string
  banner: string
  link: string
  editTime: number // 资讯记录修改时间
  createTime: string // 博客文章的创建时间
}

export interface INewsWithId extends INews {
  _id: string
}

export interface IArchive {
  id: number
  created_at: string
  title: string
  summary: string
  cover: string
}

const blogUrl = 'https://blog.qiniu.com/archives/'

@injectable()
export default class NewsApis {

  constructor(private client: BaseClient) { }

  add(options: INews): Promise<void> {
    options = { ...options, editTime: moment().unix() }
    return this.client.post(apiMongo + '/www-homepage-news', { ...options, link: blogUrl + options.articleId })
  }

  update(options: INews, id: string): Promise<void> {
    options = { ...options, editTime: moment().unix() }
    return this.client.put(apiMongo + '/www-homepage-news/' + id, { ...options, link: blogUrl + options.articleId })
  }

  delete(id: string): Promise<void> {
    return this.client.delete(apiMongo + '/www-homepage-news/' + id)
  }

  list(): Promise<INewsWithId[]> {
    return this.client.get<any>(apiMongo + '/www-homepage-news', { sort: 'order' }).then(res => res.data || [])
  }

  getArchive(id: string): Promise<IArchive> {
    return this.client.get(apiBlog + '/internal/archives/' + id)
  }
}
