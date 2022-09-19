<template>
	<view class="homeIndex  flex flex-direction bg-white" :class="[show?'show':'']">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="left">
				<view class="box">
					<view class="cu-bar ">
						<view class="action sub-title">
							<text class="text-xl text-bold text-orange">剑心魔域</text>
							<text class="text-ABC text-orange">perfect</text>
						</view>
					</view>
				</view>
			</block>
		</cu-custom>
		<scroll-view scroll-y="true" class="bg-white bscroll">
			<view class="flex flex-direction padding">
				<!-- 轮播图 -->
				<swiper class="screen-swiper square-dot margin-top" :indicator-dots="true" :circular="true"
					:autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="item.vUrl" mode="aspectFill" v-if="item.type=='image'" class=" banner-image">
						</image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
							objectFit="cover" v-if="item.type=='video'"></video>
					</swiper-item>
				</swiper>
				<!--  基础模板 公告 -->
				<view class="advance">
					<lwNotice :showScale="true" @itemClick="itemClick" :list="advanceListTwo"></lwNotice>
				</view>
				<!-- 好物推荐 -->
				<block v-if="goodsTuiJ&&goodsTuiJ.length">
				<view class="title text-bold text-black">
					精品推荐
					<!-- 		<view class="cu-bar  bg-white">
						<view class="action sub-title">
							<text class="text-xl text-bold text-green">精品推荐</text>
							<text class="bg-green" style="width:2rem"></text>
							<!-- last-child选择器-->
					<!-- 	</view>
					</view> -->
				</view>
				<!-- 轮播图 -->
				<swiper class="screen-swiper  margin-top" :indicator-dots="false" :circular="true" :autoplay="true"
					interval="5000" duration="500">
					<swiper-item v-for="(item,index) in goodsTuiJ" :key="index" class="radius shadow-warp bg-white"
						style="box-sizing: content-box;">
						<good-list :goods="item" :solid="false" :swiper="true"></good-list>
					</swiper-item>
				</swiper>	
				</block>

				<!-- 				<view class="box">
					<view class="cu-bar  bg-white">
						<view class="action sub-title">
							<text class="text-xl text-bold text-green">最新上架</text>
							<text class="bg-green" style="width:2rem"></text>
						</vi
					</view>
				</view> -->

				<view class="title text-bold text-black ">
					<image src="../../static/new.png" mode="aspectFill" class=" banner-image margin-right-xs">
					</image>
					最新上架
				</view>
				<view class="padding-top">
					<view class="padding-bottom" v-for="(item,index) in goods" :key="index">
						<good-list :goods="item"></good-list>
					</view>
				</view>
				<view class="title text-bold text-black">
					降价
				</view>
				<view class="padding-top">
					<view class="padding-bottom" v-for="(item,index) in sellGoods" :key="index">
						<good-list :goods="item" :sell="true"></good-list>
					</view>
				</view>
				<view class="title text-bold text-black margin-top flex align-center">
					<image src="../../static/hot.png" mode="aspectFill" class=" banner-image margin-right-xs">
					</image>
					热门
				</view>
				<view class="padding-top">
					<view class="padding-bottom" v-for="(item,index) in hotGoods" :key="index">
						<good-list :goods="item"></good-list>
					</view>
				</view>
			</view>
		</scroll-view>
		<chb-fab></chb-fab>
	</view>
</template>

<script>
	import chbFab from '@/components/chb-fab/chb-fab'
	import goodList from '../goodList.vue'
	import {
		getBanner,
		GetList
	} from '@/api/user';
	// 引入组件
	import lwNotice from '../lw-notice/lw-notice.vue'
	export default {
		components: {
			lwNotice,
			goodList,
			chbFab
		},
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
				goodsTuiJ: [],
				goods: [],
				hotGoods: [],
				sellGoods:[],
				cardCur: 0,
				advanceListTwo: [
					"剑心微信：1号客服sun898975",
					"剑心微信：2号客服sun898976",
					"有问题请先联系客服",
				],
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
			}
		},
		watch: {
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
			itemClick() {},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// 获取推荐物品
			async getisTuiJ() {
				let params = {
					nTuiJ: 1,
					current: 1,
					nStates: 2,
					size: 10
				}
				let result = await GetList(params)
				if (result && result.code === '000000' && result.data && result.data.records && result.data.records
					.length) {
					this.goodsTuiJ = result.data.records
					this.goodsTuiJ.forEach(item => {
						try {
							item.vQuF = JSON.parse(item.vQuF)
						} catch (e) {
							//TODO handle the exception
						}
					})
				}
			},
			async getGoods() {
				let params = {
					current: 1,
					size: 5,
					nStates: 2
				}
				let result = await GetList(params)
				if (result && result.code === '000000' && result.data && result.data.records && result.data.records
					.length) {
					this.goods = result.data.records
					this.goods.forEach(item => {
						try {
							item.vQuF = JSON.parse(item.vQuF)
						} catch (e) {
							//TODO handle the exception
						}
					})
				}
			},
			async getHotGoods() {
				let params = {
					current: 1,
					size: 3,
					nStates: 2,
					order_by: 'N_LIU_L'
				}
				let result = await GetList(params)
				if (result && result.code === '000000' && result.data && result.data.records && result.data.records
					.length) {
					this.hotGoods = result.data.records
					this.hotGoods.forEach(item => {
						try {
							item.vQuF = JSON.parse(item.vQuF)
						} catch (e) {
							//TODO handle the exception
						}
					})
				}
			},
			async getSellGoods() {
				let params = {
					current: 1,
					size: 5,
					nStates: 2,
					order_by:'N_PRICE_O-N_PRICE_N'
				}
				let result = await GetList(params)
				if (result && result.code === '000000' && result.data && result.data.records && result.data.records
					.length) {
					this.sellGoods = result.data.records
					this.sellGoods.forEach(item => {
						try {
							item.vQuF = JSON.parse(item.vQuF)
						} catch (e) {
							//TODO handle the exception
						}
					})
				}
			},
			//获取banner图
			async getBanners() {
				let params = {
					current: 1,
					size: 10
				}
				let result = await getBanner(params)
				if (result && result.code === '000000' && result.data && result.data.records && result.data.records
					.length) {
					this.swiperList = result.data.records
					this.swiperList.forEach(item => {
						item.type = 'image'
					})
				}
			}
		},
		created() {
			uni.showLoading({
				title: '加载中'
			});
			Promise.all([this.getBanners(),
				this.getisTuiJ(),
				this.getGoods(),
				this.getHotGoods(),
				this.getSellGoods()
			]).then(() => {
				uni.hideLoading()
			})

		}
	}
</script>

<style lang="scss" scoped>
	.homeIndex {
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

		.banner-image {
			border-radius: 32rpx;
		}

		.title {
			font-size: 32rpx;

			image {
				width: 32rpx;
				height: 32rpx
			}
		}

		.hot-topic-scroll-box {
			position: relative;
			width: 100%;

			.hot-topic-scroll {
				// position: relative;
				// height: 499.99rpx;
				// white-space: nowrap;
				width: 100%;
				display: flex;
				flex-direction: row;

				.hot-topic-scroll-item {
					display: inline-block;
					height: 100%;
					width: 80%;
				}
			}

			.zaiui-right-shadow-box {
				position: absolute;
				width: 118.18rpx;
				top: 0;
				bottom: 0;
				right: 0;
				box-shadow: inset -63.63rpx 0 127.27rpx 0 rgba(255, 255, 255, 0.95);
				pointer-events: none;
			}
		}
	}
</style>
