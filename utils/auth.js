const TokenKey = 'session_id';
const UserIdKey = 'moyu_userInfo';

// 认证令牌
export function getToken() {
	return uni.getStorageSync(TokenKey)
}

export function setToken(token) {
	console.log(token, 'token')
	return uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
	return uni.removeStorageSync(TokenKey)
}

// 认证令牌
export function getUserInfo() {
	return uni.getStorageSync(UserIdKey)
}

export function setUserInfo(userInfo) {
	return uni.setStorageSync(UserIdKey, userInfo)
}

export function removeUserInfo() {
	return uni.removeStorageSync(UserIdKey)
}