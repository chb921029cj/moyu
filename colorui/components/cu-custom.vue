<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<slot name="left"></slot>
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back" v-if="!share&&showBack"></text>
					<text class="cuIcon-home solid padding-xs home text-black" v-if="share" @click="handleHome"></text>
					<slot name="backText"></slot>
				</view>
				<view class="padding-left-sm text-lg" v-if="text">
					<slot name="text"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			showBack: {
				type: [Boolean, String],
				default: true
			},
			share: {
				type: [Boolean, String],
				default: false
			},
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isGoBack: {
				type: [Boolean, String],
				default: true
			},
			text: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
			BackPage() {
				this.$emit("BackPage", {
					title: 'Hello World'
				});
				if (!this.isGoBack) {
					console.log(this.isGoBack)
					return
				}
				if (this.share) {
					uni.navigateTo({
						url: '/pages/index/index'
					})
				} else {
					uni.navigateBack({
						delta: 1
					});
				}

			}
		}
	}
</script>

<style>

</style>
