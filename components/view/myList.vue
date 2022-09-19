<template>
	<view class="my-list  flex flex-direction" :class="[show?'show':'']">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="left">
				<view class="box">
					<view class="cu-bar ">
					</view>
				</view>
			</block>
		</cu-custom>
		<view class="box">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text"
						placeholder="搜索编号,关键字" confirm-type="search" v-model="serarchInput"></input>
				</view>
				<view class="action">
					<!-- <text class="cuIcon-sort text-lg" @tap="showModal" data-target="DrawerModalR"></text> -->
					<button class="cu-btn bg-gradual-blue " @click="handleSearch">查询</button>
				</view>
			</view>
		</view>
		<view class="box bg-white">
			<view class="flex algin-center padding-left-xs">
				<view class="title text-black padding-left-sm text-sm text-bold">区服:</view>
				<view class=" flex  align-center justify-between padding-left-sm padding-right-sm">
					<view class="text-center text-df">
						<picker @change="bindPickerChange" :range="array" :value="index">
							<view class="uni-input">{{index>-1?array[index]:'请选择区服'}}</view>
						</picker>
					</view>

				</view>
				<view style="flex:1;text-align:right" class="padding-right" data-target="DrawerModalR" @tap="showModal">
					<text class="cuIcon-sort text-lg"></text><text class="text-xm">更多条件筛选</text>
				</view>
			</view>
			<view class="flex algin-center padding-left-xs padding-top-sm ">

				<view class=" flex  align-center   padding-right-sm ">
					<view class="title text-black padding-left-sm text-sm text-bold margin-right-sm "
						style=" flex-shrink:0">
						<text class="cuIcon-recharge margin-right-sm text-lg"></text>
						:
					</view>
					<text class="text-gray text-sm" style=" flex-shrink:0">区间：</text>
					<input type="number" class="input text-sm" placeholder="最低价" v-model="nPriceN_min">
					<text class="margin-right-lg">~</text>
					<input class="input text-sm" type="number" placeholder="最高价价" v-model="nPriceN_max">
				</view>
			</view>
			<!-- 			<view class="part part1 solid-bottom flex align-center  padding-left-xs">
				<view class="title text-black padding-left-sm text-sm text-bold">神火:</view>
				<view class=" flex  align-center padding-left-sm padding-right-sm text-sm " style=" flex-shrink:0">
					<text class="text-gray">区间：</text>
					<text>{{ nShenH_min }}</text>
					<text>~</text>
					<text>{{ nShenH_max}}</text>
				</view>

				<view class="rowBox margin-left-xs ">
					<view class="sliderBox">
						<RangeSlider :width="slideWidth" :height="slideHeight" :blockSize="slideBlockSize"
							:min="slideMin" :max="slideMax" :values="rangeValues1" :step="step" :liveMode="isLiveMode"
							@rangechange="onRangeChange1">
							<view slot="minBlock" class="range-slider-block"></view>
							<view slot="maxBlock" class="range-slider-block"></view>
						</RangeSlider>
					</view>
				</view>
			</view> -->
		</view>
		<scroll-view scroll-y="true" class="bg-white bscroll" @scrolltolower="scrolltolower">
			<scroll-view scroll-x="true" class="bg-white">
				<view class="flex padding">
					<view class="flex flex-direction align-center margin-right  " v-for="(item,index) in VZHIYE"
						@click="handleVZHIYE(item,index)" :key="index">
						<view class="cu-avatar xl round " :class="index===zhiyeIndex?'scale':''"
							:style="'background-image:url('+item.url+');'"></view>
						<view class=" text-sm margin-top-sm "
							:class="index===zhiyeIndex?'text-bold text-red':'text-gray'">{{item.label}}</view>
					</view>
				</view>
			</scroll-view>
			<view class="padding-bottom padding-left padding-right" v-for="(item,index) in goodList" :key="index">
				<good-list :goods="item"></good-list>
			</view>
		</scroll-view>
		<view class="cu-modal drawer-modal justify-end" style="z-index: 999999;"
			:class="modalName=='DrawerModalR'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop=""
				:style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<view class="content">
						<cu-custom bgColor="bg-gradual-blue">
							<block slot="left">
								<view class="box">
									<view class="cu-bar ">
									</view>
								</view>
							</block>
						</cu-custom>
						<!-- 						<view class="part part1 solid-bottom padding-bottom-sm padding-top">
							<view class="title text-black padding-left-sm text-df text-bold">¥:</view>
							<view
								class=" flex  align-center justify-between padding-left-sm padding-right-sm padding-top-sm">
								<view class="text-center text-sm">
									<text class="text-gray">区间：</text>
									<template v-if="!shadow">
										<text>{{ nPriceN_min }}</text>
										<text>~</text>
										<text>{{ nPriceN_max}}</text>
										<text class="text-xs margin-left-xs text-red">元</text>
									</template>

								</view>
								<view>
									<text class=" margin-right-sm text-sm text-red">2W+</text>
									<switch @change="setPrice" :class="shadow?'checked':''" color="#39B54A"></switch>
								</view>
							</view>

							<view class="rowBox margin-left-lg " v-show="!shadow">
								<view class="sliderBox">
									<RangeSlider :width="slideWidth" :height="slideHeight" :blockSize="slideBlockSize"
										:min="slideMin" :max="slideMax" :values="rangeValues" :step="step"
										:liveMode="isLiveMode" @rangechange="onRangeChange">
										<view slot="minBlock" class="range-slider-block"></view>
										<view slot="maxBlock" class="range-slider-block"></view>
									</RangeSlider>
								</view>
							</view>
						</view> -->
						<view class="part part1 solid-bottom padding-bottom-sm padding-top">
							<view class="title text-black padding-left-sm text-df text-bold">神火:</view>
							<view
								class=" flex  align-center justify-between padding-left-sm padding-right-sm  padding-top-sm">
								<view class="text-center text-sm">
									<text class="text-gray">区间：</text>
									<text>{{ nShenH_min }}</text>
									<text>~</text>
									<text>{{ nShenH_max}}</text>
								</view>
								<view>
								</view>
							</view>

							<view class="rowBox margin-left-lg ">
								<view class="sliderBox">
									<RangeSlider :width="slideWidth" :height="slideHeight" :blockSize="slideBlockSize"
										:min="slideMin" :max="slideMax" :values="rangeValues1" :step="step"
										:liveMode="isLiveMode" @rangechange="onRangeChange1">
										<view slot="minBlock" class="range-slider-block"></view>
										<view slot="maxBlock" class="range-slider-block"></view>
									</RangeSlider>
								</view>
							</view>
						</view>
						<view class="part part1 solid-bottom padding-bottom-sm padding-top">
							<view class="title text-black padding-left-sm text-df text-bold">秒伤:</view>
							<view
								class=" flex  align-center justify-between padding-left-sm padding-right-sm  padding-top-sm">
								<view class="text-center text-sm">
									<text class="text-gray">区间：</text>
									<text>{{ nMiaoS_min }}</text>
									<text>~</text>
									<text>{{ nMiaoS_max}}</text>
									<text class="text-xs margin-left-xs text-red">亿</text>
									<!-- <button class="cu-btn bg-green shadow-blur round margin-left-lg">搜索</button> -->
								</view>
								<view>
								</view>
							</view>

							<view class="rowBox margin-left-lg ">
								<view class="sliderBox">
									<RangeSlider :width="slideWidth" :height="slideHeight" :blockSize="slideBlockSize"
										:min="slideMin" :max="slideMax" :values="rangeValues2" :step="step"
										:liveMode="isLiveMode" @rangechange="onRangeChange2">
										<view slot="minBlock" class="range-slider-block"></view>
										<!-- 左边滑块的内容 -->
										<view slot="maxBlock" class="range-slider-block"></view>
										<!-- 右边滑块的内容 -->
									</RangeSlider>
								</view>
							</view>
						</view>
						<view class="part part1 solid-bottom padding-bottom-sm padding-top">
							<view class="title text-black padding-left-sm text-df text-bold">服务器状态:</view>
							<view
								class=" flex  align-center justify-between padding-left-sm padding-right-sm  padding-top-sm">
								<view class="text-center text-df">
									<picker @change="bindPickerVmark2Change" :range="Vmark2" :value="Vmark2Index">
										<view class="uni-input">{{Vmark2Index>-1?Vmark2[Vmark2Index]:'请选择服务器状态'}}</view>
									</picker>
								</view>
								<view>
								</view>
							</view>
						</view>
						<view class="part part1 solid-bottom padding-bottom-sm padding-top">
							<view class="title text-black padding-left-sm text-df text-bold">分类:</view>
							<view
								class=" flex  align-center flex-wrap  padding-left-sm padding-right-sm  padding-top-sm">
								<view class='cu-tag light margin-left margin-bottom' @click="handleTags(index)"
									v-for="(item,index) in tags" :key="index"
									:class="tagsIndex.includes(index)?'bg-gradual-blue':'bg-gray '">{{item}}</view>
							</view>
						</view>
						<view class="padding flex flex-direction">
							<button class="cu-btn bg-gradual-blue lg" @click="handleSearch">查询</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo,
		getToken
	} from '@/utils/auth.js'
	import goodList from '../goodList.vue'
	import {
		GetList
	} from '@/api/user';
	import {
		VQUFU
	} from '@/utils/moyu'
	import RangeSlider from '../range-slider/range-slider.vue';
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
		components: {
			RangeSlider,
			goodList
		},
		data() {
			return {
				serarchInput: '',
				hasMore: true,
				isFirst: true,
				modalName: null,
				InputBottom: 0,
				Vmark2Index: -1,
				tags: ['区老大', '区前十', '开区一个月内', '4000站以上'],
				Vmark2: ['全部','红线', '黄线', '绿线'],
				tagsIndex: [],
				VZHIYE: [{
							value: '全部',
							label: '全部',
							url: 'https://img5.99.com/my/images/logo/logo-jz.png',
						}, {
							value: '魔法师',
							label: '魔法师',
							url: 'https://img7.99.com/my/index/2016/new/pop-classes-01.jpg',
						},
						{
							value: '战士',
							label: '战士',
							url: 'https://img7.99.com/my/index/2016/new/pop-classes-02.jpg',
						},
						{
							value: '亡灵巫师',
							label: '亡灵巫师',
							url: 'https://img7.99.com/my/index/2016/new/pop-classes-03.jpg',
						},
						{
							value: '异能者',
							label: '异能者',
							url: 'https://img7.99.com/my/index/2016/new/pop-classes-04.jpg',
						},
						{
							value: '血族',
							label: '血族',
							url: 'https://img7.99.com/my/index/2016/new/pop-classes-05.jpg',
						},
						{
							value: '暗黑龙骑',
							label: '暗黑龙骑',
							url: 'https://img7.99.com/my/index/2016/new/pop-classes-06.jpg',
						},
						{
							value: '精灵游侠',
							label: '精灵游侠',
							url: 'https://img7.99.com/my/index/2016/new/pop-classes-07.jpg',
						},
						{
							value: '御剑师',
							label: '御剑师',
							url: 'https://img5.99.com/my/index/2016/new/pop-classes-08.png',
						},
						{
							value: '星辰神子',
							label: '星辰神子',
							url: 'https://img4.99.com/my/index/2016/new/pop-classes-09.png',
						},
					]
					// rangeValues: [2, 5], //当前区间值
					// slideWidth: 350, //宽度
					// slideHeight: 80,  //高度
					// slideBlockSize: 56, //圆形按钮大小
					// slideMin: 0,  //slider最小值
					// slideMax: 12,  //slider最大值
					,
				nPriceN_max: 10000000,
				nPriceN_min: 0,
				nMiaoS_max: 2000,
				nMiaoS_min: 0,
				nShenH_max: 150000,
				nShenH_min: 0,
				nFengM_max: 10,
				nFengM_min: 0,
				rangeValues: [0, 10],
				rangeValues1: [0, 10],
				slideWidth: 350,
				slideHeight: 80,
				slideBlockSize: 30,
				slideMin: 0,
				slideMax: 10,
				isLiveMode: true,
				step: 0.1,
				//
				timeMinValue: 0,
				timeMaxValue: 10,

				rangeValues2: [0, 10],
				serTime: '02:24:00-14:24:00',

				rangeValues3: [3, 5],
				shadow: false,
				goodList: [],
				current: 1,
				size: 10,
				zhiyeIndex: 0,
				array: [],
				index: 0,
				vQuF: ''
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
			bindPickerVmark2Change: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.Vmark2Index = e.detail.value
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			setPrice() {
				this.shadow = !this.shadow
				if (this.shadow) {
					this.nPriceN_max = 10000000
					this.nPriceN_min = 20000
				} else {
					this.nPriceN_max = 20000
					this.nPriceN_min = 0
				}
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
				// uni.navigateTo({
				// 	url: '../../pages/search/index'
				// })
			},
			InputBlur(e) {
				this.InputBottom = 0

			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			pad: function(num, n) {
				return Array(n - ('' + num).length + 1).join(0) + num;
			},
			onRangeChange: function(e) {
				this.rangeValues = [e.minValue, e.maxValue];
				this.nPriceN_max = Math.trunc(e.maxValue * 2000)
				this.nPriceN_min = Math.trunc(e.minValue * 2000)
			},
			onRangeChange1(e) {
				this.rangeValues1 = [e.minValue, e.maxValue];
				this.nShenH_max = Math.trunc(e.maxValue * 15000)
				this.nShenH_min = Math.trunc(e.minValue * 15000)
			},
			onRangeChange2: function(e) {
				this.rangeValues2 = [e.minValue, e.maxValue];
				this.nMiaoS_max = Math.trunc(e.maxValue * 200)
				this.nMiaoS_min = Math.trunc(e.minValue * 200)
			},
			handleSearch() {
				this.hideModal()
				this.initData(true)
			},
			//上啦加载
			scrolltolower() {
				console.log(1)
				this.initData()
			},
			handleVZHIYE(item, index) {
				this.zhiyeIndex = index
				this.isFirst = true
				this.tagsIndex = []
				this.index = 0
				if (index > 0) {
					this.initData(true, {
						vZhiY: item.label
					})
				} else {
					this.initData(true)
				}

			},
			handleTags(index) {
				console.log(this.tagsIndex, this.tagsIndex.includes(index))
				if (this.tagsIndex.includes(index)) {
					let findIndex = this.tagsIndex.findIndex(item => item === index)
					this.tagsIndex.splice(findIndex, 1)
				} else {
					this.tagsIndex.push(index)
				}
			},
			async initData(type = false, enterParams = {}) {
				if (type) {
					this.goodList = []
					this.current = 0
					this.hasMore = true
				}
				if (!this.hasMore) {
					return
				}
				uni.showLoading({
					title: '加载中'
				});
				this.current++
				let params = {
					current: this.current,
					size: 10,
					nStates: 2
				}
				if(getToken()){
					delete params.nStates
				}
				// if (!this.isFirst) {
				Object.assign(params, {
					nPriceN_max: this.nPriceN_max,
					nPriceN_min: this.nPriceN_min,
					nMiaoS_max: this.nMiaoS_max,
					nMiaoS_min: this.nMiaoS_min,
					nShenH_max: this.nShenH_max,
					nShenH_min: this.nShenH_min,
				})
				// }
				if (this.zhiyeIndex > 0) {
					Object.assign(params, {
						vZhiY: this.VZHIYE[this.zhiyeIndex].value,

					})
				}
				//判断是否有模糊查询
				if (this.serarchInput) {
					Object.assign(params, {
						like_str: this.serarchInput
					})
				}
				//tags: ['区老大', '区前十', '开区一个月内', '4000站以上']
				if (this.tagsIndex.includes(0)) {
					Object.assign(params, {
						nIsLd: 1
					})
				}
				if (this.tagsIndex.includes(1)) {
					Object.assign(params, {
						nIsQs: 1
					})
				}
				if (this.tagsIndex.includes(2)) {
					Object.assign(params, {
						nIsXq: 1
					})
				}
				if (this.tagsIndex.includes(3)) {
					Object.assign(params, {
						nIsGz: 1
					})
				}
				if (this.index > 0) {
					Object.assign(params, {
						vQuF: this.array[this.index]
					})
				}
				if(this.Vmark2Index>0){
					Object.assign(params, {
						vMark2: this.Vmark2[this.Vmark2Index]
					})
				}
				Object.assign(params, enterParams)
				console.log('params',params)
				let result = await GetList(params)
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
				uni.hideLoading()
			},
			otherFun(e) {
				this.serarchInput = e
				this.initData(true)
			}
		},
		created() {
			console.log(VQUFU)
			VQUFU.forEach(item => {
				this.array.push(item.value)
			})
			this.initData(true)
		}
	}
</script>

<style lang="scss" scoped>
	.my-list {
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

		.scale {
			transform: scale(1.2, 1.2)
		}

		.input {
			width: 150rpx;
		}
	}
</style>
