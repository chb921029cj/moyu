// 根级别的 action
// 封装复杂的 mutations

import * as types from './mutations-type.js'

// 更新SessionId
export const setSessionId = function ({commit}, SessionId) {
  commit(types.SET_SESSIONID, SessionId)
}

