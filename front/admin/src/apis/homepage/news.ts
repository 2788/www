import { injectable } from 'qn-fe-core/di'
import moment from 'moment'
import FetchStore from 'stores/fetch'
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

  constructor(private fetchStore: FetchStore) { }

  add(options: INews): Promise<void> {
    options = { ...options, editTime: moment().unix() }
    return this.fetchStore.postJSON(apiMongo + '/www-homepage-news', { ...options, link: blogUrl + options.articleId })
  }

  update(options: INews, id: string): Promise<void> {
    options = { ...options, editTime: moment().unix() }
    return this.fetchStore.putJSON(apiMongo + '/www-homepage-news/' + id, { ...options, link: blogUrl + options.articleId })
  }

  delete(id: string): Promise<void> {
    return this.fetchStore.delete(apiMongo + '/www-homepage-news/' + id)
  }

  list(): Promise<INewsWithId[]> {
    return this.fetchStore.get(apiMongo + '/www-homepage-news', { sort: 'order' }).then(res => res.data || [])
  }

  getArchive(id: string): Promise<IArchive> {
    return this.fetchStore.get(apiBlog + '/internal/archives/' + id)
  }
}
