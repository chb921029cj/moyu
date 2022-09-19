// 根级别的 mutation

import * as types from './mutations-type.js'
import {
	setToken,
} from '@/utils/auth';

const mutations = {
	[types.SET_SESSIONID](state, sessionId) {
		setToken(sessionId)
		state.sessionId = sessionId
	},
}

export default mutations
