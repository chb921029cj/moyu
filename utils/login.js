import {
	setUserInfo,
	getUserInfo
} from './auth'
import {
	getOpenid
} from '@/api/user';
export function wxLogin() {
	let _this = this
	return new Promise(async (resolve) => {
		//判断是否存在信息
		let userInfo = getUserInfo()
		//判断是否存在当前用户
		if (userInfo && userInfo.openId) {
			resolve('ok')
		} else {
			//微信登录 获取临时code
			uni.getUserProfile({
				desc: '登录',
				success: (loginRes) => {
					// uni.login({
					// 	provider: 'weixin',
					// 	success: function(loginRes) {
					console.log('loginRes', loginRes)
					let userInfo = loginRes.userInfo
					// 判断是否已授权
					uni.getSetting({
						async success(res) {
							console.log("授权：", res);
							if (!res.authSetting['scope.userInfo']) {
								//这里调用授权
								resolve('authSetting')
							} else {
								//用户已经授权过了
								uni.login({
									provider: 'weixin',
									success: async (res) => {
										console.log("当前已授权");
										//判断已授权调取接口并获取openId 
										let result = await getOpenid({
											js_code: res.code
										})
										Object.assign(userInfo,{
											openId:result.openid
										})
										setUserInfo(userInfo);
										resolve('ok')
									},
									fail: e => {
										_this.title = e
									}
								})

							}
						},
						fail: function(res) {
							console.log(res)
							resolve('error')
						}
					})
				}
			});
		}
	})
}
