import {
	getToken,
	removeToken,
	getUserId,
	removeUserId
} from '@/utils/auth';
import {
	msg
} from '@/utils/index.js'
import config from '@/utils/config';

function service(options = {}) {
	options.url = `${config.baseUrl}${options.url}`;
	// 判断本地是否存在token，如果存在则带上请求头
	let params = {
		'content-type': 'application/json',
	}
	if (getToken()) {

		Object.assign(params, {
			'session_id': `${getToken()}` // 这里是token(可自行修改)
				,
			'Authorization': `${getToken()}`
		})

	}
	options.header = params
	return new Promise((resolved, rejected) => {
		options.success = (res) => {
			// 如果请求回来的状态码不是200则执行以下操作
			console.log('如果请求回来的状态码不是', res, res.data.res)
			resolved(res.data)
		};
		options.fail = (err) => {
			// 请求失败弹窗
			uni.showToast({
				icon: 'none',
				duration: 3000,
				title: '服务器错误,请稍后再试'
			});
			rejected(err);
		};
		uni.request(options);
	});
}

export default service;
