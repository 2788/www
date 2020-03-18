import commonMessageMap from './common'
import mainMessageMap from './main'
import userMessageMap from './user'

export {
  commonMessageMap,
  mainMessageMap,
  userMessageMap
}

export default {
  ...commonMessageMap,
  ...mainMessageMap,
  ...userMessageMap
}
