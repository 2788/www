/**
 * @file 内容站首页 banner
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { FilterProps, SortProps } from 'apis/admin'

export interface Banner extends FilterProps, SortProps {
  name: string
  img: string
  link: string
}

export const articlesCount = 20
export const videosMinCount = 3
export const videosMaxCount = 5
