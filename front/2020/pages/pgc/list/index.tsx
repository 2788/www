/**
 * @file list entry
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { ContentType } from 'constants/pgc/content'
import { getListUrl } from 'components/pgc/content/url'
import Redirect from 'components/Redirect'

export default function List() {
  return (
    <Redirect target={getListUrl(ContentType.Article, null)} keepQuery={false} />
  )
}
