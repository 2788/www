/**
 * @file 官网主站相关
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import { UnknownClientException } from 'qn-fe-core/client'

import { wwwSourceHost } from 'constants/env'
import { startsWithPath } from 'utils/url'

import { getRefreshErrorMessage } from '.'

@injectable()
export default class WwwApis {
  async sourceTest(paths: string[]): Promise<void> {
    const testMap = new Map<string, Promise<void>>()

    paths.forEach(path => {
      if (startsWithPath(path, '/developer')) {
        throw new UnknownClientException(
          undefined, undefined, undefined, getRefreshErrorMessage('未上线，无服务地址')
        )
      }

      if (startsWithPath(path, '/qfans')) {
        if (!testMap.has('qfans')) {
          testMap.set(
            'qfans',
            window.fetch(`${wwwSourceHost}/qfans`)
              .then(response => {
                if (response.status !== 200 && response.status !== 404) { // TODO: qfans 无固定页… 后续优化
                  throw response
                }
              })
              .catch(err => {
                throw new UnknownClientException(
                  err, undefined, undefined, getRefreshErrorMessage('无法访问 qfans 的源站服务器')
                )
              })
          )
        }

        return
      }

      // 主站
      if (!testMap.has('www')) {
        testMap.set(
          'www',
          // 直接用首页检测
          window.fetch(wwwSourceHost)
            .then(response => {
              if (response.status !== 200) {
                throw response
              }
            })
            .catch(err => {
              throw new UnknownClientException(
                err, undefined, undefined, getRefreshErrorMessage('无法访问 www 主站的源站服务器')
              )
            })
        )
      }
    })

    await Promise.all([...testMap.values()])
  }

  async getContent(url: string): Promise<number | string> {
    const response = await window.fetch(url)

    if (response.status !== 200) {
      return response.status
    }

    return response.text()
  }

  async getPathsFromSitemap() {
    try {
      const response = await window.fetch(`${wwwSourceHost}/sitemap.xml`)
      if (response.status !== 200) {
        throw response
      }
      const docBody = await response.text()

      const xmlBody = getXmlBody(docBody)
      const parser = new DOMParser()
      const doc = parser.parseFromString(xmlBody, 'text/xml')
      const locEleList = Array.from(doc.getElementsByTagName('loc'))
      const urls = locEleList.map(locEle => locEle.textContent!.trim())
      const paths = urls.map(url => '/' + url.split('/').slice(3).join('/'))
      return paths
    } catch (err: unknown) {
      throw new UnknownClientException(
        err, undefined, undefined, getRefreshErrorMessage('获取/解析 sitemap.xml 失败')
      )
    }
  }
}

function getXmlBody(xmlDocText: string): string {
  const docDeclareSuffix = '?>'
  return xmlDocText.slice(xmlDocText.indexOf(docDeclareSuffix) + docDeclareSuffix.length)
}
