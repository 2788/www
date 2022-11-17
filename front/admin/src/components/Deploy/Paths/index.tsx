/**
 * @file 辅助参考路径列表
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect } from 'react'

import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'
import { Collapse, CollapsePanel, RadioGroup, Radio } from 'react-icecream'

import { wwwHost, wwwSourceHost } from 'constants/env'
import { basePaths, indexPath, kodo404Path, sitemapPaths, externalSitePaths } from 'constants/deploy/refresh'
import WwwApis from 'apis/refresh/www'

import style from './style.m.less'

const specialPaths = [indexPath, kodo404Path, ...sitemapPaths].sort()

function PathItem({ host, path }: { host: string, path: string }) {
  return (
    <li>
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a href={host + path} target="_blank">{path === indexPath ? '首页' : path}</a>
    </li>
  )
}

export default function PathsDashboard() {
  const toasterStore = useInjection(ToasterStore)
  const wwwApis = useInjection(WwwApis)

  const [allPaths, setAllPaths] = useState<string[]>([])
  const [currentHost, setCurrentHost] = useState<string>(wwwHost)

  useEffect(() => {
    toasterStore.promise(wwwApis.getPathsFromSitemap().then(paths => { setAllPaths(paths) }))
  }, [toasterStore, wwwApis])

  return (
    <div className={style.wrapper}>
      <h4>参考列表</h4>
      <RadioGroup value={currentHost} onChange={host => { setCurrentHost(host) }}>
        <Radio key="target" value={wwwHost}>{wwwHost}</Radio>
        <Radio key="source" value={wwwSourceHost}>{wwwSourceHost}</Radio>
      </RadioGroup>
      <Collapse>
        <CollapsePanel title="主站普通一级路径" value="base">
          <ol>
            {basePaths.map(path => (
              <PathItem key={path} host={currentHost} path={path} />
            ))}
          </ol>
        </CollapsePanel>
        <CollapsePanel title="主站特殊路径（不包括 public 里的静态文件）" value="special">
          <ol>
            {specialPaths.map(path => (
              <PathItem key={path} host={currentHost} path={path} />
            ))}
          </ol>
        </CollapsePanel>
        <CollapsePanel title="分站路径" value="external">
          <ol>
            {externalSitePaths.map(path => (
              <PathItem key={path} host={currentHost} path={path} />
            ))}
          </ol>
        </CollapsePanel>
        <CollapsePanel title="主站主要路径（不包括首页和特殊路径）" value="sitemap">
          <ol>
            {allPaths.map(path => (
              <PathItem key={path} host={currentHost} path={path} />
            ))}
          </ol>
        </CollapsePanel>
      </Collapse>
    </div>
  )
}
