import { activityNotificationTemplateAllowVars } from 'constants/activity'

export const smsMatchKeysValidator = (value: string) => {
  const keys = value.match(/\[\[([^[\]]+)\]\]/g)
  const isAllMatched = keys?.every(k => activityNotificationTemplateAllowVars.includes(k.slice(2, -2).trim()))
  if (!isAllMatched && !!keys?.length) {
    const allowVarsListString = activityNotificationTemplateAllowVars.map(k => `[[${k}]]`).join(', ')
    return `仅允许的keys：${allowVarsListString}，请检查输入！`
  }
}
