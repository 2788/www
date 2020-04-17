/**
 * @file sensors apis
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import sensors from 'sa-sdk-javascript'

import { shouldEnableSensors } from 'constants/sensors'

@injectable()
export default class SensorsApis extends Store {
  login(uid: string) {
    if (!shouldEnableSensors) { return }
    sensors.login(uid)
  }

  track(eventName: string, options: any) {
    if (!shouldEnableSensors) { return }
    const { location: { href, pathname } } = window
    const { title = '' } = document
    const eventData: any = {
      $url: href,
      $url_path: pathname,
      $title: title,
      ...options
    }
    sensors.track(eventName, eventData)
  }
}
