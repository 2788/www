/*
 * @file basic boot behavior
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { configure } from 'mobx'
import { setConfig } from 'react-hot-loader'

import fetchStore from 'portal-base/common/stores/fetch'
import storageStore from 'portal-base/common/stores/storage'
import routerStore from 'portal-base/common/stores/router'

import commonErrorCodeMap from '../constants/error-code-messages'

import userErrorCodeMap from 'portal-base/user/constants/error-code-messages'
import exceptionStore from 'portal-base/common/stores/exception'
import history from './history'
import * as moment from 'moment'
import 'moment/locale/zh-cn'

export default function boot() {

  configure({ enforceActions: 'observed' })

  setConfig({
    showReactDomPatchNotification: false
  })

  moment.locale('zh-cn')

  exceptionStore.registerApiErrorCodeMessages(commonErrorCodeMap, userErrorCodeMap)

  fetchStore.bindRealFetch(window.fetch)
  storageStore.bindRealStorage(window.localStorage)

  routerStore.fetchBasenameMap()
  routerStore.bindHistory(history)
  routerStore.bindRealLocation(window.location)
  routerStore.bindDocument(window.document)
}
