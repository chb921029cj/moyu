/**
 * 单一状态树
 * vuex 操作顺序：state.js -> mutations-type.js -> mutations.js -> getters.js
 */
const state = {
	// 用户信息，是否登录等 theme
	sessionId: '',
}

export default state