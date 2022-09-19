<template>
	<view class="chb-fab flex flex-direction align-center">
		<view v-if="isShows">
			<view v-for="(item, index) in content" :key="index"
				class="chb-fab-item flex flex-direction align-center margin-bottom-xs">
				<template v-if="item.icon!=='service'">
					<view class="chb-fab__item--content  bg-black  shadow flex flex-direction align-center"
						:class="{'chb-fab__item--active':isShow}" @click="onItemClick(index, item)">
						<text class="icon margin-top-xs" :class="'cuIcon-' + item.icon"> </text>
						<text class="name text-xs">{{ item.text }}</text>
					</view>
				</template>
				<template v-else>
					<view class="chb-fab__item--content  bg-black  shadow flex flex-direction align-center"
						:class="{'chb-fab__item--active':isShow}" @click="onItemClick(index, item)">
						<!-- <text class="icon margin-top-xs" :class="'cuIcon-' + item.icon"> </text> -->
						<button class="cu-btn cuIcon shadow shadow-lg bg-black flex flex-direction margin-top-xs "
							type="default" open-type="contact" style="background-color: #333333;">
							<text class="cuIcon-service text-white"></text>
							<text class="name text-xs  text-white" style="margin-top:10rpx">{{ item.text }}</text>
						</button>
					</view>
				</template>
			</view>
		</view>

		<view class="chb-fab__close chb-fab-item flex flex-direction align-center bg-cyan shadow"
		style="z-index: 999;"
			:class="{'chb-fab__close--active': isShow}" @click="_onClick">
			<block v-if="!isShow">
				<text class="cuIcon-markfill icon margin-top-xs"> </text>
				<text class="name text-xs">咨询</text>
			</block>
			<block v-else>
				<text class="cuIcon-close icon "> </text>
			</block>
		</view>
		<view class="cu-modal weixin" :class="modalName=='weixin'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">名片</view>
					<view class="action" @click="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<swiper :indicator-dots="true" class="square-dot" :current="currentCard" style="height: 300rpx;"
						@change="changeTab">
						<swiper-item v-for="(item,index) in salesperson" :key="index">
							<view class="flex swiper-item bg-white padding-left">
								<image :src="item.img" mode="aspectFill"></image>
								<view class="flex flex-direction padding-left text-left">
									<text class="text-xl text-bold">{{item.label}}</text>
									<view class="margin-top-xs">
										<view class='cu-tag bg-red' v-for="(tag,indexTab) in item.tags" :key="indexTab">
											{{tag}}
										</view>
									</view>
									<text class="margin-top-xs text-sm">微信号：{{item.weixin}}</text>
									<text class="margin-top-xs text-sm">手机号：{{item.telePhone.phoneNumber}}</text>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @click="handleCopy">复制微信号</button>
						<button class="cu-btn line-green text-green margin-left" @click="handlePhone">添加联系人</button>
						<button class="cu-btn bg-green margin-left" open-type="share">分享</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal location" :class="modalName=='location'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">位置</view>
					<view class="action" @click="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view>
					<view class="page-body">
						<view class="page-section page-section-gap" style="min-height: 600rpx;">
							<map v-show="modalName=='location'" style="width: 680rpx; height: 600rpx;" scale="13"
								:latitude="latitude" :longitude="longitude" :markers="covers">
							</map>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @click="handleLocation">导航</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			salesperson: {
				type: Array,
				default: []
			},
			setting: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				modalName: '',
				content: [
					// {
					// 	text: '出售',
					// 	active: false,
					// 	icon: 'edit',
					// },
					{
						text: '咨询',
						active: false,
						icon: 'service',
					},
					{
						text: '电话',
						active: false,
						icon: 'dianhua',
					},
					{
						text: '微信',
						active: false,
						icon: 'weixin',
					},
					// {
					// 	text: '位置',
					// 	active: false,
					// 	icon: 'location',
					// }
				],
				isShow: false,
				isShows:false,
				currentCard: 0,
				id: 0, // 使用 marker点击事件 需要填写id
				latitude: 33.956608,
				longitude: 116.468278,
				covers: [{
					latitude: 33.956608,
					longitude: 116.468278,
					// iconPath: '/static/logo.png'
				}]
			}
		},
		methods: {
			changeTab(e) {
				this.currentCard = e.detail.current;
			},
			onItemClick(index, item) {
				let _this =this
				if (!this.isShow) {
					return
				}
				if (item.icon === 'dianhua') {
					uni.makePhoneCall({
						phoneNumber: String('18936588580'), //仅为示例
						success: function() {
							console.log('success');
						},
						fail(e) {
							console.log(e)
						}
					});
				} else if (item.icon === 'edit') {
					uni.showToast({
						title: '尽请期待',
						duration: 2000
					});
				} else if(item.icon === 'weixin'){
						uni.setClipboardData({
							data: 'sun898975',
							success: function() {
								uni.showToast({
									title: '微信号已复制',
									duration: 2000
								});
							}
						});
				}else {
					this.modalName = item.icon
				}
			},
			_onClick() {
				this.isShows = !this.isShows
				setTimeout(()=>{
					this.isShow = !this.isShow
				})
			},
			hideModal() {
				this.modalName = ""
			},
			handleCopy() {
				let _this = this
				uni.setClipboardData({
					data: this.salesperson[this.currentCard].weixin,
					success: function() {
						uni.showToast({
							title: '微信号已复制',
							duration: 2000
						});
					}
				});
			},
			handlePhone() {
				uni.addPhoneContact({
					nickName: this.salesperson[this.currentCard].label,
					firstName: this.salesperson[this.currentCard].label,
					mobilePhoneNumber: this.salesperson[this.currentCard].telePhone.phoneNumber,
					weChatNumber: this.salesperson[this.currentCard].weixin,
					success: function() {
						console.log('success');
					},
					fail: function(e) {
						console.log(e)
						console.log('fail');
					}
				});
			},
			handleLocation() {
				let _this = this
				uni.openLocation({
					latitude: 32.013195,
					longitude: 119.562075,
					name: _this.setting.label,
					address: _this.setting.location,
					success: function() {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chb-fab {
		position: fixed;
		right: 10rpx;
		bottom: 210rpx;
		z-index: 999;
		.chb-fab-item {
			position: relative;
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;

			.icon {
				font-size: 30rpx;
			}
		}

		// .chb-fab__item {
		// 	opacity: 0;
		// 	transition: all 0.3s;
		// 	width: 0;
		// 	height: 0;
		// }



		.chb-fab__close {
			z-index: 999;
			transform: rotate(0deg);
			transition: transform 0.3s;
		}

		.chb-fab__close--active {
			transform: rotate(270deg);

			.cuIcon-close {
				font-size: 40rpx;
				line-height: 80rpx;
			}
		}

		.chb-fab__item--content {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			animation: change 5s;
			opacity: 0;
			transition: all 0.3s;
			width: 0;
			height: 0;
			border-radius: 50%;
		}

		.chb-fab__item--active {
			width: 80rpx;
			height: 80rpx;
			opacity: 1;
			z-index: 999;
		}

		.weixin {
			.swiper-item {
				image {
					width: 300rpx;
					height: 300rpx;
					border-radius: 16rpx;
				}
			}
		}
	}
</style>
