<template>
	<view class="my  flex flex-direction" :class="[show?'show':'']">
		<cu-custom bgColor="bg-white" :isBack="true" class="custom">
			<block slot="backText">
				<view class="text-bold">个人中心</view>
			</block>
		</cu-custom>
		<view class="my-content" :style="{paddingTop:CustomBar+'px'}">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="flex bg-black padding shadow" style="height: 300rpx;">
				</view>
				<view class="bg-white me-detail shadow shadow-blur">
					<image :src="user.avatarUrl?user.avatarUrl:'../../static/3.png'" mode="widthFix"
						style="width: 200rpx;position: relative;" class="cu-avatar round">
					</image>
					<!-- <view v-if="user.gender" class=" badge  gender" :class="user.gender==2?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view> -->
					<view class="detail flex flex-direction align-center">
						<view class="text-df"><button class="cu-btn round  shadow "
								:class="[user.nickName?'line-blue':'bg-brown']"
								@tap="loginTest()">{{user.nickName?user.nickName:"授权登录"}}</button>
						</view>
						<view class="margin-top-xs" v-if="user.phone"><button
								class="cu-btn round line-blue shadow">{{user.phone}}</button>
						</view>
					</view>
				</view>
				<view style="position: relative;top:-50rpx">
					<view class="cu-list menu list">
						<view class="cu-item arrow" @click="handleCollection">
							<view class="content">
								<text class="text-grey">我的收藏</text>
							</view>
						</view>
					</view>
					<view class="cu-list menu list">
						<view class="cu-item arrow" @tap="showModal" data-target="DialogModal1">
							<view class="content">
								<text class="text-grey">我的后台</text>
							</view>
						</view>
					</view>
					<view class="cu-list menu list">
						<view class="cu-item arrow" @tap="uploads" data-target="DialogModal1">
							<view class="content">
								<text class="text-grey">上传商品</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">后台管理系统</view>
				</view>
				<view class="padding-xl">
					<form>
						<view class="cu-form-group margin-top">
							<view class="title">用户名</view>
							<input placeholder="请输入用户名" v-model="loginName" name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">密码</view>
							<input placeholder="请输入密码" v-model="loginPass" name="input"></input>
						</view>
					</form>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideConfirm">确定</button>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		base64ToPath
	} from '@/utils/image-tools'

	import {
		upng
	} from '@/utils/upng.js'
	import {
		getOpenid,
		login,
		qiniuyun
	} from '@/api/user';
	import {
		wxLogin
	} from '@/utils/login.js'
	import {
		chooseImage
	} from '@/utils/upload.js'
	import {
		getUserInfo,
		getToken
	} from '@/utils/auth.js'
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
				user: {
					avatarUrl: '',
					nickName: '',
					gender: 1,
					phone: ''
				},
				code: '',
				promotion: [],
				CustomBar: this.CustomBar,
				modalName: null,
				loginName: '',
				loginPass: '',
				tempFilePaths: [],
				materialList: []
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
		created() {
			console.log('base64ToPath', base64ToPath)
			this.user = getUserInfo()
		},
		methods: {
			uploads() {
				if (getToken()) {
					uni.navigateTo({
						url: '/pages/form/index'
					})
				} else {
					uni.showToast({
						title: '请登录',
						icon: 'none'
					})
				}
				// this.chooseImage()

			},
			chooseImage() {
				let that = this
				uni.chooseImage({
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					count: 9, //默认9
					success: (rem) => {
						that.tempFilePaths = rem.tempFilePaths;
						that.weixin_img(0, rem)
					}
				})
			},
			weixin_img(num, rem) {
				let that = this
				console.log(1111111111, rem)
				uni.getImageInfo({ //获取这个图片 图片压缩
					src: rem.tempFiles[num].path, //需要获取的图片 图片选择不用我说了吧
					success: function(res) {
						console.log('uni.getImageInfo', res)
						var ctx = uni.createCanvasContext('attendCanvasId', that); //使用一个canvas
						// console.log(ctx)
						var canvasWidth = res.width //原图宽度 
						var canvasHeight = res.height; //原图高度
						var ratio = 2;
						console.log(canvasWidth, canvasHeight)
						// 保证宽高均在200以内
						while (canvasWidth > 200 || canvasHeight > 200) {
							//比例取整
							canvasWidth = Math.trunc(res.width / ratio)
							canvasHeight = Math.trunc(res.height / ratio)
							ratio++;
						}
						//绘制新图
						ctx.fillRect(0, 0, 300, 150)
						ctx.drawImage(rem.tempFiles[num].path, 0, 0, canvasWidth, canvasHeight)
						// ctx.draw()
						// Create linear gradient
						ctx.draw(false, () => {
							//获取图像数据， API 1.9.0
							uni.canvasGetImageData({
								canvasId: 'attendCanvasId',
								x: 0,
								y: 0,
								width: canvasWidth,
								height: canvasHeight,
								success: (res) => {
									console.log(res)
									let platform = uni.getSystemInfoSync().platform
									if (platform == 'ios') {
										// 兼容处理：ios获取的图片上下颠倒
										res = that.reverseImgData(res)
									}
									// 3. png编码
									let pngData = upng.encode([res.data.buffer],
										canvasWidth, canvasHeight)
									// 4. base64编码
									let base64 = uni.arrayBufferToBase64(pngData)
									// console.log('1111','data:image/jpeg;base64,'+base64)
									rem.tempFiles[num].Base64_Path =
										'data:image/jpeg;base64,' + base64
									that.materialList = that.materialList.concat(rem
										.tempFiles[num]);
									console.log('end', that.materialList)
									that.putb64('data:image/jpeg;base64,' + base64)
									//利用递归循环来实现多张图片压缩
									if (num == rem.tempFiles.length - 1) {
										return
									} else {
										that.weixin_img(num + 1, rem)
									}
									console.log('end', that.materialList)
								}
							}, that)
						})
					},
				})
			},
			// 兼容处理：ios获取的图片上下颠倒
			reverseImgData(res) {
				var w = res.width
				var h = res.height
				let con = 0
				for (var i = 0; i < h / 2; i++) {
					for (var j = 0; j < w * 4; j++) {
						con = res.data[i * w * 4 + j]
						res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j]
						res.data[(h - i - 1) * w * 4 + j] = con
					}
				}
				return res
			},
			handleCollection() {
				this.$emit('handleCollection')
				console.log(111111111)
			},
			handleJiangpin() {
				uni.navigateTo({
					url: "../jiangpin/jiangpin"
				})
			},
			handleChoujiang() {
				uni.navigateTo({
					url: "../choujiang/choujiang"
				})
			},
			handlePromation(promotion) {
				uni.navigateTo({
					url: '/pages/promotion/promotion?promotion=' + encodeURIComponent(JSON.stringify(promotion))
				})
			},
			initData() {
				let _this = this
				uniCloud.callFunction({
					name: 'promotion_api',
					data: {},
					success: (e => {
						console.log(e)
						_this.promotion = e.result.data.records
					})
				})
			},
			handleRouter(router) {
				console.log(1111)
				uni.navigateTo({
					url: '../share/share'
				})
			},
			loginTest() { // 获取用户信息
				let _this = this;
				if (this.user.nickName) {
					return
				}
				uni.showModal({
					title: '温馨提示',
					content: '亲，授权微信登录后才能正常使用小程序功能',
					async success(res) {
						//如果用户点击了确定按钮
						if (res.confirm) {
							uni.showLoading({
								title: '登录中'
							});
							let result = await wxLogin()
							console.log(result, getUserInfo())
							_this.user = getUserInfo()
							uni.hideLoading()
						}
					}
				})


			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			async hideConfirm() {
				let params = {
					loginName: this.loginName,
					loginPass: this.loginPass
				}
				let result = await login(params)
				if (result && result.data) {
					this.$store.commit('SET_SESSIONID', result.data)
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
					this.hideModal()
				} else {
					uni.showToast({
						title: '账户密码错误',
						icon: 'none'
					})
				}
			},
			// 点击上传图片
			upload() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ["compressed"], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ["album", "camera"], //从相册选择
					success: async function(res) {
						uni.showLoading({
							title: "",
							mask: true
						})
						let result = await qiniuyun()
						console.log(result)
						let img = res.tempFilePaths[0]; //拿到里面的
						//下面的key是自己拿时间戳和随机数组成的key值
						let key = new Date().getTime();
						uni.uploadFile({
							url: "https://up-z2.qiniup.com", //华东地区上传
							filePath: img,
							name: 'file',
							method: "POST",
							formData: {
								'key': key, //key值
								'token': result //七牛云token值
							},
							success: uploadFileRes => {
								//uploadFileRes 返回了data是一个json字符串 
								//拿到里面的key拼接上域名，再反出去就ok了
								// let strToObj = JSON.parse(uploadFileRes.data),
								// 	backUrl = 自己的域名 + strToObj.key;
								// data.success(backUrl); //反出去链接
								uni.hideLoading();
							},
							fail: fail => {
								uni.showToast({
									title: "网络错误",
									icon: "none"
								});
								data.fail(fail); //反出去错误信息
								uni.hideLoading();
							}
						})

					},
				});
			},

			// 删除图片
			del(index) {
				this.imgList.splice(index, 1);
				console.log(this.imgList);
			},
			async putb64(pic) {
				let result = await qiniuyun()
				let filePath = await base64ToPath(pic)
				//下面的key是自己拿时间戳和随机数组成的key值
				console.log('base64ToPath(pic)', filePath)
				let key = new Date().getTime();
				uni.uploadFile({
					url: "https://up-z2.qiniup.com", //华东地区上传
					filePath: filePath,
					name: 'file',
					method: "POST",
					formData: {
						'key': key, //key值
						'token': result //七牛云token值
					},
					success: uploadFileRes => {
						//uploadFileRes 返回了data是一个json字符串 
						//拿到里面的key拼接上域名，再反出去就ok了
						// let strToObj = JSON.parse(uploadFileRes.data),
						// 	backUrl = 自己的域名 + strToObj.key;
						// data.success(backUrl); //反出去链接
						console.log(uploadFileRes)
						uni.hideLoading();
					},
					fail: fail => {
						console.log(fail)
						uni.showToast({
							title: "网络错误",
							icon: "none"
						});
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my {
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

		@keyframes rote {
			from {
				transform: rotateZ(0);
			}

			to {
				transform: rotateZ(360deg);
			}
		}

		.my-content {
			position: fixed;
			z-index: 1024;
			width: 750rpx;
			height: 90%;
			top: 0;
			overflow: hidden;
			background: #FEFEFE;

			.me-detail {
				box-sizing: border-box;
				position: relative;
				width: 600rpx;
				margin: 0 auto;
				top: -100rpx;
				background: #FEFEFE;
				padding: 35rpx;
				box-sizing: border-box;
				box-shadow: 0rpx 2rpx 5rpx #EDEDED;
				border-radius: 16rpx;

				image {
					position: absolute;
					top: -100rpx;
					left: 165rpx;
				}

				.gender {
					position: absolute;
					width: 48rpx;
					border-radius: 50%;
					font-size: 48rpx;
					right: 165rpx;
					top: -50rpx;
				}

				.detail {
					// margin-top: 120rpx;
				}

			}

			.list {
				.content {
					display: flex;
					align-items: center;
				}
			}

			.action-item {
				width: 375rpx;
				display: inline-block;
				padding: 0 20rpx;

				image {
					width: 335rpx;
					height: 188rpx;
					border-radius: 16rpx;
				}
			}
		}

		.canvas {
			width: 100%;
			height: 700rpx;
		}
	}
</style>
