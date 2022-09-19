<template>
	<view class="chb-fab flex flex-direction align-center">
		<view>
			<view v-for="(item, index) in content" :key="index"
				class="chb-fab-item flex flex-direction align-center margin-bottom-xs">

				<template v-if="item.icon==='forwardfill'">
					<view class="chb-fab__item--content   bg-white   shadow flex flex-direction align-center"
						:class="{'chb-fab__item--active':isShow}">
						<button class="cu-btn cuIcon   bg-white  flex flex-direction margin-top-xs " type="default"
							open-type="share">
							<text class="icon cuIcon-forwardfill text-red"></text>
							<text class="name text-xs  text-black" style="margin-top:10rpx">{{ item.text }}</text>
						</button>
					</view>
				</template>
				<view v-else class="chb-fab__item--content bg-white  shadow flex flex-direction align-center"
					:class="{'chb-fab__item--active':isShow}" @click="onItemClick(index, item)">
					<text class="text-red icon margin-top-xs" :class="'cuIcon-' + item.icon"> </text>
					<!-- <text class="name text-xs  text-white" style="margin-top:10rpx">{{ item.text }}</text> -->
					<text class="name text-xs">{{ item.text }}</text>
				</view>
			</view>
		</view>
		<!-- 		<view class="zixun   justify-around ">
			<view class="flex flex-direction align-center" @click="handleHb">
				<button class="cu-btn cuIcon shadow bg-white">
					<text class="cuIcon-down text-black"></text>
				</button>
			</view>
			<view class="flex flex-direction align-center marin-top ">
				<button class="cu-btn cuIcon shadow bg-white" open-type="share">
					<text class="cuIcon-forwardfill text-black"></text>
				</button>
			</view>
		</view> -->
		<xlcanvas v-if="showCanvas" :param="param" @fail="fail" @success="success">
		</xlcanvas>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">删除商品</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					是否删除商品
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn line-green text-green margin-left" @tap="hideConfirm">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		collAdd,
		collDelete,
		collQuery,
		getBarCode,
		UpdateObj,
		updateList
	} from '@/api/user.js'
	import {
		getUserInfo,
		getToken
	} from '@/utils/auth.js'
	import xlcanvas from '../canvas/index.vue'
	import {
		posParam,
	} from './param.js'
	export default {
		components: {
			xlcanvas
		},
		onShareTimeline(res) {
			let path = "/pages/good/goodDetail?good=" + encodeURIComponent(JSON.stringify(this.goods)) + '&share=1'
			return {
				title: '编号' + this.goods.vId + " " + this.goods.vMark1,
				path,
				imageUrl: this.goods.vHead,
				desc: this.goods.vMark1,
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
			let path = "/pages/good/goodDetail?good=" + encodeURIComponent(JSON.stringify(this.goods)) + '&share=1'
			return {
				title: '编号' + this.goods.vId + " " + this.goods.vMark1,
				path,
				imageUrl: this.goods.vHead,
				desc: this.goods.vMark1,
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
		props: {
			salesperson: {
				type: Array,
				default: []
			},
			setting: {
				type: Object,
				default: {}
			},
			goods: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				QrSrc: '',
				msg: '测试',
				showCanvas: false,
				isZixun: false,
				isShare: false,
				canvasImg: null,
				title: 'Hello',
				isReady: false,
				height: 1334,
				param: {},
				path: "",
				isActive: false,
				modalName: '',
				content: [{
						text: '分享',
						active: false,
						icon: 'forwardfill',
					},
					{
						text: '点赞',
						active: false,
						icon: 'like',
					}, {
						text: '下载',
						active: false,
						icon: 'down',
					}
				],
				isShow: true,
			}
		},
		methods: {
			changeTab(e) {
				this.currentCard = e.detail.current;
			},
			async onItemClick(index, item) {
				let _this = this
				if (item.icon === 'like') {
					let userInfo = getUserInfo()
					if (userInfo && userInfo.openId) {
						let params = {
							vId: _this.goods.vId,
							vOpenId: userInfo.openId,
							vGoodsId: _this.goods.id,
							nStates: 1
						}
						await collAdd(params)
						this.content[1].icon = 'likefill'
						this.$forceUpdate()
					} else {
						uni.showToast({
							title: '请登录',
							icon: 'none'
						})
					}

				} else if (item.icon === 'likefill') {
					let userInfo = getUserInfo()
					if (userInfo && userInfo.openId) {
						let params = {
							vId: _this.goods.vId,
							vOpenId: userInfo.openId,
							vGoodsId: _this.goods.id,
							nStates: 1
						}
						await collDelete(params)
						this.content[1].icon = 'like'
						this.$forceUpdate()
					} else {

					}
				} else if (item.icon === 'down') {
					this.handleHb()
				} else if (item.icon === 'repeal') {
					let params = {
						id: this.goods.id,
						nStates: 1,
					}
					try {

						let result = await UpdateObj(params)
						console.log(result)
						if (result && result.code === "000000") {
							uni.showToast({
								title: '下架成功',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '下架失败 请重新登录再试 或联系管理员',
								icon: 'none'
							})
						}

					} catch (e) {
						uni.showToast({
							title: '下架失败',
							icon: 'none'
						})
						//TODO handle the exception
					}
				} else if (item.icon === 'edit') {
					uni.navigateTo({
						url: '/pages/form/index?good=' + encodeURIComponent(JSON.stringify(this.goods))
					})
				} else if (item.icon === 'delete') {
					this.modalName = 'DialogModal1'
				}
			},
			_onClick() {
				this.isShows = !this.isShows
				setTimeout(() => {
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
			getBase64(buffer) {
				let file = new Blob([buffer])
				return new Promise((resolve, reject) => {
					let reader = new FileReader();
					let imgResult = "";
					reader.readAsDataURL(file);
					reader.onload = function() {
						imgResult = reader.result;
					};
					reader.onerror = function(error) {
						reject(error);
					};
					reader.onloadend = function() {
						resolve(imgResult);
					};
				});
			},
			saveImageToPhotosAlbummaskData(maskData, FILE_BASE_NAME = 'tmp_base64src') {
				return new Promise(resolve => {
					let base64 = maskData.replace(/^data:image\/\w+;BASE64,/, ""); //去掉data:image/png;base64,
					let filePath = wx.env.USER_DATA_PATH + `/hym_pay${FILE_BASE_NAME}_qrcode.png`;
					uni.getFileSystemManager().writeFile({
						filePath: filePath, //创建一个临时文件名
						data: base64, //写入的文本或二进制数据
						encoding: 'base64', //写入当前文件的字符编码
						success: res => {
							uni.saveImageToPhotosAlbum({
								filePath: filePath,
								success: function(res2) {
									// uni.showToast({
									// 	title: '保存成功，请从相册选择再分享',
									// 	icon: "none",
									// 	duration: 5000
									// })
									resolve(filePath)
								},
								fail: function(err) {
									// console.log(err.errMsg);
								}
							})
						},
						fail: err => {
							//console.log(err)
						}
					})
				})

			},
			async handleHb() {
				let _this = this
				uni.showLoading({
					title: '生成中...'
				});
				this.param = posParam;
				let result = await getBarCode({
					path: 'pages/good/goodDetail?id=' + this.goods.id,
					width: '200'
				})
				let imgsrc = await this.saveImageToPhotosAlbummaskData(result)
				uni.getImageInfo({
					src: _this.goods.vHead,
					success: function(image) {
						try {
							console.log(image.width);
							console.log(image.height);
							let rem = image.height / image.width
							let len = 0
							if (_this.goods.vMark1) {
								len = Math.ceil(_this.goods.vMark1.length / 27)
							}
							_this.param = {
								width: 375,
								height: 355 * rem + 5 + 30 * (len + 2) + 150,
								paths: {
									rect: [{
										x: 0,
										y: 0,
										w: 375,
										h: 355 * rem + 250,
										// r: 12,
										type: "fill",
										color: "#ffffff"
									}]
								},
								pics: [
									// {
									// 	x: 0,
									// 	y: 0,
									// 	w: 355,
									// 	h: 285,
									// 	src: "https://chblive.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210904104536.jpg"
									// },
									{
										x: 10,
										y: 20,
										w: 355,
										h: 355 * rem,
										// preload: true,
										src: _this.goods.vHead
									},
									// {
									// 	x: 0,
									// 	y: 355 * rem + 100,
									// 	w: 375,
									// 	h: 364,
									// 	src: 'https://chblive.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210904102722.jpg'
									// },
									// {
									// 	x: 117.5 - 30,
									// 	y: 355 * rem + 150,
									// 	w: 200,
									// 	h: 200,
									// 	r: 70,
									// 	src:  _this.goods.vId
									// }
									// {
									// 	x: 117.5 - 30,
									// 	y: 355 * rem + 150,
									// 	w: 200,
									// 	h: 200,
									// 	r: 70,
									// 	src: _this.QrSrc
									// }
									{
										x: 235 - 20,
										y: 355 * rem + 30 * (len + 1),
										w: 140,
										h: 140,
										r: 0,
										src: imgsrc
									}
								],
								texts: [{
										x: 10,
										y: 355 * rem + 15 + 30 * (len + 1) - 16,
										font: 12,
										color: "#8799a3",
										text: "区服:" + _this.goods.vQuF
									},
									{
										x: 10,
										y: 355 * rem + 15 + 30 * (len + 1) + 5,
										font: 12,
										weight: 'bold',
										color: "#000",
										text: "编号:" + _this.goods.vId
									},
									{
										x: 10,
										y: 355 * rem + 15 + 30 * (len + 2) - 5,
										font: 16,
										color: "red",
										text: "价格:" + _this.goods.nPriceN
									},
									{
										x: 10,
										y: 355 * rem + 15 + 30 * (len + 2) + 20,
										font: 12,
										color: "#8799a3",
										text: "神火:" + _this.goods.nShenH
									},
									{
										x: 10,
										y: 355 * rem + 15 + 30 * (len + 2) + 40,
										font: 12,
										color: "#8799a3",
										text: "秒伤:" + _this.goods.nMiaoS
									},

									{
										x: 10,
										y: 355 * rem + 15 + 30 * (len + 2) +
											60,
										font: 12,
										weight: 'bold',
										color: "#8799a3",
										text: "剑心代售"
									},
									{
										x: 10,
										y: 355 * rem + 15 + 30 * (len + 2) +
											80,
										font: 12,
										color: "#8799a3",
										text: "微信号：sun898975 / sun898976"
									},
									// {
									// 	x: 270,
									// 	y: 355 * rem + 15 + 30 * (len + 1) + 100 ,
									// 	width: 80,
									// 	font: 10,
									// 	color: "#333",
									// 	align: 'center',
									// 	text: "长按识别二维码"
									// },
									// {
									// 	x: 280,
									// 	y: 355 * rem + 15 + 30 * (len + 1) + 75,
									// 	font: 6,
									// 	align: "center",
									// 	color: "#333",
									// 	text: "查看全部精彩照片"
									// }
								]
								// texts: [{
								// 		x: 10,
								// 		y: 355 *rem +60,
								// 		w: 160,
								// 		font: 20,
								// 		// align: "center",
								// 		color: "black",
								// 		text: _this.Title,
								// 	},
								// 	{
								// 		x: 10,
								// 		y: 355 *rem +90,
								// 		font: 12,
								// 		weight:'bold',
								// 		color: "#000",
								// 		text: "年度最佳口碑商户"
								// 	},
								// 	{
								// 		x: 10,
								// 		y: 355 *rem +120,
								// 		font: 12,
								// 		color: "#000",
								// 		text: "小众品牌专属定制"
								// 	},
								// 	{
								// 		x: 10,
								// 		y:355 *rem +180,
								// 		font: 12,
								// 		weight:'bold',
								// 		color: "#8799a3",
								// 		text: "名匠摄影推荐给您"
								// 	},
								// 	{
								// 		x: 10,
								// 		y: 355 *rem +200,
								// 		font: 12,
								// 		color: "#8799a3",
								// 		text: "电话：0370——5888680/18639058707"
								// 	},
								// 	{
								// 		x: 10,
								// 		y: 355 *rem +220,
								// 		font: 12,
								// 		color: "#8799a3",
								// 		text: "地址：亿丰广场西门三楼名匠摄影"
								// 	},
								// 	{
								// 		x: 270,
								// 		y: 355 *rem +200,
								// 		width:80,
								// 		font: 10,
								// 		color: "#333",
								// 		align:'center',
								// 		text: "长按识别二维码"
								// 	},
								// 	{
								// 		x: 265,
								// 		y: 355 *rem +215,
								// 		font: 10,
								// 		     align: "center",
								// 		color: "#333",
								// 		text: "查看全部精彩照片"
								// 	}
								// ]
							}
							for (let i = 0; i < len; i++) {
								_this.param.texts.push({
									x: 10,
									y: 355 * rem + 10 + 30 * (i + 1),
									w: 375,
									font: 13,
									align: "left",
									color: "#8799a3",
									text: _this.goods.vMark1.slice(i * 27, (i +
										1) * 27),
								})
							}
							_this.isReady = true;

							_this.showCanvas = true
							console.log(2222222)
							// uni.showLoading({
							// 	title: '图片生成中',
							// })
						} catch (e) {
							//TODO handle the exception
							console.log('err', e)
						}

					},
					fail(err) {
						_this.msg = JSON.stringify(err)
						uni.showLoading({
							title: err,
						})
					}
				});
				// 	uni.request({
				// 		url: 'http://gbt.free.idcfengye.com/wxmoyu/token/getBarCode?path=page/index/index&width=400',
				// 		method: 'get',
				// 		header: {
				// 			'Content-Type': 'application/json',
				// 			token: uni.getStorageSync("TOKEN")
				// 		},
				// 		data: {},
				// 		success: res => {
				// 			console.log(res);
				// 			this.$emit('imgsrc', 'data:image/jpeg;base64,' + res.data)

				// 		},
				// 		fail: () => {},
				// 		complete: () => {}
				// 	});

				// let base64 = this.getBase64(result)
				// let imgsrc = await this.base64ToSave('data:image/png;base64,' + result)
				// //把arraybuffer转成base64
				//           let base64 = wx.arrayBufferToBase64(result); 

				//           //不加上这串字符，在页面无法显示的哦
				//           base64　= 'data:image/jpeg;base64,' + base64　

				//           //打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
				//           console.log(base64)

				this.imgsrc = result




			},
			getCode() {

			},
			base64ToSave(base64data, FILE_BASE_NAME = 'tmp_base64src') {
				const fsm = uni.getFileSystemManager();
				return new Promise((resolve, reject) => {
					const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
					if (!format) {
						reject(new Error('ERROR_BASE64SRC_PARSE'));
					}
					const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
					const buffer = wx.base64ToArrayBuffer(bodyData);
					fsm.writeFile({
						filePath,
						data: buffer,
						encoding: 'binary',
						success() {
							resolve(filePath);
						},
						fail() {
							reject(new Error('ERROR_BASE64SRC_WRITE'));
						},
					});
				});
			},
			base64ToSave(base64data, FILE_BASE_NAME = 'tmp_base64src') {

				return new Promise(resolve => {
					var save = wx.getFileSystemManager();
					var number = Math.random();
					const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
					if (!format) {
						reject(new Error('ERROR_BASE64SRC_PARSE'));
					}
					const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
					const buffer = wx.base64ToArrayBuffer(bodyData);
					save.writeFile({
						filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
						data: buffer,
						encoding: 'binary',
						success: res => {
							wx.saveImageToPhotosAlbum({
								filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
								success: function(res) {
									resolve(wx.env.USER_DATA_PATH + '/pic' + number +
										'.png');
									wx.showToast({
										title: '保存成功',
									})
								},
								fail: function(err) {
									console.log(err)
								}
							})
							console.log(res)
						},
						fail: err => {
							console.log(err)
						}
					})
				})

				// const fsm = uni.getFileSystemManager();
				// return new Promise((resolve, reject) => {
				// 	const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
				// 	if (!format) {
				// 		reject(new Error('ERROR_BASE64SRC_PARSE'));
				// 	}
				// 	const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
				// 	const buffer = wx.base64ToArrayBuffer(bodyData);
				// 	fsm.writeFile({
				// 		filePath,
				// 		data: buffer,
				// 		encoding: 'binary',
				// 		success() {
				// 			resolve(filePath);
				// 		},
				// 		fail() {
				// 			reject(new Error('ERROR_BASE64SRC_WRITE'));
				// 		},
				// 	});
				// });
			},
			handleSuccess(e) {
				let _this = this
				uni.hideLoading()
				this.canvasImg = e.tempFilePath
				uni.saveImageToPhotosAlbum({
					filePath: _this.canvasImg,
					success: function() {
						console.log('save success');
						// 预览图片
						uni.previewImage({
							urls: [_this.canvasImg],
							current: 0,
							success() {
								uni.showToast({
									title: '海报已经保存到相册',
									duration: 2000
								});
								_this.showCanvas = false
							}
						});
					},
					fail(e) {
						console.log(222222222222)
						uni.hideLoading()
						/* 授权提示 ，这里就是重复提示用户去授权*/
						function opensit() {
							uni.showModal({
								content: '由于您还没有允许保存图片到您相册里,这无法进行分享操作点击确定去允许授权',
								success: function(res) {
									if (res.confirm) {
										/* 这个就是打开设置的API*/
										uni.openSetting({
											success(res) {
												console.log(res.authSetting);
											}
										});
									} else if (res.cancel) {
										uni.showModal({
											cancelText: '依然取消',
											confirmText: '重新授权',
											content: '很遗憾你点击了取消，这将无法进行分享操作，请慎重考虑',
											success: function(res) {
												if (res.confirm) {
													uni.openSetting({
														success(res) {
															console.log(res
																.authSetting
															);
														}
													});
												} else if (res.cancel) {
													console.log('用户不授权');
												}
											}
										});
									}
								}
							});
						}
						/* 特别注意要先获取图片信息在进行保存，不让保存不了 */
						// function img() {
						// 	/* 我这里要保存多张图片，一张的话就可以取消这些，具体看你的需求 */
						// 	if (num > len) {
						// 		return false;
						// 	}
						// 	/* 获取图片信息 */
						// 	uni.getImageInfo({
						// 		src: obj[num],
						// 		success: function(image) {
						// 			console.log(image);
						// 			/* 保存图片到相册 */
						// 			uni.saveImageToPhotosAlbum({
						// 				filePath: image.path,
						// 				success: function() {
						// 					console.log('save success');
						// 					if (num == len) {
						// 						uni.showModal({
						// 							title: '保存成功',
						// 							content: '图片已成功保存到相册，快去分享到您的圈子吧',
						// 							showCancel: false
						// 						});
						// 					}
						// 				},
						// 				complete(res) {
						// 					console.log(res);
						// 				}
						// 			});
						// 		}
						// 	});
						// 	num++;
						// 	img();
						// }
						uni.authorize({
							/* 这个就是保存相册的 */
							scope: 'scope.writePhotosAlbum',
							success() {
								/* 保存图片方法 */
								img();
							},
							complete(res) {
								console.log(res);
								/* 这里判断一下如果没有授权重新打开设置选项 */
								uni.getSetting({
									success(res) {
										if (!res.authSetting['scope.writePhotosAlbum']) {
											/* 打开设置的方法 */
											opensit();
										}
									}
								});
							}
						});
						console.log(e)
					}
				});
			},
			fail(e) {
				console.log("合成失败：", e);
			},
			success(e) {
				let _this = this

				this.path = e.res.tempFilePath;
				uni.saveImageToPhotosAlbum({
					filePath: e.res.tempFilePath,
					success: function() {
						console.log('save success');
						// 预览图片
						uni.previewImage({
							urls: [e.res.tempFilePath],
							current: 0,
							success() {
								uni.showToast({
									title: '海报已经保存到相册',
									duration: 2000
								});
								_this.showCanvas = false
							}
						});
					},
					fail(e) {
						console.log(222222222222)
						uni.hideLoading()
						/* 授权提示 ，这里就是重复提示用户去授权*/
						function opensit() {
							uni.showModal({
								content: '由于您还没有允许保存图片到您相册里,这无法进行分享操作点击确定去允许授权',
								success: function(res) {
									if (res.confirm) {
										/* 这个就是打开设置的API*/
										uni.openSetting({
											success(res) {
												console.log(res.authSetting);
											}
										});
									} else if (res.cancel) {
										uni.showModal({
											cancelText: '依然取消',
											confirmText: '重新授权',
											content: '很遗憾你点击了取消，这将无法进行分享操作，请慎重考虑',
											success: function(res) {
												if (res.confirm) {
													uni.openSetting({
														success(res) {
															console.log(res
																.authSetting);
														}
													});
												} else if (res.cancel) {
													console.log('用户不授权');
												}
											}
										});
									}
								}
							});
						}
						/* 特别注意要先获取图片信息在进行保存，不让保存不了 */
						function img() {
							/* 我这里要保存多张图片，一张的话就可以取消这些，具体看你的需求 */
							if (num > len) {
								return false;
							}
							/* 获取图片信息 */
							uni.getImageInfo({
								src: obj[num],
								success: function(image) {
									console.log(image);
									/* 保存图片到相册 */
									uni.saveImageToPhotosAlbum({
										filePath: image.path,
										success: function() {
											console.log('save success');
											if (num == len) {
												uni.showModal({
													title: '保存成功',
													content: '图片已成功保存到相册，快去分享到您的圈子吧',
													showCancel: false
												});
											}
										},
										complete(res) {
											console.log(res);
										}
									});
								}
							});
							num++;
							img();
						}
						uni.authorize({
							/* 这个就是保存相册的 */
							scope: 'scope.writePhotosAlbum',
							success() {
								/* 保存图片方法 */
								img();
							},
							complete(res) {
								console.log(res);
								/* 这里判断一下如果没有授权重新打开设置选项 */
								uni.getSetting({
									success(res) {
										if (!res.authSetting['scope.writePhotosAlbum']) {
											/* 打开设置的方法 */
											opensit();
										}
									}
								});
							}
						});
						console.log(e)
					}
				});
			},
			async hideConfirm() {
				let params = {
					id: this.goods.id,
					nStates: 99,
				}
				try {

					let result = await UpdateObj(params)
					console.log(result)
					if (result && result.code === "000000") {
						uni.showToast({
							title: '删除成功',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '删除失败 请重新登录再试 或联系管理员',
							icon: 'none'
						})
					}

				} catch (e) {
					uni.showToast({
						title: '删除失败',
						icon: 'none'
					})
					//TODO handle the exception
				}
				this.hideModal()
			}
		},
		async mounted() {
			if (this.$store.getters.sessionId) {
				this.content.push({
					text: '下架',
					active: false,
					icon: 'repeal',
				}, {
					text: '修改',
					active: false,
					icon: 'edit',
				}, {
					text: '删除',
					active: false,
					icon: 'delete',
				})
			}
			// this.getCode()
			let userInfo = getUserInfo()
			if (userInfo && userInfo.openId) {
				let params = {
					vId: this.goods.vId,
					vOpenId: userInfo.openId,
					vGoodsId: this.goods.id,
					nStates: 1
				}
				let result = await collQuery(params)
				if (result && result.code === '000000' && result.data && result.data.records && result.data.records
					.length) {

					this.isActive = true
					this.content[1].icon = 'likefill'
					this.$forceUpdate()
				}
			} else {

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

		.cu-btn {
			border: none;
			background: #fff;
		}
	}
</style>
