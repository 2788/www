/**
 * @file sensors
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { isDev } from 'constants/env'

// HACK: 安全小后门
const shouldEnableSensorsInDebugMode = document.cookie.includes('debug_sensors')

export const shouldEnableSensors = !isDev || shouldEnableSensorsInDebugMode

export const shouldEnableSensorsDebugMode = isDev || shouldEnableSensorsInDebugMode
