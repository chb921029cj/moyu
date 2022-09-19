// 引用网络请求中间件
import request from '@/utils/request';
import {formatParams} from '@/utils'
/**
 *   登录
 */
export function login(params) {
	return request({
		url: '/login' + formatParams(params),
		method: 'GET',
	})
}

/**
 *   轮播图查询
 */
export function getBanner(params) {
	return request({
		url: '/pics/query' + formatParams(params),
		method: 'GET',
	})
}

/**
 * 商品查询
 * @param {} loginData 
 */
export function GetList(params) {
	return request({
		url: '/goods/query' + formatParams(params),
		method: 'GET',
	})
}
/**
 * 商品新增
 * @param {} loginData 
 */
export function updateList(js_code) {
	return request({
		url: '/goods/update',
		method: 'post',
		data:js_code
	})
}
export function addList(js_code) {
	return request({
		url: '/goods/add',
		method: 'post',
		data:js_code
	})
}
export function listMessF(loginData) {
	return request({
		url: '/open/listMessF' + formatParams(loginData),
		method: 'GET',
	})
}

export function getOpenid(js_code) {
	return request({
		url: '/coll/openid' + formatParams(js_code),
		method: 'GET',
	})
}
export function collAdd(js_code) {
	return request({
		url: '/coll/add',
		method: 'POST',
		data:js_code
	})
}
export function collDelete(js_code) {
	return request({
		url: '/coll/del',
		method: 'POST',
		data:js_code
	})
}
export function public_update(js_code) {
	return request({
		url: '/goods/public_update' + formatParams(js_code),
		method: 'GET',
	})
}
export function collQuery(js_code) {
	return request({
		url: '/coll/query' + formatParams(js_code),
		method: 'GET',
	})
}

//获取二维码参数
export function getBarCode(js_code) {
	return request({
		url: '/token/getBarCode' + formatParams(js_code),
		method: 'get',
	})
}
export function UpdateObj(js_code) {
	return request({
		url: '/goods/update',
		method: 'POST',
		data:js_code
	})
}
export function qiniuyun() {
	return request({
		url: '/token/get',
		method: 'get',
	})
}
