<template>
	<view>

		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">搜索页面</block>
		</cu-custom>

		<d-search-log :color_border="color_border" :color_text="color_border" :search_list_hot="search_list_hot"
			:store_key="store_key" :input_text="input_text" @onClickDelAllApi="onClickDelAll"
			@onSearchNameApi="onSearchName" @onClickInput="onClickInput"></d-search-log>



	</view>
</template>

<script>
	import dSearchLog from '@/uni_modules/d-search-log/components/d-search-log/d-search-log.vue'
	export default {
		components: {
			"dSearchLog": dSearchLog,
		},
		computed: {

		},

		data() {
			return {
				color_border: "#ff00ff",
				search_list_hot: [],
				store_key: 'search_list',
				input_text: ''
			}
		},
		onLoad() {
			var that = this
			if (true) {
				setTimeout(function() {
					that.input_text = 'dev'
				}, 1000)
			}


			this.search_list_hot = [
				'区老大', '觉醒一区', '御剑'
			]

			// this._open_tan()
		},
		methods: {
			onClickDelAll() {
				console.log('[父级接收事件]：删除全部搜索记录')
			},
			onSearchName(e) {
				console.log('[父级接收事件]：点击搜索:' + e)

			},
			onClickInput(e) {
				let pages = getCurrentPages(); // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				console.log(prevPage.$vm.$refs.myList)
				prevPage.$vm.$refs.myList.otherFun(e)
				uni.navigateBack({
					delta: 1 // 可以不傳delta值，默認為1
				})
			}


			// 
		}
	}
</script>

<style>
	page {
		/* background-color: #f2f2f2; */
	}

	.my-theme-bg {
		background: linear-gradient(117deg, #60DF9D, #31CB7B);
		color: #fff;

	}
</style>
