<template>
	<view class="my-collection  flex flex-direction" :class="[show?'show':'']">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="left">
				<view class="box">
					<view class="cu-bar ">
						<view class="action sub-title">
							<text class="text-xl text-bold text-white">我的收藏</text>
							<text class="text-ABC text-orange">perfect</text>
						</view>
					</view>
				</view>
			</block>
		</cu-custom>
		<scroll-view scroll-y="true" class="bg-white bscroll" @scrolltolower="scrolltolower" refresher-enabled="true"
			:refresher-triggered="triggered" :refresher-threshold="100" refresher-background="lightblue"
			@refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			@refresherabort="onAbort">
			<view class="padding-left padding-right padding-bottom-sm" :class="index===0?'padding-top-sm':''" v-for="(item,index) in goodList" :key="index">
				<good-list :goods="item"></good-list>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from '@/utils/auth.js'
	import goodList from '../goodList.vue'
	import {
		GetList
	} from '@/api/user';
	export default {
		props: {
			show: {
				type: Boolean,
				default: true
			},
			scrollY: {
				type: Number,
				default: 0
			},
			scrollBottom: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				openId: '',
				hasMore: true,
				goodList: [],
				current: 0,
				triggered: false,
				loading: false
			}
		},
		components: {
			goodList
		},
		watch: {
			show(value) {
				if (value) {
					let userInfo = getUserInfo()
					console.log('userInfo', userInfo)
					if (userInfo && userInfo.openId) {
						this.openId = userInfo.openId
						this.onRefresh()
					} else {
						uni.showToast({
							title: '请登录',
							icon: 'none'
						})
					}
				}

			},
			scrollY() {
				//通知他妈的滚动了。
				this.setPageScroll(this.scrollY);
			},
			scrollBottom() {
				if (this.scrollBottom != 0) {
					//通知他妈的触底了
					this.setReachBottom();
				}
			},
		},
		methods: {
			async initData(type = false) {
				if (type) {
					this.goodList = []
					this.current = 0
					this.hasMore = true
				}
				if (!this.hasMore || this.loading) {
					return
				}
				this.loading = true
				uni.showLoading({
					title: '加载中'
				});
				this.current++
				let params = {
					current: this.current,
					size: 10,
					vOpenId: this.openId
				}
				let result = await GetList(params)
				console.log(result)
				if (result && result.code === '000000' && result.data && result.data.records && result.data.records
					.length) {
					let goods = result.data.records
					goods.forEach(item => {
						try {
							item.vQuF = JSON.parse(item.vQuF)
						} catch (e) {
							//TODO handle the exception
						}
					})
					if (result.data.records.length < 10) {
						this.hasMore = false
					}
					this.goodList = this.goodList.concat(goods)

				} else {
					this.hasMore = false
				}
				this.loading = false
				// if (type) {
				this.triggered = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
					uni.hideLoading()
				}, 500)

				// }
			},
			//上啦加载
			scrolltolower() {
				this.initData()
			},
			onPulling(e) {
				console.log("onpulling", e);
			},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				console.log('ccc')
				this.initData(true)

			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
			}
		},
		activated() {

		},
		created() {
			// this._freshing = false;
			// setTimeout(() => {
			// 	this.triggered = true;
			// }, 1000)
			let userInfo = getUserInfo()
			console.log('userInfo', userInfo)
			if (userInfo && userInfo.openId) {
				this.openId = userInfo.openId
				this.initData()
			} else {
				uni.showToast({
					title: '请登录',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-collection {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		display: none;

		&.show {
			display: flex;
			padding-bottom: 100rpx;
		}

		.bscroll {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
