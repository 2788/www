/**
 * @file router utils
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// pick from https://github.com/qbox/portal-base/blob/master/common/stores/router.ts

import { reaction } from 'mobx'
import ReactGA, { InitializeOptions } from 'react-ga'
import sensors from 'sa-sdk-javascript'
import { RouterStore } from 'qn-fe-core/router'

import { isDev as isDevEnv } from 'constants/env'

// magic number，用于避免嵌套 Route 时，路由匹配过程中 routes 短时频繁变化导致冗余触发 pageview 事件的情况
// 「短时频繁变化」是因为在路由跳转时，<Route> 组件的 `unregisterRoute` 和 `registerRoute` 操作会在短时间内相继触发
const debounceTime = 60

function reactionPageChange(routerStore: RouterStore, fn: (pathName: string) => void) {
  // 响应路由的变化，发送一次 pageview 记录
  return reaction(
    () => routerStore.routes[routerStore.routes.length - 1],
    lastRoute => {
      if (!lastRoute || lastRoute.path == null) { return }
      // 防止因为Layout动态加载侧边栏等组件延迟子路由的加载，导致pageview被调用两次
      if (!lastRoute.title) { return }

      const pattern = lastRoute.pattern
      if (pattern == null) {
        console.error('missing router pattern')
        return
      }

      const pathName = pattern.replace(
        /\/:[A-Za-z0-9_]+/g,
        match => `/<${match.slice(2).toUpperCase()}>`
      )

      fn(pathName)
    },
    {
      fireImmediately: true,
      delay: debounceTime
    }
  )
}

export function bindGA(routerStore: RouterStore, trackingId: string, options?: InitializeOptions) {
  // 仅不在本地测试环境统计
  if (isDevEnv) {
    return () => null
  }

  // 用提供的配置信息初始化 GA
  ReactGA.initialize(trackingId, options)

  // 优先使用 Route 指定的 title，若为 undefined，则 GA 会默认使用 document.title
  return reactionPageChange(routerStore, pathnameForGA => {
    ReactGA.pageview(pathnameForGA, undefined, routerStore.routeTitle || undefined)
  })
}

export function bindSensors(routerStore: RouterStore, project = 'default', isDev = false) {
  // 初始化神策埋点
  // 本地研发环境支持埋点自测，测试环境用于产品验证，生产环境用于用户数据统计，可根据域名进行筛选
  sensors.init({
    heatmap_url: 'https://static.sensorsdata.cn/sdk/1.15.1/heatmap.min.js',
    // 本地研发环境展示埋点日志便于调试，测试和生产环境埋点日志隐藏
    show_log: isDev,
    name: 'sensors',
    server_url: `https://sensors.qiniu.com/sa?project=${project}`,
    heatmap: {
      // 是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
      // 需要 Web JS SDK 版本号大于 1.7
      clickmap: 'default',
      // 是否开启触达注意力图，默认 not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启
      // 需要 Web JS SDK 版本号大于 1.9.1
      scroll_notice_map: 'default'
    }
  })

  return reactionPageChange(routerStore, pathnameForSensor => {
    sensors.quick('autoTrackSinglePage', {
      $title: routerStore.routeTitle,
      $url_path: pathnameForSensor
    })
  })
}
