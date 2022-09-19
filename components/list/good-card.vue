<template>
	<view class="margin shadow flex flex-direction">
		<image :src="goods.vHead" mode="aspectFill"></image>
		<view class="flex-direction text-black text-sm">
			<view class="">
				<text class=""> 区服</text>
				<text class=""> {{goods.vQuF}}</text>
			</view>
			<view class="flex flex-direction">
				<view class="">
					<text class=""> 职业</text>
					<text class=""> {{goods.vZhiY}}</text>
				</view>
				<view class="">
					<text class="">神火</text>
					<text class=""> {{goods.nShenH}}</text>
				</view>
			</view>
			<view class="flex flex-direction">
				<view class="">
					<text class=""> 秒伤</text>
					<text class=""> {{goods.nMiaoS}}</text>
				</view>
				<view class="">
					<text class="">封魔</text>
					<text class=""> {{goods.nFengM}}</text>
				</view>
			</view>
			<view class="flex flex-direction">
				<view class="">
					<text class=""> 编号</text>
					<text class=""> {{goods.vId}}</text>
				</view>
				<view class="">
					<text class="">价格</text>
					<text class=""> {{goods.nPriceN}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goods: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
