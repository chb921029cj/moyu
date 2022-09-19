<template>
	<view class="good-detail bg-gray">
		<cu-custom bgColor="bg-white" :isBack="true" :share="share">
			<block slot="backText">账户详情</block>
		</cu-custom>
		<scroll-view scroll-y="true" class=" bscroll">
			<view class=" ">
				<view class="remark text padding bg-white" v-if="good.vMark1">
					{{good.vMark1}}
				</view>
				<view class="padding-left padding-right bg-white flex text-sm align-center justify-end padding-bottom">
					<view>
						<text class="margin-right-xs">上架时间</text>
						<text>{{good.dCTime}}</text>
					</view>
					<view class="margin-left">
						<text class="cuIcon-attention margin-right-xs"></text>
						<text>{{good.nLiuL}}</text>
					</view>
				</view>
				<view class="cu-list menu sm-border  margin-top ">

					<view class="cu-item">
						<view class="content text-sm">
							<text class="cuIcon-moneybag text-red text-sm"></text>
							<text class="text-grey text-sm text-sm"></text>
							<text class="text-red margin-left text-sm text-sm">{{good.nPriceN}}</text>
						</view>
					</view>
					<view class="cu-item" v-if="good.nPriceO">
						<view class="content text-sm">
							<text class="cuIcon-moneybag text-black text-sm"></text>
							<text class="text-grey text-sm text-sm">&nbsp;</text>
							<text class="text-black margin-left text-sm text-sm" style="text-decoration:line-through" >{{good.nPriceO}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-vipcard text-green"></text>
							<text class="text-grey text-sm text-sm">编号</text>
							<text class="text-black margin-left text-sm text-sm ">{{good.vId}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-vipcard text-green"></text>
							<text class="text-grey text-sm">区服</text>
							<text class="text-black margin-left text-sm">{{good.vQuF}}</text>
							
						</view>
					</view>
					<view class="cu-item" v-if="good.vMark2">
						<view class="content">
							<text class="cuIcon-vipcard text-green"></text>
							<text class="text-grey text-sm">服务器状态</text>
							<!-- <text class="text-black margin-left text-sm">{{good.vQuF}}</text> -->
							<view class='cu-tag radius sm margin-left' :class="good.vMark2==='红线'?'bg-red':good.vMark2==='黄线'?'bg-yellow':'bg-green'" style="width: 100rpx;"></view>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-vipcard text-green"></text>
							<text class="text-grey text-sm">职业</text>
							<text class="text-black margin-left text-sm">{{good.vZhiY}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-vipcard text-green"></text>
							<text class="text-grey text-sm">战斗力</text>
							<text class="text-red margin-left text-sm">{{good.vZhuangB}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-vipcard text-green"></text>
							<text class="text-grey text-sm">属性</text>
							<text class="text-red margin-left text-sm">{{good.vShuX}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-vipcard text-green"></text>
							<text class="text-grey text-sm">神火</text>
							<text class="text-red margin-left text-sm">{{good.nShenH}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-vipcard text-green"></text>
							<text class="text-grey text-sm">秒伤</text>
							<text class="text-red margin-left text-sm" v-if="good.nMiaoS">{{good.nMiaoS}}亿</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-vipcard text-green"></text>
							<text class="text-grey text-sm">封魔</text>
							<text class="text-black margin-left text-sm">{{good.nFengM}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-vipcard text-green"></text>
							<text class="text-grey text-sm">名人堂</text>
							<text class="text-black margin-left text-sm">{{good.vMingRT}}</text>
						</view>
					</view>
		
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-vipcard text-green"></text>
							<text class="text-grey text-sm">性别</text>
							<text class="text-black margin-left text-sm">{{good.vXingB}}</text>
						</view>
					</view>
				</view>
				<template v-if="good.vPics&&good.vPics.length">
					<view class="margin-top margin-bottom">
						<view class="bg-white padding text-center text-gray">
							——— <text class="margin-left margin-right text-black">图文详情</text> ———
						</view>
						<image v-for="(img,index) in good.vPics" :lazy-load="true" :key="img" :src="img" mode="widthFix"
							style="width:100%" @click="previewImage(index)">
						</image>
					</view>
				</template>
			</view>
		</scroll-view>
		<chb-share :goods="good"></chb-share>
	</view>
</template>

<script>
	import chbShare from '@/components/chb-share/chb-share.vue'
	import {
		public_update,
		GetList
	} from '@/api/user';
	export default {
		onShareTimeline(res) {
			let path = "/pages/good/goodDetail?good=" + encodeURIComponent(JSON.stringify(this.good)) + '&share=1'
			return {
				title: '编号' + this.good.vId + " " + this.good.vMark1,
				path,
				imageUrl: this.good.vHead,
				desc: this.good.vMark1,
				// content: this.share.content,
				success(res) {
					uni.showToast({
						title: '分享成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					})
				}
			}
		},
		onShareAppMessage(res) {
			let path = "/pages/good/goodDetail?good=" + encodeURIComponent(JSON.stringify(this.good)) + '&share=1'
			return {
				title: '编号' + this.good.vId + " " + this.good.vMark1,
				path,
				imageUrl: this.good.vHead,
				desc: this.good.vMark1,
				// content: this.share.content,
				success(res) {
					uni.showToast({
						title: '分享成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					})
				}
			}
		},
		data() {
			return {
				share: false,
				good: {},
				store: null,
				wxImg: null,
				id: null
			}
		},
		components: {
			chbShare
		},
		async onLoad(option) {
			this.good = option.good ? JSON.parse(decodeURIComponent(option.good)) : null;
			this.id = option.id ? JSON.parse(decodeURIComponent(option.id)) : null;
			if (this.id) {
				this.share = true
				let params = {
					id: this.id,
					current: 1,
					size: 10
				}
				uni.showLoading({
					title: '加载中'
				});
				let result = await GetList(params)
				if (result && result.code === '000000' && result.data && result.data.records && result.data.records
					.length) {
					this.good = result.data.records[0]
					try {
						this.good.vQuF = JSON.parse(this.good)
					} catch (e) {
						//TODO handle the exception
					}
					try {
						this.good.vPics = JSON.parse(this.good.vPics)
						console.log(this.good.vPics)
					} catch (e) {
						console.log(e)
						//TODO handle the exception
					}
					uni.hideLoading()
				}
			} else {
				if (option.share) {
					this.share = true
				}
				// if (option.goodId) {
				// 	this.share = true
				// } else {

				// }
				try {
					this.good.vPics = JSON.parse(this.good.vPics)
					console.log(this.good.vPics)
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			}
			public_update({
				nLiuL: 1,
				id: this.good.id
			})
		},
		methods: {
			previewImage(current) {
				// 预览图片
				uni.previewImage({
					current: current,
					urls: this.good.vPics,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}

		},
	}
</script>

<style lang="scss" scoped>
	.good-detail {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		overflow: hidden;
		padding-bottom: 200rpx;

		.bscroll {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
