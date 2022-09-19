<template>
	<view class="index">
		<!-- 首页 -->
		<home-index :scrollY="scrollY" ref="homeIndex" :scrollBottom="scrollBottom" :show="tabID==0?true:false"
			v-if="loadOn.homeIndex" />
		<!-- 列表 -->
		<my-list :scrollY="scrollY" ref="myList" :scrollBottom="scrollBottom" :show="tabID==1?true:false"
			v-if="loadOn.myList" />
		<!-- 收藏 -->
		<my-collection :scrollY="scrollY" ref="myCollection" :scrollBottom="scrollBottom" :show="tabID==2?true:false"
			v-if="loadOn.myCollection" />
		<!-- 我的 -->
		<my :scrollY="scrollY" ref="my" :scrollBottom="scrollBottom"  @handleCollection="handleCollection" :show="tabID==3?true:false"
			v-if="loadOn.my" />
		<!--底部导航-->
		<footer-tabbar :tabID='tabID' :msgDot='true' @tabTap='tabTap' />
		<!-- <chb-fab></chb-fab> -->
	</view>
</template>

<script>
	import chbFab from '@/components/chb-fab/chb-fab'
	import homeIndex from '@/components/view/homeIndex'
	import myList from '@/components/view/myList'
	import my from '@/components/view/my'
	import myCollection from '@/components/view/myCollection'
	//固定组件
	import footerTabbar from '@/components/footer/footer-tabbar';
	export default {
		onShareTimeline(res) {
			return {
				title: "剑心魔域甄选",
				// imageUrl: this.store.img,
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
			return {
				title: "剑心魔域甄选",
				// imageUrl: this.store.img,
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
		components: {
			footerTabbar,
			homeIndex,
			myList,
			my,
			myCollection,chbFab
		},
		data() {
			return {
				loadOn: {
					homeIndex: true,
					myList: false,
					myCollection: false,
					my: false
				},
				scrollY: 0,
				scrollBottom: 0,
				tabID: 0,
				tabIndex: 0,
			}
		},
		methods: {
			handleCollection(){
				this.tabTap(2)
			},
			tabTap(index) {
				this.tabIndex = this.tabID;
				if (index == 1 && !this.loadOn.myList) {
					this.loadOn.myList = true;
				}
				if (index == 2 && !this.loadOn.myCollection) {
					this.loadOn.myCollection = true;
				}
				if (index == 3 && !this.loadOn.my) {
					this.loadOn.my = true;
				}
				this.tabID = index;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.index {}
</style>
