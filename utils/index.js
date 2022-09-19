let _debounceTimeout = null,
	_throttleRunning = false

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const debounce = (fn, delay = 500) => {
	clearTimeout(_debounceTimeout);
	_debounceTimeout = setTimeout(() => {
		fn();
	}, delay);
}
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const throttle = (fn, delay = 500) => {
	console.log(fn)
	if (_throttleRunning) {
		return;
	}
	_throttleRunning = true;
	fn();
	setTimeout(() => {
		_throttleRunning = false;
	}, delay);
}
/**
 * toast
 */
export const msg = (title = '', param = {}) => {
	if (!title) return;
	uni.showToast({
		title,
		duration: param.duration || 1500,
		mask: param.mask || false,
		icon: param.icon || 'none'
	});
}
/**
 * 检查登录
 * @return {Boolean}
 */
export const isLogin = (options = {}) => {
	const userInfo = uni.getStorageSync('userInfo');
	if (userInfo) {
		return true;
	}
	if (options.nav !== false) {
		uni.navigateTo({
			url: '/pages/oyyl-index/login'
		})
	}
	return false;
}
/**
 * 深克隆
 */
export const deepClone = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}


export const formatParams = (params) => {
	let encodeURIComponentKey = ['carNumber1']
	let str = ''
	let arr = []
	console.log('params', params)
	for (let key in params) {
		if (encodeURIComponentKey.includes(key)) {
			arr.push(`${key}=${encodeURIComponent(params[key])}`)
		} else {
			arr.push(`${key}=${params[key]}`)
		}
	}
	console.log(arr)
	str = arr.join('&')
	if (arr.length) {
		return '?' + str
	} else {
		return ''
	}
}
