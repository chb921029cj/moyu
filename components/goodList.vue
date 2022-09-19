<template>
	<view class="  flex-direction  goodList justify-start radius   padding-bottom-xs padding-left padding-right"
		:class="[solid?'solid':'']" @click="handleGood">
		<view class="flex align-center">
			<image :src="goods.vHead" :lazy-load="true" mode="aspectFill" class="image"></image>
			<view class="flex-direction text-black text-xs margin-left goodList-right">
				<view class=" margin-top ">
					<text class=""> 区服&nbsp;</text>
					<text class=" margin-left-xs"> {{goods.vQuF}}</text>
				</view>
				<view class="flex margin-top-sm margin-bottom-sm">
					<view class="flex-sub">
						<text class=""> 职业&nbsp;</text>
						<text class=" margin-left-xs"> {{goods.vZhiY||''}}</text>
					</view>
					<view class="flex-sub">
						<text class="">神火&nbsp;</text>
						<text class=" margin-left-xs text-red"> {{goods.nShenH||''}}</text>
					</view>
				</view>
				<view class="flex  margin-bottom-sm">
					<view class="flex-sub">
						<text class=""> 秒伤&nbsp;</text>
						<text class=" margin-left-xs text-red"> {{goods.nMiaoS||''}}亿</text>
					</view>
					<view class="flex-sub">
						<text class="">封魔&nbsp;</text>
						<text class=" margin-left-xs"> {{goods.nFengM||''}}</text>
					</view>
				</view>
				<view class="flex  margin-bottom-sm">
					<view class="flex-sub">
						<text class=""> 编号&nbsp;</text>
						<text class=" margin-left-xs"> {{goods.vId||''}}</text>
					</view>
					<view class="flex-sub">
						<text class="cuIcon-recharge margin-right-sm" ></text>	
						<text class="text-red margin-left-xs"> {{goods.nPriceN||''}}</text>
						<text class="cuIcon-down margin-left-sm text-red" v-if="sell"></text>	
					</view>
				</view>
			</view>
		</view>
		<view class="remark " v-if="goods.vMark1" :class="swiper?'swiper':''">
			{{goods.vMark1||''}}
		</view>
		<!-- <image src="../static/sell.png" v-if="sell" mode="aspectFill" class="sell"></image> -->
	</view>
</template>

<script>
	export default {
		props: {
			goods: {
				type: Object,
				default: () => {}
			},
			swiper: {
				type: Boolean,
				default: false
			},
			solid: {
				type: Boolean,
				default: true
			},
			sell: {
				type: Boolean,
				default: false
			},
		},
		methods: {
			handleGood() {
				uni.navigateTo({
					url: '/pages/good/goodDetail?good=' + encodeURIComponent(JSON.stringify(this.goods))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodList {
		position: relative;
		border-radius: 16rpx;
		align-items: flex-start;

		.image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 8rpx;
			flex-shrink: 0;
		}
		.sell{
			position:absolute;
			right:30rpx;
			top:30rpx;
			width: 200rpx;
			height: 200rpx;
		}
		.remark {
			font-size: 24rpx;
			min-height: 65rpx;

			&.swiper {
				white-space: normal;
				/* 文字三行以上显示省略号 */
				overflow: hidden;
				/*超出内容隐藏*/
				text-overflow: ellipsis;
				/*超出内容为省略号*/
				display: -webkit-box;
				/*内容不换行*/
				-webkit-line-clamp: 2;
				/*超出几行*/
				-webkit-box-orient: vertical;
				/*从上到下垂直排列子元素*/
				/*height: 100%;*/
			}
		}
	}
</style>
