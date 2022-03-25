/**
 * @file 内容管理
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { Button, Dropdown, Menu, MenuItem } from 'react-icecream'
import { AddThinIcon } from 'react-icecream/icons'
import Link from 'admin-base/common/components/Link'

import { pgcManageAddTitle } from 'constants/route'
import { contentTypes, contentTypeTextMap } from 'constants/pgc/conetnt'
import { getAddPageUrl } from 'transforms/pgc/content'

import { usePgcList } from './list'

import style from './style.m.less'

export default function PgcManage() {
  const { isLoading, refresh, listView } = usePgcList()

  return (
    <div>
      <div className={style.panel}>
        <Button
          loading={isLoading}
          onClick={() => { refresh() }}
        >
          刷新
        </Button>
        <Dropdown
          overlay={
            <Menu>
              {contentTypes.map(contentType => (
                <MenuItem key={contentType}>
                  <Link
                    to={getAddPageUrl(contentType)}
                    // eslint-disable-next-line react/jsx-no-target-blank
                    target="_blank" // TODO: markdown 编辑器支持页面内新建 & 查找内容嵌入后移除
                    className={style.addEntry}
                  >
                    {contentTypeTextMap[contentType]}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          }
        >
          <Button icon={<AddThinIcon />}>{pgcManageAddTitle}</Button>
        </Dropdown>
      </div>
      {listView}
    </div>
  )
}
