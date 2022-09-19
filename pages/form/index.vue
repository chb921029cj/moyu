<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">表单</block>
		</cu-custom>
		<form class="margin-bottom">
			<view class="cu-form-group margin-top">
				<view class="title">编号</view>
				<input placeholder="请输入编号" name="input" v-model="goods.vId" />
			</view>
			<!-- !!!!! placeholder 在ios表现有偏移 建议使用 第一种样式 -->
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="备注"
					v-model="goods.vMark1"></textarea>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">
					头像上传
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in vHead" :key="index" @tap="ViewVheadImage"
						:data-url="vHead[index]">
						<image :src="vHead[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelVheadImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseVheadImage" v-if="vHead.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					照片墙
				</view>
				<view class="action">
					{{imgList.length}}/9
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
						:data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<9">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">区服</view>
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex"
					:range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">是否区老大</view>
				<switch @change="handleSwitch('nIsLd')" :class="goods.nIsLd?'checked':''"
					:checked="goods.nIsLd?true:false">
				</switch>
			</view>
			<view class="cu-form-group">
				<view class="title">是否前十</view>
				<switch @change="handleSwitch('nIsQs')" :class="goods.nIsQs?'checked':''"
					:checked="goods.nIsQs?true:false">
				</switch>
			</view>
			<view class="cu-form-group">
				<view class="title">是否新区</view>
				<switch @change="handleSwitch('nIsXq')" :class="goods.nIsXq?'checked':''"
					:checked="goods.nIsXq?true:false">
				</switch>
			</view>
			<view class="cu-form-group ">
				<view class="title">是否高战</view>
				<switch @change="handleSwitch('nIsGz')" :class="goods.nIsGz?'checked':''"
					:checked="goods.nIsGz?true:false">
				</switch>
			</view>
			<view class="cu-form-group ">
				<view class="title">是否推荐</view>
				<switch @change="handleSwitch('nTuiJ')" :class="goods.nTuiJ?'checked':''"
					:checked="goods.nTuiJ?true:false">
				</switch>
			</view>
			<view class="cu-form-group ">
				<view class="title">是否下架</view>
				<switch @change="handleSwitch('nStates')" :class="goods.nStates?'checked':''"
					:checked="goods.nStates?true:false">
				</switch>
			</view>
			<view class="cu-form-group">
				<view class="title">职业</view>
				<picker @change="PickervZhiYChange" :value="vZhiYindex" :range="vZhiYpicker">
					<view class="picker">
						{{vZhiYindex>-1?vZhiYpicker[vZhiYindex]:'请选择职业'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">线路状态</view>
				<picker @change="PickervMark2Change" :value="vMark2index" :range="vMark2picker">
					<view class="picker">
						{{vMark2index>-1?vMark2picker[vMark2index]:'请选择线路状态'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="PickervGENDERChange" :value="vGENDERindex" :range="vGENDERpicker">
					<view class="picker">
						{{vGENDERindex>-1?vGENDERpicker[vGENDERindex]:'请选择性别'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">现价</view>
				<input placeholder="请输入现价" name="input" v-model="goods.nPriceN" type="number" />
			</view>
			<view class="cu-form-group">
				<view class="title">原价</view>
				<input placeholder="请输入原价" name="input" v-model="goods.nPriceO" type="number" />
			</view>
			<view class="cu-form-group">
				<view class="title">神火</view>
				<input placeholder="请输入神火" name="input" v-model="goods.nShenH" type="number" />
			</view>
			<view class="cu-form-group">
				<view class="title">秒伤</view>
				<input placeholder="请输入秒伤" name="input" v-model="goods.nMiaoS" type="number" />
			</view>
			<view class="cu-form-group">
				<view class="title">属性</view>
				<input placeholder="请输入属性" name="input" v-model="goods.vShuX"  />
			</view>
			<view class="cu-form-group">
				<view class="title">封魔</view>
				<input placeholder="请输入封魔" name="input" v-model="goods.nFengM" type="number" />
			</view>
			<view class="cu-form-group">
				<view class="title">名人堂</view>
				<input placeholder="请输入名人堂" name="input" v-model="goods.vMingRT"  />
			</view>
			<view class="cu-form-group">
				<view class="title">战斗力</view>
				<input placeholder="请输入战斗力" name="input" v-model="goods.vZhuangB" type="number" />
			</view>

		</form>
		<view class="padding-xl">
			<button class="cu-btn block bg-black margin-tb-sm lg" @click="submit"> 提交</button>
		</view>
		<!-- 		<canvas class="canvas" canvas-id="attendCanvasId" id="attendCanvasId"
			style="border: 1px solid; background: #123456;"></canvas> -->
		<!-- 	<canvas canvas-id="attendCanvasId" id="attendCanvasId" style="border: 1px solid; background: #123456;"
			:style="'width: '+popWidth*devicePixelRatio+'px;height: '+canvasHeight*devicePixelRatio+'px;transform:scale('+1/devicePixelRatio+'); transform-origin: 0px 0px;position: fixed;opacity: 0;top: -'+canvasHeight+100+'px;'"></canvas>
 -->
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
		qiniuyun,
		addList,
		updateList
	} from '@/api/user';
	import {
		VQUFU,
		VZHIYE,
		vGENDER
	} from '@/utils/moyu.js'
	export default {
		data() {
			return {
				goods: {
					vId: '',
					nIsLd: '',
					nIsQs: '',
					nIsXq: '',
					nIsGz: '',
					vZhiY: '',
					vXingB: '',
					nShenH: '',
					nMiaoS: '',
					vShuX: '',
					nFengM: '',
					vMingRT: '',
					vZhuangB: '',
					vMark2: '',
					nTuiJ: '',
					nPriceN: '',
					nPriceO: '',
					vPics: '',
					vMark1: '',
					nStates: ''
				},
				vHead: [],
				vZhiYindex: 0,
				vZhiYpicker: [],
				vGENDERindex: 0,
				vGENDERpicker: [],
				vMark2index: 2,
				vMark2picker: ['红线', '黄线', '绿线'],
				index: -1,
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				multiArray: [
					[],
					[],
				],
				objectMultiArray: [
					[{
							id: 0,
							name: '无脊柱动物'
						},
						{
							id: 1,
							name: '脊柱动物'
						}
					],
					[{
							id: 0,
							name: '扁性动物'
						},
						{
							id: 1,
							name: '线形动物'
						},
						{
							id: 2,
							name: '环节动物'
						},
						{
							id: 3,
							name: '软体动物'
						},
						{
							id: 3,
							name: '节肢动物'
						}
					],
					[{
							id: 0,
							name: '猪肉绦虫'
						},
						{
							id: 1,
							name: '吸血虫'
						}
					]
				],
				multiIndex: [0, 0],
				time: '12:01',
				date: '2018-12-25',
				region: ['广东省', '广州市', '海珠区'],
				switchA: false,
				switchB: true,
				switchC: false,
				switchD: false,
				radio: 'A',
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: true
				}, {
					value: 'C',
					checked: false
				}],
				imgList: [],
				modalName: null,
				textareaAValue: '',
				textareaBValue: '',
				arr: ['nIsLd', 'nIsQs', 'nIsXq', 'nIsGz', 'nTuiJ', 'nStates'],
				materialList: [],
				devicePixelRatio: 1,
				canvasHeight: 300,
				popWidth: 1
			};
		},
		onLoad(option) {
			let that = this
			uni.getSystemInfo({
				success(res) {
					that.popWidth = res.windowWidth;
					// 设备像素比大于1
					if (res.devicePixelRatio > 1) {
						that.devicePixelRatio = res.devicePixelRatio;
					}
					console.log(that.popWidth, that.devicePixelRatio)
				}
			});
			VQUFU.forEach(item => {
				this.multiArray[0].push(item.value)
			})
			VQUFU[this.multiIndex[1]].children.forEach(item => {
				this.multiArray[1].push(item.value)
			})
			VZHIYE.forEach(item => {
				this.vZhiYpicker.push(item.value)
			})
			vGENDER.forEach(item => {
				this.vGENDERpicker.push(item.value)
			})
			if (option.good) {
				this.goods = JSON.parse(decodeURIComponent(option.good))
				if (this.goods) {
					console.log(this.goods)
					try {
						this.imgList = this.goods.vPics
					} catch (error) {
						console.log(error)
					}
					try {
						this.vHead.push(this.goods.vHead)
					} catch (error) {
						console.log(error)
					}
					try {
						let vQuF = this.goods.vQuF
						let index = VQUFU.findIndex(item => item.value === vQuF[0])
						this.multiIndex[0] = index
						this.multiArray[1] = []
						VQUFU[index].children.forEach(item => {
							this.multiArray[1].push(item.value)
						})
						this.$forceUpdate()
						let index2 = VQUFU[index].children.findIndex(item => item.value === vQuF[1])
						this.multiIndex[1] = index2
					} catch (error) {
						console.log(error)
					}
					try {
						let index = this.vZhiYpicker.findIndex(item => item === this.goods.vZhiY)
						this.vZhiYindex = index
					} catch (error) {
						console.log(error)
					}
					try {
						let index = this.vGENDERpicker.findIndex(item => item === this.goods.vXingB)
						this.vGENDERindex = index
					} catch (error) {
						console.log(error)
					}
					try {
						let index = this.vMark2picker.findIndex(item => item === this.goods.vMark2)
						this.vMark2index = index
					} catch (error) {
						console.log(error)
					}
					this.arr.forEach((key) => {
						if (this.goods[key] && this.goods[key] === 1) {
							this.goods[key] = true
						} else {
							this.goods[key] = false
						}
					})

				}
			}

		},
		methods: {
			handleSwitch(key) {
				if (this.goods[key]) {
					this.goods[key] = false
				} else {
					this.goods[key] = true
				}
				console.log(this.goods)
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			PickervZhiYChange(e) {
				this.vZhiYindex = e.detail.value
			},
			PickervGENDERChange(e) {
				this.vGENDERindex = e.detail.value
			},
			PickervMark2Change(e) {
				this.vMark2index = e.detail.value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				if (e.detail.column === 0) {
					this.multiIndex[1] = 0
					this.multiArray[1] = []
					VQUFU[e.detail.value].children.forEach(item => {
						this.multiArray[1].push(item.value)
					})
				}
				this.$forceUpdate()
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			RegionChange(e) {
				this.region = e.detail.value
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			SwitchC(e) {
				this.switchC = e.detail.value
			},
			SwitchD(e) {
				this.switchD = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			ChooseVheadImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.vHead.length != 0) {
							this.vHead = this.vHead.concat(res.tempFilePaths)
						} else {
							this.vHead = res.tempFilePaths
						}
					}
				});
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewVheadImage(e) {
				uni.previewImage({
					urls: this.vHead,
					current: e.currentTarget.dataset.url
				});
			},
			DelVheadImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.vHead.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			},
			submit() {
				if (!this.vHead.length || !this.imgList.length || !this.goods.vId) {
					uni.showToast({
						title: '请补全相关图片等信息',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '提交中...'
				});
				this.materialList = []
				let all = this.vHead.concat(this.imgList)
				console.log(all)
				this.weixin_img(0, all, false)

			},
			async handleSubmit() {
				let params = JSON.parse(JSON.stringify(this.goods))
				this.arr.forEach((key) => {
					if (params[key]) {
						params[key] = 1
					} else {
						params[key] = 2
					}
				})
				//
				params.vQuF = JSON.stringify([this.multiArray[0][this.multiIndex[0]], this.multiArray[1][this
					.multiIndex[
						1]
				]])
				params.vXingB = this.vGENDERpicker[this.vGENDERindex]
				params.vZhiY = this.vZhiYpicker[this.vZhiYindex]
				params.vMark2 = this.vMark2picker[this.vMark2index]
				params.vHead = this.materialList[0]
				params.vPics = JSON.stringify(this.materialList.slice(1))
				try {
					let result = ''
					if (params.dCTime) {
						delete params.nShouC
						delete params.dCTime
						delete params.nLiuL
						delete params.vId
						result = await updateList(params)
					} else {
						result = await addList(params)
					}
					if (result && result.code === "000000") {
						uni.showToast({
							title: "提交成功",
							icon: "none"
						});
					} else {
						uni.showToast({
							title: '网络异常 请重新登录再试 或联系管理员',
							icon: 'none'
						})
					}
				} catch (e) {
					//TODO handle the exception
					uni.showToast({
						title: '网络异常 请重新登录再试 或联系管理员',
						icon: 'none'
					})
				}



			},
			chooseImage() {
				let that = this
				uni.chooseImage({
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					count: 9, //默认9
					success: (rem) => {
						that.tempFilePaths = rem.tempFilePaths;
						that.weixin_img(0, rem, true)
					}
				})
			},
			async weixin_img(num, rem, type = true) {
				let that = this
				if (rem[num].includes('https')) {
					this.materialList.push(rem[num]);
					if (num == rem.length - 1) {
						this.handleSubmit()
						return
					} else {
						that.weixin_img(num + 1, rem, type)
					}

				} else {
					if (type) {
						uni.getImageInfo({ //获取这个图片 图片压缩
							src: rem[num], //需要获取的图片 图片选择不用我说了吧
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
								ctx.fillRect(0, 0, 300 * that.devicePixelRatio, 150 * that
									.devicePixelRatio)
								ctx.drawImage(rem[num], 0, 0, canvasWidth * that.devicePixelRatio,
									canvasHeight * that.devicePixelRatio)
								// ctx.draw()
								// Create linear gradient
								ctx.draw(false, () => {
									//获取图像数据， API 1.9.0
									uni.canvasGetImageData({
										canvasId: 'attendCanvasId',
										x: 0,
										y: 0,
										width: canvasWidth * that.devicePixelRatio,
										height: canvasHeight * that.devicePixelRatio,
										success: async (res) => {
											console.log(res)
											let platform = uni.getSystemInfoSync()
												.platform
											if (platform == 'ios') {
												// 兼容处理：ios获取的图片上下颠倒
												res = that.reverseImgData(res)
											}
											// 3. png编码
											let pngData = upng.encode([res.data
													.buffer
												],
												canvasWidth, canvasHeight)
											// 4. base64编码
											let base64 = uni.arrayBufferToBase64(
												pngData)
											// console.log('1111','data:image/jpeg;base64,'+base64)
											// rem[num].Base64_Path = 'data:image/jpeg;base64,' +base64

											let result = await that.putb64(
												'data:image/jpeg;base64,' +
												base64)
											if (result) {
												that.materialList.push(result);
												//利用递归循环来实现多张图片压缩
												if (num == rem.length - 1) {
													that.handleSubmit()
													return
												} else {
													that.weixin_img(num + 1, rem, )
												}
											} else {
												uni.showToast({
													title: '网络异常 请重新登录再试 或联系管理员',
													icon: 'none'
												})
											}


										}
									}, that)
								})
							},
						})
					} else {
						let result = await this.putb64(rem[num], true)

						if (result) {
							that.materialList.push(result);
							//利用递归循环来实现多张图片压缩
							if (num == rem.length - 1) {
								that.handleSubmit()
								return
							} else {
								that.weixin_img(num + 1, rem, type)
							}
						} else {
							uni.showToast({
								title: '网络异常 请重新登录再试 或联系管理员',
								icon: 'none'
							})
						}
					}

				}

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
			async putb64(pic, isPath = false) {

				return new Promise(async (resolve) => {
					let result = await qiniuyun()
					let filePath = null
					if (isPath) {
						filePath = pic
					} else {
						filePath = await base64ToPath(pic)
					}
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
							let strToObj = JSON.parse(uploadFileRes.data)
							if (strToObj.key) {
								let backUrl = 'https://www.guoxyu.top/' + strToObj.key;
								// data.success(backUrl); //反出去链接
								console.log(uploadFileRes)
								resolve(backUrl)
							} else {
								resolve()
							}

						},
						fail: fail => {
							console.log(fail)

							resolve()
						}
					})
				})

			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
